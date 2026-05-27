import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 visual fidelity', () => {
  it('renders the prototype-style calendar controls and record cells', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));

    expect(screen.getByRole('tablist', { name: '模式切换' })).toBeInTheDocument();
    expect(screen.getByText('今天')).toBeInTheDocument();
    expect(screen.getByText('📷 ›')).toBeInTheDocument();
    expect(screen.getByText('💧')).toBeInTheDocument();
    expect(screen.getByText('🍎')).toBeInTheDocument();
    expect(screen.getByText('☕')).toBeInTheDocument();
    expect(screen.getByText('🏃')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '分析' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '是' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '否' })).toBeInTheDocument();
    expect(screen.getByText('记录')).toBeInTheDocument();
    expect(screen.getByText('点滴')).toBeInTheDocument();
    expect(screen.getByText('消息')).toBeInTheDocument();
    expect(screen.getByText('我的')).toBeInTheDocument();
  });
});
