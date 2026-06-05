import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { SCENE1_EXERCISE_ASSESSMENT_LATEST_STORAGE_KEY } from '../../src/scenes/scene1/exercise-assessment/exerciseAssessmentStorage';

describe('exercise assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the exercise assessment questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-exercise-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-exercise-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-exercise-assessment-shell')).toBeInTheDocument();
    expect(screen.getByText('PAR-Q 运动能力评估')).toBeInTheDocument();
    expect(
      screen.getByText('请回答“是”或“否”（回顾过去或当前状态），用 7 个标准问题快速判断当前是否适合直接开始运动。'),
    ).toBeInTheDocument();
    expect(screen.getByText('步骤 1 / 3')).toBeInTheDocument();
    expect(
      screen.getByText('医生是否曾告诉过您患有心脏病或高血压？'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '下一步' })).toBeDisabled();
  });

  it('renders the exercise assessment result preview route shell', () => {
    window.localStorage.setItem(
      SCENE1_EXERCISE_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          exerciseHeartDiseaseOrHypertension: 'no',
          exerciseChestPain: 'yes',
          exerciseDizzinessOrSyncope: 'no',
          exerciseOtherChronicDisease: 'no',
          exercisePrescriptionMedication: 'no',
          exerciseBoneJointSoftTissueIssue: 'no',
          exerciseMedicalSupervisionOnly: 'no',
        },
        completedAt: '2026-06-05T10:00:00.000Z',
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-exercise-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-exercise-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-exercise-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getByText('你的运动准备度评估已完成')).toBeInTheDocument();
    expect(screen.getByText('暂不建议自行开始高强度运动')).toBeInTheDocument();
    expect(screen.getByText('在专业指导下开始')).toBeInTheDocument();
    expect(screen.getByText(/本评估用于运动前健康筛查/)).toBeInTheDocument();
  });
});
