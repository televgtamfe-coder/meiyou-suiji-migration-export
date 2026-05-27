import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene3 page', () => {
  it('renders the blank record page with empty placeholder and action chrome', () => {
    render(
      <MemoryRouter initialEntries={['/scene3']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1, name: '记录' })).toBeInTheDocument();
    expect(screen.getByText('情绪 · 身体 · 体重')).toBeInTheDocument();
    expect(screen.getByText('还没有记录')).toBeInTheDocument();
    expect(screen.getByText('说句话，或点下方按钮开始第一次记录')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '日历' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '搜索' })).toBeInTheDocument();
  });
});
