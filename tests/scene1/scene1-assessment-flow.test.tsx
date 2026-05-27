import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppRouter } from '../../src/app/router';

describe('scene1 assessment flow', () => {
  it('requires answers before advancing and keeps answers when going back', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));

    expect(screen.getByText('个人健康洞察')).toBeInTheDocument();
    expect(screen.getByText('快速便捷')).toBeInTheDocument();
    expect(screen.getByText('健康参考')).toBeInTheDocument();
    expect(screen.getByText('评估须知')).toBeInTheDocument();
    expect(screen.getByText('您的数据受到加密保护')).toBeInTheDocument();

    const firstNextButton = screen.getByRole('button', { name: '下一步' });
    expect(firstNextButton).toBeEnabled();
    await user.click(firstNextButton);

    const secondNextButton = screen.getByRole('button', { name: '下一步' });
    expect(secondNextButton).toBeDisabled();

    await user.type(screen.getByLabelText('出生日期'), '1984-05-01');
    await user.type(screen.getByLabelText('身高 (cm)'), '165');
    await user.type(screen.getByLabelText('体重 (kg)'), '58');

    expect(screen.getByRole('button', { name: '下一步' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('最近的月经周期有什么变化？')).toBeInTheDocument();
    expect(screen.getByText('（记录数据读取，无记录数据填写）')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '下一步' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: '是的，仍有规律或不规律月经' }));
    await user.click(screen.getByRole('button', { name: '周期缩短（比平时少7天以上）' }));
    await user.click(screen.getByRole('button', { name: '明显减少' }));
    await user.click(screen.getByRole('button', { name: '记不清了' }));
    await user.click(screen.getByRole('button', { name: '上一步' }));

    expect(screen.getByDisplayValue('1984-05-01')).toBeInTheDocument();
    expect(screen.getByDisplayValue('165')).toBeInTheDocument();
    expect(screen.getByDisplayValue('58')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '下一步' }));
    expect(screen.getByRole('button', { name: '是的，仍有规律或不规律月经' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: '周期缩短（比平时少7天以上）' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: '明显减少' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: '记不清了' })).toHaveClass('active');
  }, 15000);

  it('removes the assessment title copy from the top header', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));

    const header = document.querySelector('.scene1-assessment-header');

    expect(header).not.toBeNull();
    expect(header?.textContent).toContain('返回');
    expect(header?.textContent).not.toContain('scene1 测评');
    expect(header?.textContent).not.toContain('围绝经期评估');
  });

  it('resets the in-progress flow when closed', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.type(screen.getByLabelText('出生日期'), '1984-05-01');
    await user.click(screen.getByRole('button', { name: '返回' }));

    expect(screen.getByText('开启您的围绝经期健康评估')).toBeInTheDocument();
    expect(screen.queryByDisplayValue('1984-05-01')).not.toBeInTheDocument();
  });

  it('completes the KMI steps and shows the completion state', async () => {
    const user = userEvent.setup();
    const chooseInBlock = async (title: string, option: string) => {
      const titleNode = screen.getByText(title);
      const block = titleNode.closest('.scene1-assessment-block');

      if (!block) {
        throw new Error(`Missing assessment block for ${title}`);
      }

      await user.click(within(block).getByRole('button', { name: option }));
    };

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.type(screen.getByLabelText('出生日期'), '1984-05-01');
    await user.type(screen.getByLabelText('身高 (cm)'), '165');
    await user.type(screen.getByLabelText('体重 (kg)'), '58');
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.click(screen.getByRole('button', { name: '是的，仍有规律或不规律月经' }));
    await user.click(screen.getByRole('button', { name: '周期缩短（比平时少7天以上）' }));
    await user.click(screen.getByRole('button', { name: '明显减少' }));
    await user.click(screen.getByRole('button', { name: '记不清了' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.click(screen.getByRole('button', { name: '是，有相关医疗诊断' }));
    await user.click(screen.getByRole('button', { name: '两者均无' }));
    await user.click(screen.getByRole('button', { name: '是，正在使用中' }));
    await user.click(screen.getByRole('button', { name: '是，正在进行治疗' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('KMI 题组 1')).toBeInTheDocument();
    expect(screen.getByText('<3次/日')).toBeInTheDocument();
    expect(screen.getByText('3-9次/日')).toBeInTheDocument();
    expect(screen.getByText('偶尔出现')).toBeInTheDocument();
    expect(screen.getByText('持续存在且影响生活')).toBeInTheDocument();
    expect(screen.getByText('长期失眠且影响白天功能或者必须服用安眠药')).toBeInTheDocument();

    await chooseInBlock('潮热出汗', '中度');
    await chooseInBlock('感觉异常（麻木、刺痛）', '轻度');
    await chooseInBlock('失眠（入睡困难、多梦、易醒）', '中度');
    await chooseInBlock('易激动（烦躁、易怒）', '轻度');
    await chooseInBlock('抑郁（情绪低落、消极）', '无症状');
    await chooseInBlock('眩晕', '轻度');
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('KMI 题组 2')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '完成评估' })).toBeInTheDocument();

    await chooseInBlock('疲乏（乏力、易疲劳）', '轻度');
    await chooseInBlock('骨关节、肌肉痛', '中度');
    await chooseInBlock('头痛', '轻度');
    await chooseInBlock('心悸（心慌、胸闷）', '无症状');
    await chooseInBlock('皮肤蚁走感', '轻度');
    await chooseInBlock('性生活状况（阴道干燥、痛）', '轻度');
    await chooseInBlock('尿路症状（尿频、尿急）', '无症状');
    await user.click(screen.getByRole('button', { name: '完成评估' }));

    expect(screen.getByText('评估已完成')).toBeInTheDocument();
    expect(screen.getByText('最终结果分析与判断')).toBeInTheDocument();
    expect(screen.getByText('KMI 指数评估')).toBeInTheDocument();
    expect(screen.getAllByText('骨健康与维生素D风险').length).toBeGreaterThan(0);
    expect(screen.getAllByText('运动能力初筛').length).toBeGreaterThan(0);
    expect(screen.getByText('24 / 63')).toBeInTheDocument();
    expect(screen.getAllByText('中度综合征').length).toBeGreaterThan(0);
    expect(window.localStorage.getItem('scene1:kmi-score')).toBe('24');
    expect(screen.getByRole('button', { name: '上一步' })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: '返回' }).length).toBeGreaterThan(1);
    expect(screen.getByRole('button', { name: '进入围绝经期模式' })).toBeInTheDocument();
  });

  it('jumps to the copied perimenopause scene1 page from the completion page', async () => {
    const user = userEvent.setup();
    const chooseInBlock = async (title: string, option: string) => {
      const titleNode = screen.getByText(title);
      const block = titleNode.closest('.scene1-assessment-block');

      if (!block) {
        throw new Error(`Missing assessment block for ${title}`);
      }

      await user.click(within(block).getByRole('button', { name: option }));
    };

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.type(screen.getByLabelText('出生日期'), '1984-05-01');
    await user.type(screen.getByLabelText('身高 (cm)'), '165');
    await user.type(screen.getByLabelText('体重 (kg)'), '58');
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.click(screen.getByRole('button', { name: '是的，仍有规律或不规律月经' }));
    await user.click(screen.getByRole('button', { name: '周期缩短（比平时少7天以上）' }));
    await user.click(screen.getByRole('button', { name: '明显减少' }));
    await user.click(screen.getByRole('button', { name: '记不清了' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.click(screen.getByRole('button', { name: '是，有相关医疗诊断' }));
    await user.click(screen.getByRole('button', { name: '两者均无' }));
    await user.click(screen.getByRole('button', { name: '是，正在使用中' }));
    await user.click(screen.getByRole('button', { name: '是，正在进行治疗' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await chooseInBlock('潮热出汗', '中度');
    await chooseInBlock('感觉异常（麻木、刺痛）', '轻度');
    await chooseInBlock('失眠（入睡困难、多梦、易醒）', '中度');
    await chooseInBlock('易激动（烦躁、易怒）', '轻度');
    await chooseInBlock('抑郁（情绪低落、消极）', '无症状');
    await chooseInBlock('眩晕', '轻度');
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await chooseInBlock('疲乏（乏力、易疲劳）', '轻度');
    await chooseInBlock('骨关节、肌肉痛', '中度');
    await chooseInBlock('头痛', '轻度');
    await chooseInBlock('心悸（心慌、胸闷）', '无症状');
    await chooseInBlock('皮肤蚁走感', '轻度');
    await chooseInBlock('性生活状况（阴道干燥、痛）', '轻度');
    await chooseInBlock('尿路症状（尿频、尿急）', '无症状');
    await user.click(screen.getByRole('button', { name: '完成评估' }));

    await user.click(screen.getByRole('button', { name: '进入围绝经期模式' }));

    expect(screen.queryByText('评估已完成')).not.toBeInTheDocument();
    expect(screen.getByTestId('scene1-perimenopause-route-shell')).toBeInTheDocument();
    expect(screen.queryByRole('dialog', { name: '开启您的围绝经期健康评估' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '围经期' })).not.toBeInTheDocument();
  });

  it('keeps the supporting content blocks for the expanded scene1 assessment pages', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.type(screen.getByLabelText('出生日期'), '1984-05-01');
    await user.type(screen.getByLabelText('身高 (cm)'), '165');
    await user.type(screen.getByLabelText('体重 (kg)'), '58');
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('围绝经期的识别通常需要结合年龄、月经变化和症状综合判断。')).toBeInTheDocument();
    expect(screen.getByText('追踪这些变化有助于识别您目前所处的围绝经期阶段。请根据您过去3-6个月的实际情况进行选择。')).toBeInTheDocument();
    expect(screen.getByText('（记录数据读取，无记录数据填写）')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '是的，仍有规律或不规律月经' }));
    await user.click(screen.getByRole('button', { name: '周期缩短（比平时少7天以上）' }));
    await user.click(screen.getByRole('button', { name: '明显减少' }));
    await user.click(screen.getByRole('button', { name: '记不清了' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('您的情况可能较为特殊，结果页会结合这些信息一起解释。')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '是，有相关医疗诊断' }));
    await user.click(screen.getByRole('button', { name: '两者均无' }));
    await user.click(screen.getByRole('button', { name: '是，正在使用中' }));
    await user.click(screen.getByRole('button', { name: '是，正在进行治疗' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('请根据最近1个月的实际感受进行选择')).toBeInTheDocument();
    expect(screen.getByText('您的身体正在经历变化')).toBeInTheDocument();

    const chooseInBlock = async (title: string, option: string) => {
      const titleNode = screen.getByText(title);
      const block = titleNode.closest('.scene1-assessment-block');

      if (!block) {
        throw new Error(`Missing assessment block for ${title}`);
      }

      await user.click(within(block).getByRole('button', { name: option }));
    };

    await chooseInBlock('潮热出汗', '中度');
    await chooseInBlock('感觉异常（麻木、刺痛）', '轻度');
    await chooseInBlock('失眠（入睡困难、多梦、易醒）', '中度');
    await chooseInBlock('易激动（烦躁、易怒）', '轻度');
    await chooseInBlock('抑郁（情绪低落、消极）', '无症状');
    await chooseInBlock('眩晕', '轻度');
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('身体症状')).toBeInTheDocument();
    expect(screen.getByText('神经与感官')).toBeInTheDocument();
    expect(screen.getByText('生活质量')).toBeInTheDocument();
    expect(screen.getByText('数据高度加密')).toBeInTheDocument();
  }, 15000);

  it('jumps directly from cycle changes to special-case questions because the original design has no standalone symptom impact page', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={['/scene1']}>
        <AppRouter />
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button', { name: '立即评估' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.type(screen.getByLabelText('出生日期'), '1984-05-01');
    await user.type(screen.getByLabelText('身高 (cm)'), '165');
    await user.type(screen.getByLabelText('体重 (kg)'), '58');
    await user.click(screen.getByRole('button', { name: '下一步' }));
    await user.click(screen.getByRole('button', { name: '是的，仍有规律或不规律月经' }));
    await user.click(screen.getByRole('button', { name: '周期缩短（比平时少7天以上）' }));
    await user.click(screen.getByRole('button', { name: '明显减少' }));
    await user.click(screen.getByRole('button', { name: '记不清了' }));
    await user.click(screen.getByRole('button', { name: '下一步' }));

    expect(screen.getByText('以下情况可能会影响结果判断')).toBeInTheDocument();
    expect(screen.queryByText('这些症状最近对你影响大吗？')).not.toBeInTheDocument();
    expect(screen.getByText('步骤 4 / 6')).toBeInTheDocument();
  });
});
