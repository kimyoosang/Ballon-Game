import { GRID_SIZE } from '@/constants';
import { BalloonGrid as BalloonGridType } from '@/types';
import {
  createGrid,
  getAllGroups,
  getConnectedCells,
  updateGrid,
} from '@/utils/grid';
import { useState } from 'react';

const createInitialGrid = (): BalloonGridType =>
  createGrid(GRID_SIZE, () => (Math.random() < 0.4 ? '🎈' : null));

const isSameBalloon = (a: string | null, b: string | null) =>
  a === b && a !== null;

export const useBalloonGame = () => {
  const [grid, setGrid] = useState<BalloonGridType>(createInitialGrid());
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const handleBalloonClick = (row: number, col: number) => {
    if (isGameOver || !grid[row][col]) return;

    const connected = getConnectedCells(grid, { row, col }, isSameBalloon);
    const allGroups = getAllGroups(grid, isSameBalloon);

    if (connected.length < allGroups[0].length) {
      setIsGameOver(true);
      return;
    }

    setGrid((prev) => updateGrid(prev, connected, null));
    setScore((prev) => prev + connected.length);
  };

  const resetGame = () => {
    setGrid(createInitialGrid());
    setIsGameOver(false);
    setScore(0);
  };

  return {
    grid,
    isGameOver,
    score,
    handleBalloonClick,
    resetGame,
  };
};
