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
    expect(screen.getByText('KMI指数')).toBeInTheDocument();
    expect(screen.getByText('6分')).toBeInTheDocument();
    expect(screen.getByText('月月姐姐')).toBeInTheDocument();
    expect(screen.getAllByText('宝宝1岁')).toHaveLength(3);
    expect(screen.getByText('#姐妹来帮忙')).toBeInTheDocument();
    expect(screen.getByText('全文')).toBeInTheDocument();
    expect(screen.getByText('热评')).toBeInTheDocument();
    expect(screen.getAllByTestId('scene1-home-feed-image')).toHaveLength(3);

    const tabbar = screen.getByTestId('scene1-tabbar');
    expect(within(tabbar).getByRole('button', { name: '首页' })).toHaveClass('active');
    expect(within(tabbar).getByRole('button', { name: '记录' })).toBeInTheDocument();
    expect(within(tabbar).getByRole('button', { name: '点滴' })).toBeInTheDocument();
    expect(within(tabbar).getByRole('button', { name: '消息' })).toBeInTheDocument();
    expect(within(tabbar).getByRole('button', { name: '我的' })).toBeInTheDocument();
  });

  it('uses the full phone-shell width so the bottom area aligns with the record page standard', () => {
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(cssText).toMatch(/\.scene1-home-page\s*\{[^}]*position:\s*relative;[^}]*width:\s*100%;/);
    expect(cssText).toMatch(/\.scene1-home-topbar\s*\{[^}]*display:\s*grid;/);
    expect(cssText).toContain('min-height: 44px;');
    expect(cssText).toMatch(/\.scene1-home-body\s*\{[^}]*display:\s*flex;/);
    expect(cssText).toContain('padding: 4px 12px 24px;');
    expect(cssText).not.toContain('.scene1-home-tabbar {');
  });

  it('keeps the top search and post actions visually flat and reuses the scene1 tab icon set', () => {
    const homeText = readFileSync(resolve(process.cwd(), 'src/scenes/scene1/Scene1HomePage.tsx'), 'utf8');
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(cssText).toMatch(/\.scene1-home-search-btn,\s*\.scene1-home-post-btn\s*\{[\s\S]*?border:\s*none;[\s\S]*?background:\s*transparent;/);
    expect(homeText).toContain('strokeWidth="1.8"');
    expect(homeText).toContain('strokeWidth="1.45"');
    expect(homeText).toContain('viewBox="0 0 20 20"');
  });
});
