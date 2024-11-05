export type Position = {
  row: number;
  col: number;
};

export type BalloonGrid = (string | null)[][];

export interface GameState {
  grid: BalloonGrid;
  isGameOver: boolean;
  score: number;
}
