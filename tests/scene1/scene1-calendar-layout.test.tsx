import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 calendar landing', () => {
  it('renders the calendar-first scene matching the original prototype structure', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));

    expect(screen.getByText('4月')).toBeInTheDocument();
    expect(screen.getByText('经期')).toBeInTheDocument();
    expect(screen.getByText('备孕')).toBeInTheDocument();
    expect(screen.getByText('怀孕')).toBeInTheDocument();
    expect(screen.getByText('育儿')).toBeInTheDocument();
    expect(screen.getByText('分析')).toBeInTheDocument();
    expect(screen.getByText('月经期')).toBeInTheDocument();
    expect(screen.getByText('预测经期')).toBeInTheDocument();
    expect(screen.getByText('排卵期')).toBeInTheDocument();
    expect(screen.getByText('排卵日')).toBeInTheDocument();
    expect(screen.getByText('月经来了')).toBeInTheDocument();
    expect(screen.getByText('爱爱')).toBeInTheDocument();
    expect(screen.getByText('症状')).toBeInTheDocument();
    expect(screen.getByText('心情')).toBeInTheDocument();
    expect(screen.getByText('白带')).toBeInTheDocument();
    expect(screen.getByText('体温')).toBeInTheDocument();
    expect(screen.getByText('体重')).toBeInTheDocument();
    expect(screen.getByText('日记')).toBeInTheDocument();
    expect(screen.getByText('好习惯')).toBeInTheDocument();
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getByText('记录')).toBeInTheDocument();
    expect(screen.getByText('点滴')).toBeInTheDocument();
    expect(screen.getByText('消息')).toBeInTheDocument();
    expect(screen.getByText('我的')).toBeInTheDocument();
  });

  it('shows the prototype analysis notice after confirming period start', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '是' }));

    expect(screen.getByText('结合近期记录，已为你生成周期状态分析')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '查看分析' })).toBeInTheDocument();
  });
});
