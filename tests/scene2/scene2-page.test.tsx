import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene2 page', () => {
  it('renders a left-aligned title block without a back button', () => {
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');
    const { container } = render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    const head = container.querySelector('.scene2-head');

    expect(head).not.toBeNull();
    expect(within(head as HTMLElement).queryByRole('button')).not.toBeInTheDocument();
    expect(within(head as HTMLElement).getByText('记录')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /在美柚，\s*记一刻/ })).toBeInTheDocument();
    expect(screen.getByText('说一句话，情绪 · 症状 · 饮食 自动整理')).toBeInTheDocument();
    expect(screen.getByText('示例 · 一次记录会发生什么')).toBeInTheDocument();
    expect(screen.getByText(/按住说话\s+或\s+点击长录/)).toBeInTheDocument();
    expect(cssText).toContain('.scene2-shell .scene2-title');
    expect(cssText).toContain('text-align: left;');
  });
});
