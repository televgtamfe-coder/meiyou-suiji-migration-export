import { describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';
import { AssessmentStepRenderer } from '../../src/scenes/scene1/components/AssessmentStepRenderer';
import { PerimenopauseAssessmentShell } from '../../src/scenes/scene1/components/PerimenopauseAssessmentShell';
import { createAssessmentStateWithoutEntry } from '../../src/scenes/scene1/assessmentState';

function createCompletedAssessmentState() {
  const baseState = createAssessmentStateWithoutEntry();

  return {
    ...baseState,
    assessmentOpen: true,
    completed: true,
    currentStep: 5 as const,
    answers: {
      ...baseState.answers,
      age: '46',
      heightCm: '160',
      weightKg: '55',
      periodPresence: 'yes',
      cycleChange: 'shorter',
      volumeChange: 'same',
      lastPeriodDate: '2026-05-01',
      ovarianFailure: 'no',
      surgeryHistory: 'none',
      hormonalContraception: 'no',
      hormoneReplacementTherapy: 'no',
      kmiHotFlashes: '1',
      kmiInsomnia: '1',
      kmiNervousness: '1',
    },
  };
}

describe('scene1 ui', () => {
  it('renders the calendar-first scene1 chrome', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7acb\u5373\u8bc4\u4f30' }));

    expect(screen.getByTestId('scene1-calendar-month-button')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-weekdays')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-calendar-legend')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-list')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-period-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-period-icon-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-love-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-symptom-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-mood-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-discharge-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-temp-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-weight-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-diary-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-record-habit-icon')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-perimenopause-mode-entry-button')).toBeInTheDocument();
  });

  it('renders a text-only analysis entry in the record top bar', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7a0d\u540e\u518d\u8bf4' }));

    const analysisEntry = screen.getByRole('button', { name: '\u5206\u6790' });

    expect(analysisEntry).toHaveTextContent(/^\u5206\u6790$/);
  });

  it('renders the exit button on the perimenopause route', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-perimenopause-mode-exit-button')).toBeInTheDocument();
  });

  it('renders the local assessment stage comparison h5 with the merged stage summary card', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-stage-compare']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-assessment-stage-compare-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-summary-card')).toBeInTheDocument();
    expect(screen.getAllByText('初潮').length).toBeGreaterThan(0);
    expect(screen.getAllByText('绝经过渡期早期').length).toBeGreaterThan(0);
    expect(screen.queryByText('阶段洞察')).not.toBeInTheDocument();
  });

  it('renders the compare page like a complete clock without center stage copy', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-stage-compare']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.queryByText('当前阶段')).not.toBeInTheDocument();
    expect(screen.queryByText('当前阶段分析')).not.toBeInTheDocument();
    expect(screen.getAllByText('12').length).toBeGreaterThan(0);
    expect(screen.getAllByText('3').length).toBeGreaterThan(0);
    expect(screen.getAllByText('6').length).toBeGreaterThan(0);
    expect(screen.getAllByText('9').length).toBeGreaterThan(0);
  });

  it('starts the compare page with the clock block and exposes animated clock elements', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-stage-compare']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.queryByText('生命阶段时钟')).not.toBeInTheDocument();
    expect(
      screen.queryByText('从初潮起始，沿着 360° 圆环查看自己当前所处的生命阶段位置。'),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-clock-pointer')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-clock-active-segment')).toBeInTheDocument();
  });

  it('renders the stage clock pointer line without an svg filter that hides it in the browser', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-stage-compare']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const pointer = screen.getByTestId('scene1-assessment-stage-clock-pointer');
    const pointerLine = pointer.querySelector('line');

    expect(pointerLine).not.toBeNull();
    expect(pointerLine).not.toHaveAttribute('filter');
  });

  it('replaces the old result stage card with the stage clock block on the completed assessment page', () => {
    render(
      <AssessmentStepRenderer
        state={createCompletedAssessmentState()}
        onAnswer={() => {}}
      />,
    );

    expect(screen.queryByText('阶段判断')).not.toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-summary-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-clock-visual')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-clock-pointer')).toBeInTheDocument();
    expect(screen.queryByText('阶段洞察')).not.toBeInTheDocument();
  });

  it('renders the assessment result preview route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const assessmentShell = screen.getByTestId('scene1-assessment-shell');
    const footer = screen.getByTestId('scene1-assessment-footer');

    expect(assessmentShell).toHaveClass('scene1-assessment-shell', 'scene1-assessment-shell-compact');
    expect(footer).toHaveClass('scene1-assessment-footer', 'scene1-assessment-footer-complete');

    expect(screen.getByTestId('scene1-assessment-result-route-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-summary-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-assessment-stage-clock-visual')).toBeInTheDocument();
    expect(screen.queryByText('阶段洞察')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '上一步' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '返回' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '进入围绝经期模式' })).toBeInTheDocument();
  });

  it('resets the assessment scroll container to the top when the current step changes', () => {
    const baseState = {
      ...createAssessmentStateWithoutEntry(),
      assessmentOpen: true,
      currentStep: 1 as const,
    };

    const noop = () => {};
    const { container, rerender } = render(
      <PerimenopauseAssessmentShell
        state={baseState}
        onAnswer={noop}
        onExitToScene1={noop}
        onReturnToScene1={noop}
        onEnterPerimenopauseMode={noop}
        onNext={noop}
        onPrevious={noop}
      />,
    );

    const body = container.querySelector('.scene1-assessment-body') as HTMLDivElement | null;

    expect(body).not.toBeNull();

    if (!body) {
      return;
    }

    body.scrollTop = 240;

    rerender(
      <PerimenopauseAssessmentShell
        state={{
          ...baseState,
          currentStep: 2 as const,
        }}
        onAnswer={noop}
        onExitToScene1={noop}
        onReturnToScene1={noop}
        onEnterPerimenopauseMode={noop}
        onNext={noop}
        onPrevious={noop}
      />,
    );

    const rerenderedBody = container.querySelector('.scene1-assessment-body') as HTMLDivElement | null;

    expect(rerenderedBody).not.toBeNull();
    expect(rerenderedBody?.scrollTop).toBe(0);
  });

  it('renders the compact intro layout and keeps the later helper modules in footnote mode', () => {
    const baseState = {
      ...createAssessmentStateWithoutEntry(),
      assessmentOpen: true,
    };
    const noop = () => {};
    const { container, rerender } = render(
      <AssessmentStepRenderer
        state={{
          ...baseState,
          currentStep: 1 as const,
        }}
        onAnswer={noop}
      />,
    );

    expect(screen.queryByText('个人健康洞察')).not.toBeInTheDocument();
    expect(container.querySelector('.scene1-assessment-kicker')).toBeNull();
    expect(container.querySelector('.scene1-assessment-intro-feature-grid')).toBeNull();
    expect(container.querySelector('.scene1-assessment-intro-visual')).toBeNull();
    expect(screen.queryByText('快速便捷')).not.toBeInTheDocument();
    expect(screen.queryByText('可继续完成')).not.toBeInTheDocument();
    expect(
      screen.queryByText('“在变化中找到平衡，重新理解身体节律，也更从容地应对每一次波动。”'),
    ).not.toBeInTheDocument();

    const stepHead = container.querySelector('.scene1-assessment-step-head.scene1-assessment-step-head-compact');
    const introPanel = screen.getByTestId('scene1-assessment-intro-panel');
    const profileCardBlock = document.querySelector('.scene1-assessment-profile-card');

    expect(stepHead).not.toBeNull();
    expect(profileCardBlock).not.toBeNull();
    expect(stepHead?.compareDocumentPosition(profileCardBlock as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(within(stepHead as HTMLElement).getByText('个人生理特征')).toBeInTheDocument();
    expect(within(stepHead as HTMLElement).getByText('这部分信息用于帮助判断年龄阶段与体征变化之间的关系。')).toBeInTheDocument();
    expect(within(introPanel).getByText('预计耗时 3-5 分钟，覆盖基础信息、周期变化、症状表现与 KMI 评估。')).toBeInTheDocument();
    expect(
      within(introPanel).getByText('结果用于健康管理参考，不能替代医生诊断，如存在异常出血或持续不适，请及时就医。'),
    ).toBeInTheDocument();
    expect(within(introPanel).queryByText('评估须知')).not.toBeInTheDocument();
    expect(within(introPanel).queryByText('健康参考')).not.toBeInTheDocument();
    expect(within(introPanel).queryByText('免责声明')).not.toBeInTheDocument();

    const introLockline = screen.getByTestId('scene1-assessment-intro-lockline');

    expect(introLockline).toHaveClass('scene1-assessment-footnote');
    expect(introLockline.querySelector('strong')).toHaveClass('scene1-assessment-footnote-title');
    expect(introLockline.querySelector('span')).toHaveClass('scene1-assessment-footnote-body');
    expect(within(introLockline).getByText('你的数据受到加密保护')).toBeInTheDocument();
    expect(
      within(introLockline).getByText('回答内容仅用于本次评估流程，不会对外展示或传播'),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '年龄' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '身高' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '体重' })).toBeInTheDocument();

    const step1Banner = screen.getByTestId('scene1-assessment-inline-banner');

    expect(profileCardBlock?.compareDocumentPosition(introLockline) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(step1Banner.compareDocumentPosition(introLockline) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(step1Banner).toHaveClass('scene1-assessment-footnote');
    expect(step1Banner.querySelector('strong')).toHaveClass('scene1-assessment-footnote-title');
    expect(step1Banner.querySelector('p')).toHaveClass('scene1-assessment-footnote-body');

    rerender(
      <AssessmentStepRenderer
        state={{
          ...baseState,
          currentStep: 3 as const,
        }}
        onAnswer={noop}
      />,
    );

    const step3Banner = screen.getByTestId('scene1-assessment-inline-banner');

    expect(step3Banner).toHaveClass('scene1-assessment-footnote');
    expect(step3Banner.querySelector('strong')).toHaveClass('scene1-assessment-footnote-title');
    expect(step3Banner.querySelector('p')).toHaveClass('scene1-assessment-footnote-body');

    rerender(
      <AssessmentStepRenderer
        state={{
          ...baseState,
          currentStep: 4 as const,
        }}
        onAnswer={noop}
      />,
    );

    const supportPanel = screen.getByTestId('scene1-assessment-support-panel');

    expect(supportPanel).toHaveClass('scene1-assessment-footnote');
    expect(supportPanel.querySelector('.scene1-assessment-support-kicker')).toBeNull();
    expect(supportPanel.querySelector('.scene1-assessment-support-title')).toHaveClass(
      'scene1-assessment-footnote-title',
    );
    expect(supportPanel.querySelector('.scene1-assessment-support-body')).toHaveClass(
      'scene1-assessment-footnote-body',
    );

    rerender(
      <AssessmentStepRenderer
        state={{
          ...baseState,
          currentStep: 5 as const,
        }}
        onAnswer={noop}
      />,
    );

    const sideCard = screen.getByTestId('scene1-assessment-side-card');

    expect(sideCard).toHaveClass('scene1-assessment-footnote');
    expect(sideCard.querySelector('.scene1-assessment-side-badge')).toBeNull();
    expect(sideCard.querySelector('h3')).toHaveClass('scene1-assessment-footnote-title');
    expect(sideCard.querySelector('p')).toHaveClass('scene1-assessment-footnote-body');
  });

  it('removes the extra intro helper blocks from the cycle change step', () => {
    const { container } = render(
      <AssessmentStepRenderer
        state={{
          ...createAssessmentStateWithoutEntry(),
          assessmentOpen: true,
          currentStep: 2 as const,
        }}
        onAnswer={() => {}}
      />,
    );

    expect(screen.getByRole('heading', { name: '最近的月经周期有什么变化？' })).toBeInTheDocument();
    expect(screen.getByText('请选择最符合你最近状态的选项。')).toBeInTheDocument();
    expect(screen.getByText('1. 您目前是否仍有月经？')).toBeInTheDocument();
    expect(screen.queryByText('（记录数据读取，无记录数据填写）')).not.toBeInTheDocument();
    expect(screen.queryByText('月经周期识别')).not.toBeInTheDocument();
    expect(screen.queryByText('再了解一下你的月经变化')).not.toBeInTheDocument();
    expect(
      screen.queryByText('围绝经期的识别通常需要结合年龄、月经变化和症状综合判断。'),
    ).not.toBeInTheDocument();
    expect(container.querySelector('.scene1-assessment-stack-cycle')).not.toBeNull();
    expect(container.querySelector('.scene1-assessment-step-head-compact')).not.toBeNull();
  });

  it.skip('renders the first KMI step with the same flat question-card layout as the earlier assessment steps', () => {
    const { container } = render(
      <AssessmentStepRenderer
        state={{
          ...createAssessmentStateWithoutEntry(),
          assessmentOpen: true,
          currentStep: 4 as const,
        }}
        onAnswer={() => {}}
      />,
    );

    expect(container.querySelector('.scene1-assessment-group')).toBeNull();
    expect(container.querySelector('.scene1-assessment-group-header')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'KMI 题组 1' })).not.toBeInTheDocument();
    expect(screen.getByText('请根据最近1个月的实际感受进行选择')).toBeInTheDocument();
    expect(screen.queryByText('请选择最符合你最近状态的程度。')).not.toBeInTheDocument();
    expect(screen.queryByText('KMI 问卷第一部分')).not.toBeInTheDocument();
    expect(screen.queryByText('请根据最近1个月的实际感受进行选择')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.scene1-assessment-block')).toHaveLength(6);
    expect(screen.getByTestId('scene1-assessment-support-panel')).toBeInTheDocument();
  });

  it('shows only the updated top helper copy on KMI step 4', () => {
    const { container } = render(
      <AssessmentStepRenderer
        state={{
          ...createAssessmentStateWithoutEntry(),
          assessmentOpen: true,
          currentStep: 4 as const,
        }}
        onAnswer={() => {}}
      />,
    );

    expect(container.querySelector('.scene1-assessment-group')).toBeNull();
    expect(container.querySelector('.scene1-assessment-group-header')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'KMI 题组 1' })).not.toBeInTheDocument();
    expect(screen.getByText('请根据最近1个月的实际感受进行选择')).toBeInTheDocument();
    expect(screen.queryByText('请选择最符合你最近状态的程度。')).not.toBeInTheDocument();
    expect(screen.queryByText('KMI 问卷第一部分')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.scene1-assessment-block')).toHaveLength(6);
  });

  it('renders the second KMI step without grouped section titles', () => {
    const { container } = render(
      <AssessmentStepRenderer
        state={{
          ...createAssessmentStateWithoutEntry(),
          assessmentOpen: true,
          currentStep: 5 as const,
        }}
        onAnswer={() => {}}
      />,
    );

    expect(container.querySelector('.scene1-assessment-group')).toBeNull();
    expect(container.querySelector('.scene1-assessment-group-header')).toBeNull();
    expect(screen.queryByRole('heading', { name: 'KMI 题组 2' })).not.toBeInTheDocument();
    expect(screen.getByText('完成最后一组后，我们会展示本次评估完成结果。')).toBeInTheDocument();
    expect(screen.queryByText('身体症状')).not.toBeInTheDocument();
    expect(screen.queryByText('神经与感官')).not.toBeInTheDocument();
    expect(screen.queryByText('生活质量')).not.toBeInTheDocument();
    expect(container.querySelectorAll('.scene1-assessment-block')).toHaveLength(7);
    expect(screen.getByTestId('scene1-assessment-side-card')).toBeInTheDocument();
  });

  it('appends stage introduction and encouragement copy under the clock summary', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const summaryCard = screen.getByTestId('scene1-assessment-stage-summary-card');
    const summaryHeading = within(summaryCard).getByTestId('scene1-assessment-stage-summary-heading');

    expect(
      within(summaryCard).getByTestId('scene1-assessment-stage-summary-stage-intro'),
    ).toBeInTheDocument();
    expect(within(summaryCard).queryByText('当前区间介绍')).not.toBeInTheDocument();
    expect(within(summaryCard).queryByText('给你的鼓励')).not.toBeInTheDocument();
    expect(
      within(summaryCard).getByTestId('scene1-assessment-stage-summary-stage-intro').tagName,
    ).toBe('P');
    expect(within(summaryHeading).getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(
      within(summaryCard).queryByTestId('scene1-assessment-stage-summary-encouragement'),
    ).not.toBeInTheDocument();

    const summaryContent = summaryCard.querySelector('.scene1-assessment-stage-summary-content');

    expect(summaryContent?.querySelectorAll('p')).toHaveLength(2);
  });

  it('renames the result modules and applies the centered module heading style', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByRole('heading', { name: '测评分析' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '指标拆解' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '重点关注' })).toBeInTheDocument();
    expect(container.querySelectorAll('.scene1-assessment-result-module-title')).toHaveLength(2);
  });

  it('places the KMI score block under the health score gauge inside the left overview card', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const overviewLeft = screen.getByTestId('scene1-assessment-result-overview-left');

    expect(within(overviewLeft).getByText('健康分')).toBeInTheDocument();
    expect(within(overviewLeft).getByText('KMI 指数评估')).toBeInTheDocument();
    expect(within(overviewLeft).getByLabelText('8 / 63')).toBeInTheDocument();

    const resultGrid = screen.getByTestId('scene1-assessment-result-grid');

    expect(within(resultGrid).queryByText('KMI 指数评估')).not.toBeInTheDocument();
  });

  it('groups the right-side overview tags and cycle summary into a tighter bottom block', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const overviewMain = screen.getByTestId('scene1-assessment-result-overview-main');
    const overviewMainFoot = within(overviewMain).getByTestId('scene1-assessment-result-overview-main-foot');

    expect(within(overviewMainFoot).getByTestId('scene1-assessment-result-overview-tags')).toBeInTheDocument();
    expect(within(overviewMainFoot).getByTestId('scene1-assessment-result-overview-summary')).toBeInTheDocument();
  });

  it('moves the analysis rationale into the matching focus items', () => {
    const { container } = render(
      <AssessmentStepRenderer
        state={createCompletedAssessmentState()}
        onAnswer={() => {}}
      />,
    );

    expect(screen.queryByRole('heading', { name: '原因分析' })).not.toBeInTheDocument();
    expect(
      within(screen.getByTestId('scene1-assessment-result-focus-item-bone-health')).getByTestId(
        'scene1-assessment-result-focus-analysis',
      ),
    ).toBeInTheDocument();
    expect(
      within(screen.getByTestId('scene1-assessment-result-focus-item-exercise')).getByTestId(
        'scene1-assessment-result-focus-analysis',
      ),
    ).toBeInTheDocument();
    expect(container.querySelector('.scene1-assessment-result-analysis-block')).toBeNull();
  });

  it('removes the duplicate bone-health and exercise extension cards after merging content', () => {
    const { container } = render(
      <AssessmentStepRenderer
        state={createCompletedAssessmentState()}
        onAnswer={() => {}}
      />,
    );

    expect(container.querySelector('.scene1-assessment-result-extension-grid')).toBeNull();
    expect(container.querySelector('.scene1-assessment-result-extension-card')).toBeNull();
  });

  it('adds mental-sleep and genitourinary breakdown metrics derived from KMI subgroup scores', () => {
    render(
      <AssessmentStepRenderer
        state={createCompletedAssessmentState()}
        onAnswer={() => {}}
      />,
    );

    expect(screen.getByTestId('scene1-assessment-result-radar-metric-mental-sleep')).toHaveTextContent(
      '精神与睡眠',
    );
    expect(screen.getByTestId('scene1-assessment-result-radar-metric-mental-sleep')).toHaveTextContent(
      '得分 78',
    );
    expect(
      screen.getByTestId('scene1-assessment-result-radar-metric-genitourinary-reproductive'),
    ).toHaveTextContent('泌尿与生殖');
    expect(
      screen.getByTestId('scene1-assessment-result-radar-metric-genitourinary-reproductive'),
    ).toHaveTextContent('得分 100');
  });

  it('renders the pictorial-bar breakdown shell on the assessment result page', () => {
    render(
      <AssessmentStepRenderer
        state={createCompletedAssessmentState()}
        onAnswer={() => {}}
      />,
    );

    expect(screen.getByTestId('scene1-assessment-result-pictorial-chart')).toBeInTheDocument();
    expect(screen.queryByText('阶段定义')).not.toBeInTheDocument();
    expect(screen.queryByText('满格 20 点 = 100 分')).not.toBeInTheDocument();
    expect(screen.queryByText('预警 <65')).not.toBeInTheDocument();
    expect(screen.queryByText('关注 65-74')).not.toBeInTheDocument();
    expect(screen.queryByText('良好 75-84')).not.toBeInTheDocument();
    expect(screen.queryByText('优秀 ≥85')).not.toBeInTheDocument();
    expect(screen.queryByTestId('scene1-assessment-result-pictorial-meta-column')).not.toBeInTheDocument();
    expect(
      screen.getByTestId('scene1-assessment-result-pictorial-stage-marker-genitourinary-reproductive'),
    ).toHaveTextContent('优秀');
    expect(
      screen.getByTestId('scene1-assessment-result-pictorial-stage-marker-genitourinary-reproductive'),
    ).toHaveTextContent('100');
    expect(screen.getByTestId('scene1-assessment-result-pictorial-marker-column')).toHaveStyle({
      top: '10px',
      bottom: '18px',
    });
    expect(
      screen.getByTestId('scene1-assessment-result-pictorial-stage-badge-genitourinary-reproductive'),
    ).toHaveTextContent('优秀');
    expect(
      screen.getByTestId('scene1-assessment-result-pictorial-stage-badge-genitourinary-reproductive'),
    ).toHaveClass('scene1-assessment-result-pictorial-stage-badge-above-line');
    expect(
      screen.getByTestId('scene1-assessment-result-pictorial-score-genitourinary-reproductive'),
    ).toHaveTextContent('100');
    expect(
      screen.getByTestId('scene1-assessment-result-pictorial-score-genitourinary-reproductive'),
    ).toHaveClass('scene1-assessment-result-pictorial-score-anchor');
  });

  it('removes the old result hero strip and action guide block from the assessment result page', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-assessment-result']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.queryByText('评估已完成')).not.toBeInTheDocument();
    expect(screen.queryByText('结果分析')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '当前结果' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '连续跟踪' })).not.toBeInTheDocument();
    expect(screen.queryByText('接下来的行动指南')).not.toBeInTheDocument();
  });

  it('navigates to the assessment result preview from the scene1 analysis entry', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '分析' }));

    expect(screen.getByTestId('scene1-assessment-result-route-shell')).toBeInTheDocument();
  });

  it('toggles the perimenopause symptom panel from expanded to collapsed and back', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-perimenopause-symptom-panel')).toBeInTheDocument();
    expect(screen.getByText('\u7761\u7720\u95ee\u9898')).toBeInTheDocument();
    expect(screen.getByText('\u8111\u96fe')).toBeInTheDocument();
    expect(screen.getByText('\u80c3\u53e3\u53d8\u5316')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '\u5df2\u5c55\u5f00' }));
    expect(screen.queryByTestId('scene1-perimenopause-symptom-panel')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '\u5c55\u5f00\u75c7\u72b6' }));
    expect(screen.getByTestId('scene1-perimenopause-symptom-panel')).toBeInTheDocument();
  });

  it('shows a green check on a perimenopause symptom after tapping it', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const hotFlashesToggle = screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiHotFlashes');

    expect(within(hotFlashesToggle).queryByTestId('scene1-perimenopause-kmi-check')).not.toBeInTheDocument();

    await user.click(hotFlashesToggle);

    expect(within(hotFlashesToggle).getByTestId('scene1-perimenopause-kmi-check')).toBeInTheDocument();
  });

  it('renders different icon assets for symptoms that share one KMI field', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const hotFlashesToggle = screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiHotFlashes');
    const sweatingToggle = screen.getByTestId('scene1-perimenopause-kmi-toggle-symptom-sweating');
    const hotFlashesIcon = hotFlashesToggle.querySelector('img');
    const sweatingIcon = sweatingToggle.querySelector('img');

    expect(hotFlashesIcon).not.toBeNull();
    expect(sweatingIcon).not.toBeNull();
    expect(hotFlashesIcon?.getAttribute('src')).not.toBe(sweatingIcon?.getAttribute('src'));
  });

  it('renders the symptom action bar at the bottom of the perimenopause panel', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const panel = screen.getByTestId('scene1-perimenopause-symptom-panel');
    const actionBar = within(panel).getByTestId('scene1-perimenopause-symptom-action-bar');

    expect(actionBar).toBeInTheDocument();
    expect(within(actionBar).getByRole('button', { name: '取消' })).toBeInTheDocument();
    expect(within(actionBar).queryByText('症状')).not.toBeInTheDocument();
    expect(within(actionBar).getByRole('button', { name: '确定' })).toBeInTheDocument();
  });

  it('opens a compact tip modal after confirming symptom selection', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '确定' }));

    expect(screen.getByTestId('scene1-perimenopause-tip-modal')).toBeInTheDocument();
    expect(screen.getByText('坚持记录14天 掌握你的身体变化')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '关闭提示' })).toBeInTheDocument();
  });

  it('auto closes the tip modal after 2 seconds', async () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={['/scene1-perimenopause']}>
          <AppRouter />
        </MemoryRouter>,
      );

      act(() => {
        screen.getByRole('button', { name: '\u786e\u5b9a' }).click();
      });

      expect(screen.getByTestId('scene1-perimenopause-tip-modal')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(screen.queryByTestId('scene1-perimenopause-tip-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('scene1-perimenopause-symptom-panel')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('drops the last four selected symptoms into separate slots from the plus button toward the left', () => {
    vi.useFakeTimers();

    try {
      render(
        <MemoryRouter initialEntries={['/scene1-perimenopause']}>
          <AppRouter />
        </MemoryRouter>,
      );

      act(() => {
        screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiHotFlashes').click();
        screen.getByTestId('scene1-perimenopause-kmi-toggle-symptom-sweating').click();
        screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiHeadache').click();
        screen.getByTestId('scene1-perimenopause-kmi-toggle-kmiPalpitations').click();
        screen.getByTestId('scene1-perimenopause-kmi-toggle-symptom-joint-pain').click();
      });

      act(() => {
        screen.getByRole('button', { name: '确定' }).click();
      });

      expect(screen.getByTestId('scene1-perimenopause-tip-modal')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(2000);
      });

      expect(screen.queryByTestId('scene1-perimenopause-tip-modal')).not.toBeInTheDocument();
      expect(screen.queryByTestId('scene1-perimenopause-symptom-panel')).not.toBeInTheDocument();
      expect(screen.getByTestId('scene1-perimenopause-drop-target-0')).toBeInTheDocument();
      expect(screen.getByTestId('scene1-perimenopause-drop-target-1')).toBeInTheDocument();
      expect(screen.getByTestId('scene1-perimenopause-drop-target-2')).toBeInTheDocument();
      expect(screen.getByTestId('scene1-perimenopause-drop-target-3')).toBeInTheDocument();
      expect(screen.getByTestId('scene1-perimenopause-drop-animation')).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(screen.getByTestId('scene1-perimenopause-drop-target-3')).toHaveAttribute(
        'data-drop-id',
        'symptom-sweating',
      );

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(screen.getByTestId('scene1-perimenopause-drop-target-2')).toHaveAttribute(
        'data-drop-id',
        'kmiHeadache',
      );

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(screen.getByTestId('scene1-perimenopause-drop-target-1')).toHaveAttribute(
        'data-drop-id',
        'kmiPalpitations',
      );

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(screen.getByTestId('scene1-perimenopause-drop-target-0')).toHaveAttribute(
        'data-drop-id',
        'symptom-joint-pain',
      );
      expect(screen.queryByTestId('scene1-perimenopause-drop-animation')).not.toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(600);
      });

      expect(screen.queryByTestId('scene1-perimenopause-drop-target-0')).not.toBeInTheDocument();
      expect(screen.queryByTestId('scene1-perimenopause-drop-target-3')).not.toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders five mood preview icons and expands grouped mood options inline', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-mood-preview-super-happy')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-mood-preview-pretty-happy')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-mood-preview-calm')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-mood-preview-unhappy')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-mood-preview-anxious')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '展开心情' }));

    expect(screen.getByTestId('scene1-mood-panel')).toBeInTheDocument();
    expect(screen.getByText('积极心情')).toBeInTheDocument();
    expect(screen.getByText('中性心情')).toBeInTheDocument();
    expect(screen.getByText('消极心情')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '超开心' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '平静' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '焦虑' })).toBeInTheDocument();
  });

  it('selects one mood option at a time in the inline mood panel', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '展开心情' }));

    const calm = screen.getByRole('button', { name: '平静' });
    const anxious = screen.getByRole('button', { name: '焦虑' });

    await user.click(calm);
    expect(calm).toHaveAttribute('aria-pressed', 'true');

    await user.click(anxious);
    expect(anxious).toHaveAttribute('aria-pressed', 'true');
    expect(calm).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders image badges for the habit row', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-habit-badge-apple')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-habit-badge-mug')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-habit-badge-tennis')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-habit-badge-poop')).toBeInTheDocument();
  });

  it('renders image-only mood previews and compact habit badges', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-perimenopause']}>
        <AppRouter />
      </MemoryRouter>,
    );

    const moodPreview = screen.getByTestId('scene1-mood-preview-super-happy');
    const moodPreviewList = screen.getByTestId('scene1-mood-preview-list');
    const moodPreviewImage = moodPreview.querySelector('img');
    const habitBadge = screen.getByTestId('scene1-habit-badge-apple');
    const habitBadgeImage = habitBadge.querySelector('img');

    expect(moodPreviewImage).not.toBeNull();
    expect(habitBadgeImage).not.toBeNull();
    expect(moodPreview).toHaveClass('scene1-mood-preview-image-only');
    expect(moodPreviewList).toHaveClass('scene1-mood-preview-list-compact');
    expect(habitBadge).toHaveClass('record-badge-compact');
  });

  it('renders the parenting page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-parenting']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-parenting-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-profile-panel')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-quick-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-family-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-record-section')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-record-list')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-parenting-mode-switch')).toBeInTheDocument();
  });

  it('renders the prep page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-prep']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-prep-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-chance-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-record-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-tools-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-ad-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-article-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-checkin-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-prep-knowledge-pill')).toBeInTheDocument();
  });

  it('renders the pregnancy page route shell', () => {
    render(
      <MemoryRouter initialEntries={['/scene1-pregnancy']}>
        <AppRouter />
      </MemoryRouter>,
    );

    expect(screen.getByTestId('scene1-pregnancy-shell')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-hero')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-main-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-quick-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-changes-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-services-grid')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-article-card')).toBeInTheDocument();
    expect(screen.getByTestId('scene1-pregnancy-checkin-card')).toBeInTheDocument();
  });

  it('navigates to the parenting page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7a0d\u540e\u518d\u8bf4' }));
    await user.click(screen.getByRole('button', { name: '\u80b2\u513f' }));

    expect(screen.getByTestId('scene1-parenting-shell')).toBeInTheDocument();
  });

  it('navigates to the pregnancy page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '稍后再说' }));
    await user.click(screen.getByRole('button', { name: '怀孕' }));

    expect(screen.getByTestId('scene1-pregnancy-shell')).toBeInTheDocument();
  });

  it('navigates to the prep page from the scene1 mode switch', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole('button', { name: '\u7a0d\u540e\u518d\u8bf4' }));
    await user.click(screen.getByRole('button', { name: '\u5907\u5b55' }));

    expect(screen.getByTestId('scene1-prep-shell')).toBeInTheDocument();
  });
});
