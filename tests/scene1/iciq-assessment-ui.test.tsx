import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_ICIQ_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/iciq-assessment/iciqAssessmentStorage';

describe('iciq assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the iciq questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-iciq-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-iciq-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-iciq-assessment-shell')).toBeInTheDocument();
    expect(screen.getAllByText(/ICIQ/).length).toBeGreaterThan(0);
  });

  it('renders the iciq result preview route shell', () => {
    window.localStorage.setItem(
      SCENE1_ICIQ_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          iciqLeakFrequency: '4',
          iciqLeakAmount: '4',
          iciqImpact: '8',
          iciqLeakTriggers: ['toilet', 'cough', 'exercise'],
        },
        completedAt: '2026-06-08T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-iciq-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-iciq-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-iciq-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getAllByText(/ICIQ/).length).toBeGreaterThan(0);
  });
});
