import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('kegel review route', () => {
  it('renders the teaching video page inside the phone shell', () => {
    render(
      <MemoryRouter initialEntries={['/kegel-review']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('phone-shell')).toBeInTheDocument();
    expect(screen.getByText('9:41')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: '凯格尔训练教学' })).toBeInTheDocument();
    expect(screen.getByTestId('kegel-review-page')).toBeInTheDocument();
    expect(screen.getByTestId('kegel-review-video')).toBeInTheDocument();
    expect(screen.getByTestId('kegel-review-timer-preview')).toBeInTheDocument();
    expect(screen.getByTestId('kegel-review-scene-title')).toHaveTextContent('标题建立');
    expect(screen.getByTestId('kegel-review-state-label')).toHaveTextContent('建立主题');
    expect(screen.getByTestId('kegel-review-progress')).toHaveTextContent('0%');
    expect(screen.getByTestId('kegel-review-duration')).toHaveTextContent('00:00 / 00:30');
    expect(screen.getByTestId('kegel-review-entry-link')).toHaveAttribute('href', '/kegel-training');
    expect(screen.getByText('先看肌肉模拟教学视频，再通过下方数秒器预览节拍，最后进入正式训练工具页。')).toBeInTheDocument();
  });
});
