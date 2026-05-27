import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 home first-screen fidelity', () => {
  it('renders the Pixso first-screen modules on /scene1-home', () => {
    window.localStorage.clear();

    render(
      <MemoryRouter initialEntries={['/scene1-home']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene1-home-topbar')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-home-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-home-period-row')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-home-period-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-home-community-card')).toBeInTheDocument();
    expect(screen.getAllByTestId('scene1-home-post-thumbnail')).toHaveLength(3);
    expect(screen.getByText('KMI指数')).toBeInTheDocument();
    expect(screen.getByText('6分')).toBeInTheDocument();

    const tabbar = screen.getByTestId('scene1-tabbar');
    expect(within(tabbar).getByRole('button', { name: '首页' })).toHaveClass('active');
    expect(within(tabbar).getByRole('button', { name: '记录' })).toBeInTheDocument();
    expect(within(tabbar).getByRole('button', { name: '点滴' })).toBeInTheDocument();
    expect(within(tabbar).getByRole('button', { name: '消息' })).toBeInTheDocument();
    expect(within(tabbar).getByRole('button', { name: '我的' })).toBeInTheDocument();
  });

  it('uses the tighter 375px first-screen frame and 83px tabbar sizing from the Pixso capture', () => {
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(cssText).toContain('.scene1-home-page {\n  position: relative;\n  width: 375px;');
    expect(cssText).toContain('.scene1-home-topbar {\n  display: grid;');
    expect(cssText).toContain('min-height: 44px;');
    expect(cssText).toContain('.scene1-home-body {\n  display: flex;');
    expect(cssText).toContain('padding: 4px 12px 24px;');
    expect(cssText).toContain('.scene1-home-tabbar {\n  height: 83px;');
  });

  it('keeps the top search and post actions visually flat and reuses the scene1 tab icon set', () => {
    const homeText = readFileSync(resolve(process.cwd(), 'src/scenes/scene1/Scene1HomePage.tsx'), 'utf8');
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(cssText).toContain('.scene1-home-search-btn,\n.scene1-home-post-btn {\n  border: none;\n  background: transparent;');
    expect(homeText).toContain('strokeWidth="1.4"');
    expect(homeText).toContain('viewBox="0 0 24 24"');
  });
});
