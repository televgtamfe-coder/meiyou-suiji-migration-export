import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import {
  SCENE1_HEALTH_PROFILE_STORAGE_KEY,
  SCENE1_BONE_ASSESSMENT_LATEST_STORAGE_KEY,
} from '../../src/scenes/scene1/bone-assessment/boneAssessmentStorage';

describe('bone assessment ui', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the bone assessment questionnaire route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-bone-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-bone-assessment-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-bone-assessment-shell')).toBeInTheDocument();
    expect(screen.getByText('OSTA + IOF 骨质疏松风险判定')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '年龄' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '身高' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '体重' })).toBeInTheDocument();
    expect(screen.getByText('步骤 1 / 5')).toBeInTheDocument();
  });

  it('hides exact shared profile fields that are already known', () => {
    window.localStorage.setItem(
      SCENE1_HEALTH_PROFILE_STORAGE_KEY,
      JSON.stringify({ age: '48', heightCm: '160', weightKg: '54' }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-bone-assessment']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-bone-assessment-carryover')).toBeInTheDocument();
    expect(screen.getByText('已带入 年龄 48岁')).toBeInTheDocument();
    expect(screen.getByText('已带入 身高 160cm')).toBeInTheDocument();
    expect(screen.getByText('已带入 体重 54kg')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '年龄' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '身高' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '体重' })).not.toBeInTheDocument();
    expect(screen.getByText('步骤 1 / 4')).toBeInTheDocument();
  });

  it('renders the bone assessment result preview route shell with main and secondary result cards', () => {
    window.localStorage.setItem(
      SCENE1_BONE_ASSESSMENT_LATEST_STORAGE_KEY,
      JSON.stringify({
        answers: {
          age: '52',
          heightCm: '160',
          weightKg: '48',
          boneParentOsteoporosisOrFragilityFracture: 'yes',
          boneExerciseUnder30Min: 'yes',
          vdSunExposureUnder20Min: 'yes',
          vdBoneMuscleDiscomfort: 'yes',
        },
      }),
    );

    render(
      <MemoryRouter initialEntries={['/scene1-bone-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-bone-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-bone-assessment-result-main-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-bone-assessment-result-vitamin-d-card')).toBeInTheDocument();
    expect(screen.getByText('OSTA + IOF 骨质疏松风险判定')).toBeInTheDocument();
    expect(screen.getByText('维生素D风险')).toBeInTheDocument();
    expect(screen.getByText('尽快安排评估')).toBeInTheDocument();
    expect(screen.getByText(/家族史提示你可能有更高的骨健康风险/)).toBeInTheDocument();
    expect(screen.getByText(/共有 2 项回答“是”/)).toBeInTheDocument();
    expect(screen.getByText(/较高的维生素D缺乏可能/)).toBeInTheDocument();
  });
});
