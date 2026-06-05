import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('kegel training route', () => {
  it('renders the formal training tool page inside the phone shell', () => {
    render(
      <MemoryRouter initialEntries={['/kegel-training']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('phone-shell')).toBeInTheDocument();
    expect(screen.getByText('9:41')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: '凯格尔正式训练' })).toBeInTheDocument();
    expect(screen.getByTestId('kegel-training-page')).toBeInTheDocument();
    expect(screen.getByTestId('kegel-training-stage')).toHaveAttribute('data-stage', 'idle');
    expect(screen.getByTestId('kegel-training-state-label')).toHaveTextContent('等待开始');
    expect(screen.getByTestId('kegel-training-progress')).toHaveTextContent('0%');
    expect(screen.getByTestId('kegel-training-duration')).toHaveTextContent('00:00 / 00:12');
    expect(screen.getByTestId('kegel-training-completed-rounds')).toHaveTextContent('已完成 0 轮');
    expect(screen.getByTestId('kegel-training-primary-button')).toHaveTextContent('开始训练');
    expect(screen.getByTestId('kegel-training-reset-button')).toHaveTextContent('重置本轮');
    expect(screen.getByTestId('kegel-training-done-banner')).toHaveAttribute('data-stage', 'hidden');
  });
});
