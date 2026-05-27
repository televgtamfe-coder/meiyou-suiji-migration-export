import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 ui', () => {
  it('renders the calendar-first scene1 chrome', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));

    expect(screen.getByTestId('scene1-calendar-month-button')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-weekdays')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-legend')).toBeInTheDocument();
    expect(screen.getByText('分析')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '进入围绝经期模式' })).toBeInTheDocument();
    expect(screen.getByText('月经期')).toBeInTheDocument();
    expect(screen.getByText('预测经期')).toBeInTheDocument();
    expect(screen.getByText('月经来了')).toBeInTheDocument();
    expect(screen.getByText('爱爱')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-love-icon')).toBeInTheDocument();
    expect(screen.getByText('症状')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-symptom-icon')).toBeInTheDocument();
    expect(screen.getByText('心情')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-mood-icon')).toBeInTheDocument();
    expect(screen.getByText('白带')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-discharge-icon')).toBeInTheDocument();
    expect(screen.getByText('体温')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-temp-icon')).toBeInTheDocument();
    expect(screen.getByText('体重')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-weight-icon')).toBeInTheDocument();
    expect(screen.getByText('日记')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-diary-icon')).toBeInTheDocument();
    expect(screen.getByText('好习惯')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-habit-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-period-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-period-icon-shell')).toBeInTheDocument();
    expect(screen.getByText('首页')).toBeInTheDocument();
    expect(screen.getAllByText('记录').length).toBeGreaterThan(0);
    expect(screen.getByText('点滴')).toBeInTheDocument();
    expect(screen.getByText('消息')).toBeInTheDocument();
    expect(screen.getByText('我的')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '围绝经期' })).not.toBeInTheDocument();
  });
});
