interface GameOverModalProps {
  onReset: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({ onReset }) => (
  <div className='text-center'>
    <div className='mb-2 text-xl font-bold text-red-500'>Game Over!</div>
    <button
      className='rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600'
      onClick={onReset}
    >
      Play Again
    </button>
  </div>
);
