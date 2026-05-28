import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import fs from 'node:fs';
import { AppRouter } from '../../src/app/router';

describe('scene1 my page', () => {
  it('renders the my page mode row with the package-aligned structure', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-my']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene1-my-shell')).toBeInTheDocument();
    expect(screen.getByText('一颗小草莓')).toBeInTheDocument();
    expect(screen.getAllByText('美柚会员').length).toBeGreaterThan(0);
    expect(screen.getByText('经期模式')).toBeInTheDocument();
    expect(screen.getByText('备孕模式')).toBeInTheDocument();
    expect(screen.getByText('怀孕模式')).toBeInTheDocument();
    expect(screen.getByText('育儿模式')).toBeInTheDocument();
    expect(screen.getByText('当前')).toBeInTheDocument();
    expect(screen.getAllByTestId('scene1-my-mode-sprite')).toHaveLength(4);
    expect(screen.getByTestId('scene1-my-mode-item-period')).toHaveClass('active');
    expect(screen.getByTestId('scene1-my-member-widgets-icon')).toHaveClass('scene1-my-member-feature-icon-widgets');
    expect(screen.getByTestId('scene1-my-service-icon-widgets')).toHaveClass('scene1-my-service-icon-widgets');

    const tabbar = screen.getByTestId('scene1-tabbar');
    expect(within(tabbar).getByRole('button', { name: '我的' })).toHaveClass('active');
  });

  it('does not add extra top padding below the shared status bar on the my page scroll area', () => {
    const css = fs.readFileSync('src/styles/base.css', 'utf8');

    expect(css).toMatch(/\.scene1-my-scroll\s*\{[\s\S]*padding:\s*0\s+0\s+110px;/);
  });
});
