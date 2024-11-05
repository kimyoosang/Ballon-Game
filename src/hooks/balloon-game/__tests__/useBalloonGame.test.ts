// src/hooks/balloon-game/__tests__/useBalloonGame.test.ts
import { BalloonGrid } from '@/types';
import { act, renderHook } from '@testing-library/react';
import {
  createGrid,
  getAllGroups,
  getConnectedCells,
} from '../../../utils/grid';
import { useBalloonGame } from '../useBalloonGame';

const createMockGrid = (value: string | null = '🎈'): BalloonGrid =>
  Array(7)
    .fill(null)
    .map((): (string | null)[] => Array(7).fill(value));

jest.mock('../../../utils/grid', () => ({
  createGrid: jest.fn(),
  getConnectedCells: jest.fn(),
  getAllGroups: jest.fn(),
  updateGrid: jest.fn(
    (
      grid: BalloonGrid,
      positions: Array<{ row: number; col: number }>,
      value: string | null,
    ) => {
      const newGrid = grid.map((row) => [...row]);
      positions.forEach((pos) => {
        newGrid[pos.row][pos.col] = value;
      });
      return newGrid;
    },
  ),
}));

describe('useBalloonGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('초기 상태가 올바르게 설정된다', () => {
    const mockGrid = createMockGrid();
    (createGrid as jest.Mock).mockReturnValueOnce(mockGrid);

    const { result } = renderHook(() => useBalloonGame());

    expect(result.current.isGameOver).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.grid).toBeDefined();
    expect(result.current.grid.length).toBe(7);
    expect(result.current.grid[0].length).toBe(7);
  });

  it('풍선 클릭 시 가장 큰 그룹이 아니면 게임오버된다', () => {
    const mockGrid = createMockGrid();
    const smallGroup = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
    ];
    const largerGroup = [
      { row: 2, col: 2 },
      { row: 2, col: 3 },
      { row: 2, col: 4 },
    ];

    (createGrid as jest.Mock).mockReturnValueOnce(mockGrid);
    (getConnectedCells as jest.Mock).mockReturnValueOnce(smallGroup);
    (getAllGroups as jest.Mock).mockReturnValueOnce([largerGroup, smallGroup]);

    const { result } = renderHook(() => useBalloonGame());

    act(() => {
      result.current.handleBalloonClick(0, 0);
    });

    expect(result.current.isGameOver).toBe(true);
  });

  it('풍선 클릭 시 가장 큰 그룹이면 점수가 증가하고 풍선이 제거된다', () => {
    const mockGrid = createMockGrid();
    const connectedBalloons = [
      { row: 0, col: 0 },
      { row: 0, col: 1 },
      { row: 0, col: 2 },
    ];

    (createGrid as jest.Mock).mockReturnValueOnce(mockGrid);
    (getConnectedCells as jest.Mock).mockReturnValueOnce(connectedBalloons);
    (getAllGroups as jest.Mock).mockReturnValueOnce([connectedBalloons]);

    const { result } = renderHook(() => useBalloonGame());

    act(() => {
      result.current.handleBalloonClick(0, 0);
    });

    expect(result.current.score).toBe(3);
    expect(result.current.isGameOver).toBe(false);
  });

  it('빈 셀 클릭 시 아무 일도 일어나지 않는다', () => {
    const mockGrid = createMockGrid(null);
    (createGrid as jest.Mock).mockReturnValueOnce(mockGrid);

    const { result } = renderHook(() => useBalloonGame());
    const initialScore = result.current.score;

    act(() => {
      result.current.handleBalloonClick(0, 0);
    });

    expect(result.current.score).toBe(initialScore);
  });

  it('resetGame 호출 시 초기 상태로 리셋된다', () => {
    const mockGrid = createMockGrid();
    (createGrid as jest.Mock)
      .mockReturnValueOnce(mockGrid)
      .mockReturnValueOnce(mockGrid);

    const { result } = renderHook(() => useBalloonGame());

    act(() => {
      result.current.resetGame();
    });

    expect(result.current.isGameOver).toBe(false);
    expect(result.current.score).toBe(0);
    expect(result.current.grid).toBeDefined();
    expect(result.current.grid.length).toBe(7);
    expect(result.current.grid[0].length).toBe(7);
  });
});
