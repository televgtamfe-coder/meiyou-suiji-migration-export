import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('scene2 timeline pacing', () => {
  it('reveals voice first, then transcript, then tags, then chart in separate phases', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene2-card')).toHaveAttribute('data-stage', 'intro');

    act(() => {
      vi.advanceTimersByTime(600);
    });
    expect(screen.getByTestId('scene2-card')).toHaveAttribute('data-stage', 'voice');

    act(() => {
      vi.advanceTimersByTime(700);
    });
    expect(screen.getByTestId('scene2-card')).toHaveAttribute('data-stage', 'transcript');

    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByTestId('scene2-card')).toHaveAttribute('data-stage', 'tags');

    act(() => {
      vi.advanceTimersByTime(900);
    });
    expect(screen.getByTestId('scene2-card')).toHaveAttribute('data-stage', 'chart');
  });
});
