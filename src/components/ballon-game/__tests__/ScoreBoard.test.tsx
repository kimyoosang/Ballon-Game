import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScoreBoard } from '../ScoreBoard';

describe('ScoreBoard', () => {
  const mockOnReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('점수를 올바르게 표시한다', () => {
    render(<ScoreBoard score={42} onReset={mockOnReset} />);
    expect(screen.getByText('Score: 42')).toBeInTheDocument();
  });

  it('다시 시작 버튼을 렌더링한다', () => {
    render(<ScoreBoard score={0} onReset={mockOnReset} />);
    expect(screen.getByText('다시 시작')).toBeInTheDocument();
  });

  it('다시 시작 버튼 클릭 시 onReset이 호출된다', async () => {
    const user = userEvent.setup();
    render(<ScoreBoard score={0} onReset={mockOnReset} />);
    await user.click(screen.getByText('다시 시작'));
    expect(mockOnReset).toHaveBeenCalledTimes(1);
  });
});
