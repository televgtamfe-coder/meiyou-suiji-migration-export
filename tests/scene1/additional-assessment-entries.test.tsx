import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('additional assessment entries', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('navigates to mrs from the home services grid', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-home']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const servicesGrid = screen.getByTestId('scene1-pregnancy-services-grid');

    await user.click(within(servicesGrid).getByRole('button', { name: /MRS/ }));
    expect(screen.getByTestId('scene1-mrs-assessment-route-shell')).toBeInTheDocument();
  });

  it('navigates to psqi from the home services grid', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-home']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const servicesGrid = screen.getByTestId('scene1-pregnancy-services-grid');

    await user.click(within(servicesGrid).getByRole('button', { name: /PSQI/ }));
    expect(screen.getByTestId('scene1-psqi-assessment-route-shell')).toBeInTheDocument();
  });

  it('navigates to iciq from the home services grid', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-home']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const servicesGrid = screen.getByTestId('scene1-pregnancy-services-grid');

    await user.click(within(servicesGrid).getByRole('button', { name: /ICIQ/ }));
    expect(screen.getByTestId('scene1-iciq-assessment-route-shell')).toBeInTheDocument();
  });
});
