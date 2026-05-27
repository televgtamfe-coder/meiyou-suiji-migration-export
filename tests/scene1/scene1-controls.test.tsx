import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 controls', () => {
  it('can toggle the prototype analysis notice in dev controls', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '显示分析提示' }));

    expect(screen.getByText('结合近期记录，已为你生成周期状态分析')).toBeInTheDocument();
  });
});
