import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene2 page', () => {
  it('renders the empty landing guide with a visible back button and demo card', () => {
    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene2-back-button')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /在美柚，\s*记一刻/ })).toBeInTheDocument();
    expect(screen.getByText('说一句话，情绪 · 症状 · 饮食 自动整理')).toBeInTheDocument();
    expect(screen.getByText('示例 · 一次记录会发生什么')).toBeInTheDocument();
    expect(screen.getByText(/按住说话\s+或\s+点击长录/)).toBeInTheDocument();
  });

  it('shows a back button that returns to scene1', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1', '/scene2']} initialIndex={1}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByTestId('scene2-back-button'));

    expect(screen.getByTestId('scene-route-shell')).toBeInTheDocument();
  });
});
