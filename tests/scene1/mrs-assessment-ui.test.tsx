import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_MRS_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/mrs-assessment/mrsAssessmentStorage';

describe('mrs assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the mrs questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-mrs-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-mrs-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-mrs-assessment-shell')).toBeInTheDocument();
    expect(screen.getAllByText(/MRS/).length).toBeGreaterThan(0);
  });

  it('renders the mrs result preview route shell', () => {
    window.localStorage.setItem(
      SCENE1_MRS_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          mrsHotFlashes: '3',
          mrsHeartDiscomfort: '1',
          mrsSleepProblem: '2',
          mrsDepressiveMood: '1',
          mrsIrritability: '1',
          mrsAnxiety: '1',
          mrsExhaustion: '1',
          mrsSexualProblems: '1',
          mrsBladderProblems: '1',
          mrsVaginalDryness: '0',
          mrsJointPain: '2',
        },
        completedAt: '2026-06-08T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-mrs-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-mrs-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-mrs-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getAllByText(/MRS/).length).toBeGreaterThan(0);
  });
});
