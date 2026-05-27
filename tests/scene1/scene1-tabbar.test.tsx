import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 tabbar fidelity', () => {
  it('renders a prototype-style bottom tabbar with the original five items and a profile badge', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));

    const tabbar = screen.getByTestId('scene1-tabbar');
    const tabs = within(tabbar).getAllByRole('button');

    expect(tabs).toHaveLength(5);
    expect(within(tabbar).getByText('首页')).toBeInTheDocument();
    expect(within(tabbar).getByText('记录')).toBeInTheDocument();
    expect(within(tabbar).getByText('点滴')).toBeInTheDocument();
    expect(within(tabbar).getByText('消息')).toBeInTheDocument();
    expect(within(tabbar).getByText('我的')).toBeInTheDocument();
    expect(within(tabbar).queryByText('日历')).not.toBeInTheDocument();
    expect(within(tabbar).getByTestId('scene1-tab-notif')).toBeInTheDocument();
    expect(within(tabbar).getByTestId('scene1-tab-record')).toHaveClass('active');
  });

  it('routes the 点滴 tab to /scene2', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '点滴' }));

    expect(screen.getByTestId('scene2-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-hero')).toBeInTheDocument();
  });

  it('routes the 首页 tab to the period home page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '首页' }));

    expect(screen.getByTestId('scene1-home-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-tab-home')).toHaveClass('active');
  });

  it('routes the 我的 tab to the placeholder my page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-home']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '我的' }));

    expect(screen.getByTestId('scene1-my-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-my-placeholder')).toBeInTheDocument();
  });

  it('anchors the bottom tabbar inside the phone shell instead of the viewport', () => {
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(cssText).toContain('.prototype-tabbar');
    expect(cssText).not.toContain('.prototype-tabbar {\n  position: fixed;');
    expect(cssText).not.toContain('padding: 8px 0 calc(env(safe-area-inset-bottom, 8px) + 8px);');
    expect(cssText).toContain('padding: 8px 0 8px;');
  });
});
