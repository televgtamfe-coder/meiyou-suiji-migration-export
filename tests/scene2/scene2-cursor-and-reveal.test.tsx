import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('scene2 cursor and reveal fidelity', () => {
  it('shows a typing cursor early and then reveals tags progressively before the chart fully settles', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene2-cursor')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-tags')).toHaveAttribute('data-stage', 'hidden');

    act(() => {
      vi.advanceTimersByTime(1200);
    });

    expect(screen.getByTestId('scene2-tags')).toHaveAttribute('data-stage', 'visible');
    expect(screen.getByTestId('scene2-chart')).toHaveAttribute('data-stage', 'hidden');

    act(() => {
      vi.advanceTimersByTime(600);
    });

    expect(screen.getByTestId('scene2-chart')).toHaveAttribute('data-stage', 'visible');
  });
});
