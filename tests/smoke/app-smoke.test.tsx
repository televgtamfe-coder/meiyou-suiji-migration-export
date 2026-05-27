import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../../src/app/App';

describe('App bootstrap', () => {
  it('renders the scene1 route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-entry-modal')).toBeInTheDocument();
  });
});
