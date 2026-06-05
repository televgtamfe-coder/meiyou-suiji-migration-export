import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('kegel training timing', () => {
  it('advances through one training round and can reset afterward', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/kegel-training']}>
        <AppRouter />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId('kegel-training-primary-button'));

    expect(screen.getByTestId('kegel-training-stage')).toHaveAttribute('data-stage', 'ready');
    expect(screen.getByTestId('kegel-training-state-label')).toHaveTextContent('准备开始');
    expect(screen.getByTestId('kegel-training-primary-button')).toHaveTextContent('暂停训练');

    act(() => {
      vi.advanceTimersByTime(3_100);
    });

    expect(screen.getByTestId('kegel-training-stage')).toHaveAttribute('data-stage', 'contract');
    expect(screen.getByTestId('kegel-training-tempo-value')).toHaveTextContent('3');
    expect(screen.getByTestId('kegel-training-duration')).toHaveTextContent('00:03 / 00:12');

    act(() => {
      vi.advanceTimersByTime(3_000);
    });

    expect(screen.getByTestId('kegel-training-stage')).toHaveAttribute('data-stage', 'relax');
    expect(screen.getByTestId('kegel-training-tempo-value')).toHaveTextContent('4');
    expect(screen.getByTestId('kegel-training-state-label')).toHaveTextContent('放松阶段');

    act(() => {
      vi.advanceTimersByTime(4_000);
    });

    expect(screen.getByTestId('kegel-training-stage')).toHaveAttribute('data-stage', 'done');
    expect(screen.getByTestId('kegel-training-tempo-value')).toHaveTextContent('✓');
    expect(screen.getByTestId('kegel-training-done-banner')).toHaveAttribute('data-stage', 'visible');

    act(() => {
      vi.advanceTimersByTime(2_000);
    });

    expect(screen.getByTestId('kegel-training-progress')).toHaveTextContent('100%');
    expect(screen.getByTestId('kegel-training-completed-rounds')).toHaveTextContent('已完成 1 轮');
    expect(screen.getByTestId('kegel-training-primary-button')).toHaveTextContent('再练一轮');

    fireEvent.click(screen.getByTestId('kegel-training-reset-button'));

    expect(screen.getByTestId('kegel-training-stage')).toHaveAttribute('data-stage', 'idle');
    expect(screen.getByTestId('kegel-training-progress')).toHaveTextContent('0%');
    expect(screen.getByTestId('kegel-training-primary-button')).toHaveTextContent('开始训练');
  });
});
