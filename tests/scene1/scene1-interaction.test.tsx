import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 interaction', () => {
  it('shows the prototype analysis notice after period start is confirmed', async () => {
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
