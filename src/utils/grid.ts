import { Position } from '@/types';

export const createGrid = <T>(size: number, createCell: () => T): T[][] =>
  Array.from({ length: size }, () => Array.from({ length: size }, createCell));

// 연결된 칸을 찾는 함수
export const getConnectedCells = <T>(
  grid: T[][],
  startPos: Position,
  isMatch: (a: T, b: T) => boolean,
): Position[] => {
  const targetCell = grid[startPos.row][startPos.col];
  if (targetCell === null) return [];

  const visited = new Set<string>();
  const connectedCells: Position[] = [];
  const directions = [
    { row: -1, col: 0 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: 0, col: 1 },
  ];

  const traverse = (pos: Position) => {
    const key = `${pos.row},${pos.col}`;
    if (
      visited.has(key) ||
      pos.row < 0 ||
      pos.row >= grid.length ||
      pos.col < 0 ||
      pos.col >= grid[0].length ||
      !isMatch(grid[pos.row][pos.col], targetCell)
    )
      return;

    visited.add(key);
    connectedCells.push(pos);

    directions.forEach(({ row, col }) =>
      traverse({ row: pos.row + row, col: pos.col + col }),
    );
  };

  traverse(startPos);
  return connectedCells;
};

// 그리드의 모든 연결된 그룹을 찾는 함수
export const getAllGroups = <T>(
  grid: T[][],
  isMatch: (a: T, b: T) => boolean,
): Position[][] => {
  const visited = new Set<string>();
  const groups: Position[][] = [];

  grid.forEach((row, rowIdx) => {
    row.forEach((cell, colIdx) => {
      const key = `${rowIdx},${colIdx}`;
      if (!visited.has(key) && cell !== null) {
        const group = getConnectedCells(
          grid,
          { row: rowIdx, col: colIdx },
          isMatch,
        );
        group.forEach(({ row, col }) => visited.add(`${row},${col}`));
        if (group.length > 0) groups.push(group);
      }
    });
  });

  return groups.sort((a, b) => b.length - a.length);
};

// 그리드에서 특정 위치들의 값을 업데이트하는 함수
export const updateGrid = <T>(
  grid: T[][],
  positions: Position[],
  newValue: T,
): T[][] =>
  grid.map((row, rowIdx) =>
    row.map((cell, colIdx) =>
      positions.some((pos) => pos.row === rowIdx && pos.col === colIdx)
        ? newValue
        : cell,
    ),
  );
