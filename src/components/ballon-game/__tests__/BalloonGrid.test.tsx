import { useBalloonGame } from '@/hooks/balloon-game/useBalloonGame';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BalloonGrid from '../BalloonGrid';

jest.mock('@/hooks/balloon-game/useBalloonGame');

describe('BalloonGrid 컴포넌트', () => {
  const user = userEvent.setup();
  const mockHandleBalloonClick = jest.fn();
  const mockResetGame = jest.fn();

  beforeEach(() => {
    const mockGrid = Array(7)
      .fill(null)
      .map(() => Array(7).fill(null));
    mockGrid[0] = Array(7)
      .fill(null)
      .map((_, i) => (i < 5 ? '🎈' : null));

    (useBalloonGame as jest.Mock).mockReturnValue({
      grid: mockGrid,
      isGameOver: false,
      score: 0,
      handleBalloonClick: mockHandleBalloonClick,
      resetGame: mockResetGame,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('풍선과 빈 칸이 올바르게 렌더링되어야 한다', () => {
    render(<BalloonGrid />);
    const balloons = screen.getAllByText('🎈');
    expect(balloons).toHaveLength(5);
  });

  it('풍선을 클릭하면 handleBalloonClick이 호출되어야 한다', async () => {
    render(<BalloonGrid />);
    const balloons = screen.getAllByText('🎈');
    await user.click(balloons[0]);
    expect(mockHandleBalloonClick).toHaveBeenCalledWith(0, 0);
  });

  it('게임 오버 상태에서는 GameOverModal이 표시되어야 한다', () => {
    (useBalloonGame as jest.Mock).mockReturnValue({
      grid: Array(7).fill(Array(7).fill(null)),
      isGameOver: true,
      score: 0,
      handleBalloonClick: mockHandleBalloonClick,
      resetGame: mockResetGame,
    });

    render(<BalloonGrid />);
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('다시 시작 버튼을 클릭하면 resetGame이 호출되어야 한다', async () => {
    render(<BalloonGrid />);
    await user.click(screen.getByText('다시 시작'));
    expect(mockResetGame).toHaveBeenCalled();
  });

  it('게임 오버 상태에서는 풍선을 클릭할 수 없어야 한다', () => {
    (useBalloonGame as jest.Mock).mockReturnValue({
      grid: Array(7).fill(Array(7).fill('🎈')),
      isGameOver: true,
      score: 0,
      handleBalloonClick: mockHandleBalloonClick,
      resetGame: mockResetGame,
    });

    render(<BalloonGrid />);
    const balloons = screen.getAllByText('🎈');
    balloons.forEach((balloon) => {
      expect(balloon).toHaveAttribute('disabled');
    });
  });
});
