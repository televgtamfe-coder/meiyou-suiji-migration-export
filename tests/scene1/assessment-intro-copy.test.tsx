import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { AssessmentStepRenderer } from '../../src/scenes/scene1/components/AssessmentStepRenderer';
import { createAssessmentStateWithoutEntry } from '../../src/scenes/scene1/assessmentState';

function renderAssessmentRoute(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <AppRouter />
    </MemoryRouter>,
  );
}

describe('assessment intro copy', () => {
  it('renders the merged usage intro on the main perimenopause assessment home step', () => {
    render(
      <AssessmentStepRenderer
        state={{
          ...createAssessmentStateWithoutEntry(),
          assessmentOpen: true,
          currentStep: 1,
        }}
        onAnswer={() => {}}
      />,
    );

    expect(
      screen.getByText(
        '常用于围绝经综合评估、科普自测和健康管理前置分流；在国内更适合定位为围绝经综合评估流程；国际上更适合表述为参考 KMI 与周期分期逻辑的评估流程。',
      ),
    ).toBeInTheDocument();
  });

  it('renders merged usage intros on each standalone assessment home page', () => {
    const cases = [
      {
        path: '/scene1-phq9-assessment',
        text:
          '常用于心理初筛、门诊前问卷、复测追踪和数字健康筛查；在国内更适合定位为抑郁情绪筛查；国际上通常作为通用抑郁筛查量表使用。',
      },
      {
        path: '/scene1-gad7-assessment',
        text:
          '常用于焦虑初筛、门诊候诊问卷、复测追踪和数字心理筛查；在国内更适合定位为焦虑情绪筛查；国际上通常作为通用焦虑筛查量表使用。',
      },
      {
        path: '/scene1-mrs-assessment',
        text:
          '常用于围绝经症状负担评估、门诊沟通和疗效前后对比；在国内更适合定位为围绝经症状量表；国际上通常作为标准化围绝经症状量表使用。',
      },
      {
        path: '/scene1-psqi-assessment',
        text:
          '常用于睡眠质量筛查、失眠相关随访、科研量表和综合健康问卷；在国内更适合定位为睡眠质量评估；国际上通常作为通用睡眠质量量表使用。',
      },
      {
        path: '/scene1-iciq-assessment',
        text:
          '常用于泌尿或盆底门诊初筛、症状严重度记录和治疗前后评估；在国内更适合定位为尿失禁症状自评短表；国际上通常作为通用尿失禁简表使用。',
      },
      {
        path: '/scene1-bone-assessment',
        text:
          '常用于骨密度检查前分流、骨健康自测和骨折风险意识教育；在国内更适合定位为骨健康风险自测或骨钙测评；国际上更适合表述为基于 OSTA + IOF 风险框架的筛查。',
      },
      {
        path: '/scene1-exercise-assessment',
        text:
          '常用于运动前安全筛查、家庭运动起步和运动风险提醒；在国内更适合定位为运动前风险自测或运动准备度评估；国际上更适合表述为基于 CSEP 预筛查框架的准备度评估。',
      },
      {
        path: '/scene1-emq-r13-assessment',
        text:
          '常用于主观记忆困扰筛查、围绝经脑雾研究、门诊随访问卷和健康管理复测；在国内更适合定位为记忆或注意困扰自测、脑雾感受评估；国际上通常用于日常记忆失败或主观认知困扰评估。',
      },
    ];

    for (const testCase of cases) {
      renderAssessmentRoute(testCase.path);
      expect(screen.getByText(testCase.text)).toBeInTheDocument();
    }
  });
});
