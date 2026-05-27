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
    expect(cssText).toContain(`.scene1-calendar-page {
  position: relative;
  height: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}`);
    expect(cssText).toContain(`.scene1-base-layer {
  position: relative;
  flex: 1;
  min-height: 0;
}`);
    expect(cssText).toContain(`.scene1-assessment-backdrop,
.scene1-assessment-shell {
  position: absolute;
  inset: 44px 0 0;
  z-index: 260;
}`);
  });
});
