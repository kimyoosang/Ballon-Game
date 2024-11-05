interface ScoreBoardProps {
  score: number;
  onReset: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, onReset }) => (
  <div className='flex items-center justify-between gap-8'>
    <div className='text-2xl font-bold'>Score: {score}</div>
    <button
      className='rounded bg-green-500 px-4 py-2 text-white transition-colors hover:bg-green-600'
      onClick={onReset}
    >
      다시 시작
    </button>
  </div>
);
