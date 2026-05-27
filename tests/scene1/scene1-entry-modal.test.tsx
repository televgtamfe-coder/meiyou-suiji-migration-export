import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 perimenopause entry modal', () => {
  it('opens on every scene1 visit and can be dismissed', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText('开启您的围绝经期健康评估')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '立即评估' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '稍后再说' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '稍后再说' }));

    expect(screen.queryByText('开启您的围绝经期健康评估')).not.toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-list')).toBeInTheDocument();
  });

  it('launches the wizard when the primary action is clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));

    expect(screen.getByText('个人健康洞察')).toBeInTheDocument();
    expect(screen.getByText('评估须知')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '下一步' })).toBeInTheDocument();
  });
});
