import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene2 advanced fidelity', () => {
  it('shows animated-style microphone shell and updates hint on press', () => {
    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    const micButton = screen.getByLabelText('按住说话');
    expect(screen.getByTestId('scene2-mic-glow')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-mic-stroke')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-mic-core')).toBeInTheDocument();

    fireEvent.mouseDown(micButton);
    expect(screen.getByText('松开发表')).toBeInTheDocument();
    fireEvent.mouseUp(micButton);
    expect(screen.getByText(/按住说话\s+或\s+点击长录/)).toBeInTheDocument();
  });
});
