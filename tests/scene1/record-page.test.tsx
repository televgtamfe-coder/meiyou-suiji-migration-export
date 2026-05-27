import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('record page', () => {
  it('renders a complete record detail page after jumping from scene1', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '显示分析提示' }));
    await user.click(screen.getByRole('button', { name: '查看分析' }));

    expect(screen.getByRole('heading', { level: 1, name: '记录详情' })).toBeInTheDocument();
    expect(screen.getAllByText('经期记录已同步到周期分析').length).toBeGreaterThan(0);
    expect(screen.getByText('今天的记录摘要')).toBeInTheDocument();
    expect(screen.getAllByText('经期开始').length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: '返回记录首页' })).toBeInTheDocument();
  });
});
