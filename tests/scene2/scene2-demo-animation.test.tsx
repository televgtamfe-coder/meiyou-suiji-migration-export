import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('scene2 animated demo', () => {
  it('progresses the transcript content over time while keeping a numeric progress badge', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    const initialTranscript = screen.getAllByTestId('scene2-transcript').at(-1);
    if (!initialTranscript) throw new Error('scene2 transcript not found');
    const initialLength = initialTranscript.textContent?.length ?? 0;
    expect(screen.getByTestId('scene2-progress')).toHaveTextContent(/\d+%/);

    act(() => {
      vi.advanceTimersByTime(1600);
    });

    const nextTranscript = screen.getAllByTestId('scene2-transcript').at(-1);
    if (!nextTranscript) throw new Error('scene2 transcript not found after animation');
    const nextLength = nextTranscript.textContent?.length ?? 0;

    expect(nextLength).toBeGreaterThan(initialLength);
    expect(screen.getByTestId('scene2-progress')).toHaveTextContent(/\d+%/);
  });
});
