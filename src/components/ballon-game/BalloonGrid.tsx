import { useBalloonGame } from '@/hooks/balloon-game/useBalloonGame';
import { BalloonCell } from './BalloonCell';
import { GameOverModal } from './GameOverModal';
import { ScoreBoard } from './ScoreBoard';

export default function BalloonGrid() {
  const { grid, isGameOver, score, handleBalloonClick, resetGame } =
    useBalloonGame();

  return (
    <div className='space-y-4'>
      <ScoreBoard score={score} onReset={resetGame} />
      <div className='grid grid-cols-7 gap-2'>
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <BalloonCell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isGameOver={isGameOver}
              onClick={() => handleBalloonClick(rowIndex, colIndex)}
            />
          )),
        )}
      </div>
      {isGameOver && <GameOverModal onReset={resetGame} />}
    </div>
  );
}
