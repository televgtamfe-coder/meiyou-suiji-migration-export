import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('scene2 staged reveal', () => {
  it('reveals tags first and chart later as the demo progresses', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene2-tags')).toHaveAttribute('data-stage', 'hidden');
    expect(screen.getByTestId('scene2-chart')).toHaveAttribute('data-stage', 'hidden');

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByTestId('scene2-tags')).toHaveAttribute('data-stage', 'visible');
    expect(screen.getByTestId('scene2-chart')).toHaveAttribute('data-stage', 'hidden');

    act(() => {
      vi.advanceTimersByTime(1400);
    });

    expect(screen.getByTestId('scene2-chart')).toHaveAttribute('data-stage', 'visible');
  });
});
