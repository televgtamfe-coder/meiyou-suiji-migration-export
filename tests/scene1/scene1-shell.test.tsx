import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { AppRouter } from '../../src/app/router';

describe('Scene1 shell', () => {
  it('renders a centered phone shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByTestId('phone-shell')).toBeInTheDocument();
  });

  it('keeps scene1 content constrained to the phone shell height', () => {
    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    const phoneShell = screen.getByTestId('phone-shell');
    const sceneShell = screen.getByTestId('scene-route-shell');
    const cssText = readFileSync(resolve(process.cwd(), 'src/styles/base.css'), 'utf8');

    expect(phoneShell).toBeInTheDocument();
    expect(sceneShell).toBeInTheDocument();
    expect(cssText).toContain('.phone-shell');
    expect(cssText).toContain('height: 100vh;');
    expect(cssText).toContain('overflow: hidden;');
    expect(cssText).toMatch(
      /\.scene1-calendar-page\s*\{[\s\S]*position:\s*relative;[\s\S]*height:\s*100%;[\s\S]*min-height:\s*100%;[\s\S]*display:\s*flex;[\s\S]*flex-direction:\s*column;[\s\S]*overflow:\s*hidden;[\s\S]*\}/
    );
    expect(cssText).toMatch(
      /\.scene1-base-layer\s*\{[\s\S]*position:\s*relative;[\s\S]*flex:\s*1;[\s\S]*min-height:\s*0;[\s\S]*\}/
    );
    expect(cssText).toMatch(
      /\.scene1-assessment-backdrop,\s*\.scene1-assessment-shell\s*\{[\s\S]*position:\s*absolute;[\s\S]*inset:\s*44px\s+0\s+0;[\s\S]*z-index:\s*260;[\s\S]*\}/
    );
  });
});
