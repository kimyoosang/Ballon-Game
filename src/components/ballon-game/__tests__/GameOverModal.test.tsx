import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GameOverModal } from '../GameOverModal';

describe('GameOverModal', () => {
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('게임오버 메시지와 재시작 버튼을 렌더링한다', () => {
    render(<GameOverModal onReset={mockOnReset} />);
    expect(screen.getByText('Game Over!')).toBeInTheDocument();
    expect(screen.getByText('Play Again')).toBeInTheDocument();
  });

  it('Play Again 버튼 클릭 시 onReset이 호출된다', async () => {
    const user = userEvent.setup();
    render(<GameOverModal onReset={mockOnReset} />);
    await user.click(screen.getByText('Play Again'));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
