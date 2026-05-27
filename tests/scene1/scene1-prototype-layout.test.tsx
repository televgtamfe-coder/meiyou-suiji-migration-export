import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 prototype layout fidelity', () => {
  it('renders the record area as vertical rows instead of a grid', () => {
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene1-record-list')).toBeInTheDocument();
    expect(screen.getAllByTestId(/scene1-record-row-/).length).toBe(9);
  });
});
