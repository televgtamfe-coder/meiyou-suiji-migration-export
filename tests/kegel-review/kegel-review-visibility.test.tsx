import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

afterEach(() => {
  vi.useRealTimers();
});

describe('kegel review staged visibility', () => {
  it('reveals the reminder cards only when their scenes arrive', () => {
    vi.useFakeTimers();

    render(
      <MemoryRouter initialEntries={['/kegel-review']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('kegel-review-safety-card')).toHaveAttribute('data-stage', 'hidden');
    expect(screen.getByTestId('kegel-review-next-step-card')).toHaveAttribute('data-stage', 'hidden');

    act(() => {
      vi.advanceTimersByTime(23_100);
    });

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's9_risk');
    expect(screen.getByTestId('kegel-review-safety-card')).toHaveAttribute('data-stage', 'visible');
    expect(screen.getByTestId('kegel-review-safety-card')).toHaveTextContent('明显不适时先暂停训练');
    expect(screen.getByTestId('kegel-review-next-step-card')).toHaveAttribute('data-stage', 'hidden');
    expect(screen.getByTestId('kegel-review-state-label')).toHaveTextContent('风险提示');

    act(() => {
      vi.advanceTimersByTime(4_000);
    });

    expect(screen.getByTestId('kegel-review-stage')).toHaveAttribute('data-scene', 's10_cta');
    expect(screen.getByTestId('kegel-review-safety-card')).toHaveAttribute('data-stage', 'hidden');
    expect(screen.getByTestId('kegel-review-next-step-card')).toHaveAttribute('data-stage', 'visible');
    expect(screen.getByTestId('kegel-review-next-step-card')).toHaveTextContent('先评估，再开始训练');
    expect(screen.getByTestId('kegel-review-scene-title')).toHaveTextContent('产品收口');
  });
});
