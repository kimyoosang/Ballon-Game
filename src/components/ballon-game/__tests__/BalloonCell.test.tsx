import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BalloonCell } from '../BalloonCell';

describe('BalloonCell', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('풍선이 있을 때 올바르게 렌더링된다', () => {
    render(<BalloonCell value='🎈' isGameOver={false} onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('🎈');
    expect(button).not.toBeDisabled();
  });

  it('빈 셀일 때 disabled 상태가 된다', () => {
    render(
      <BalloonCell value={null} isGameOver={false} onClick={mockOnClick} />,
    );
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('게임오버 상태에서는 disabled 상태가 된다', () => {
    render(<BalloonCell value='🎈' isGameOver={true} onClick={mockOnClick} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('클릭 시 onClick 함수가 호출된다', async () => {
    const user = userEvent.setup();
    render(<BalloonCell value='🎈' isGameOver={false} onClick={mockOnClick} />);
    await user.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
