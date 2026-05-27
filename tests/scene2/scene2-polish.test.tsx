import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene2 polish fidelity', () => {
  it('exposes the hero, demo card and microphone as distinct visual layers for final polishing', () => {
    render(
      <MemoryRouter initialEntries={['/scene2']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('scene2-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-demo-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-voice-wrap')).toBeInTheDocument();
    expect(screen.getByTestId('scene2-mic-core')).toBeInTheDocument();
  });
});
