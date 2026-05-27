import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene2 wave and chart fidelity', () => {
  it('uses a longer waveform strip and exposes chart columns for progressive rendering', () => {
    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('scene2-wave-bar')).toHaveLength(22);
    expect(screen.getAllByTestId('scene2-chart-col')).toHaveLength(7);
    expect(screen.getByTestId('scene2-bubble-dur')).toBeInTheDocument();
  });
});
