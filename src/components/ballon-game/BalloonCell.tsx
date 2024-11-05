interface BalloonCellProps {
  value: string | null;
  isGameOver: boolean;
  onClick: () => void;
}

export function BalloonCell({ value, isGameOver, onClick }: BalloonCellProps) {
  return (
    <button
      className={`flex h-12 w-12 items-center justify-center rounded transition-colors ${
        value && !isGameOver
          ? 'hover:bg-gray-100 active:bg-gray-200'
          : 'bg-gray-300'
      } cursor-pointer`}
      onClick={onClick}
      disabled={isGameOver || !value}
    >
      {value}
    </button>
  );
}
