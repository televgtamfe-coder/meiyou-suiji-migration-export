import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('kegel review timing', () => {
  it('advances through teaching scenes and timer preview states over time', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/kegel-review']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's1_intro');
    expect(screen.getByTestId('kegel-review-tempo-value')).toHaveTextContent('·');

    act(() => {
      vi.advanceTimersByTime(2_100);
    });

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's2_muscle');
    expect(screen.getByTestId('kegel-review-subtitle-text')).toHaveTextContent('练的是盆底肌');
    expect(screen.getByTestId('kegel-review-state-label')).toHaveTextContent('识别训练部位');

    act(() => {
      vi.advanceTimersByTime(9_000);
    });

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's5_ready');
    expect(screen.getByTestId('kegel-review-tempo-value')).toHaveTextContent('2');
    expect(screen.getByTestId('kegel-review-state-label')).toHaveTextContent('准备开始');

    act(() => {
      vi.advanceTimersByTime(2_100);
    });

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's6_contract');
    expect(screen.getByTestId('kegel-review-tempo-value')).toHaveTextContent('3');
    expect(screen.getByTestId('kegel-review-state-label')).toHaveTextContent('收紧阶段');

    act(() => {
      vi.advanceTimersByTime(7_000);
    });

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's8_done');
    expect(screen.getByTestId('kegel-review-scene-title')).toHaveTextContent('完成反馈');
    expect(screen.getByTestId('kegel-review-progress')).toHaveTextContent('67%');
    expect(screen.getByTestId('kegel-review-state-label')).toHaveTextContent('完成一次基础节拍');
  });
});
