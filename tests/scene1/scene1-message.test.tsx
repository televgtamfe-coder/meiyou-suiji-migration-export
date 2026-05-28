import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 message page', () => {
  it('renders the message page modules with the message tab active', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-message']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene1-message-shell')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByTestId('scene1-message-list')).toBeInTheDocument();
    expect(screen.getAllByTestId('scene1-message-row').length).toBeGreaterThan(0);

    const tabbar = screen.getByTestId('scene1-tabbar');
    expect(within(tabbar).getByRole('button', { name: '消息' })).toHaveClass('active');
  });

  it('routes the 消息 tab to /scene1-message', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-home']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '消息' }));

    expect(screen.getByTestId('scene1-message-shell')).toBeInTheDocument();
  });

  it('uses the full phone-shell width so the bottom area stays aligned with the shared tabbar', () => {
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(cssText).toMatch(/\.scene1-message-page\s*\{[^}]*position:\s*relative;[^}]*width:\s*100%;/);
  });
});
