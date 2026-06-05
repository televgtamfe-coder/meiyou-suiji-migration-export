export type KegelReviewSimulatorState =
  | 'intro'
  | 'highlight'
  | 'direction'
  | 'wrong-action'
  | 'ready'
  | 'contract'
  | 'relax'
  | 'done'
  | 'risk'
  | 'cta';

export type KegelReviewDoctorTone = 'normal' | 'serious';

export type KegelReviewScene = {
  id: string;
  startMs: number;
  endMs: number;
  title: string;
  subtitle: string;
  voiceover: string;
  simulatorState: KegelReviewSimulatorState;
  doctorTone: KegelReviewDoctorTone;
  emphasis: string;
  showRiskCard?: boolean;
  showCta?: boolean;
};

export const kegelReviewTotalMs = 30_000;

export const kegelReviewScenes: KegelReviewScene[] = [
  {
    id: 's1_intro',
    startMs: 0,
    endMs: 2_000,
    title: '标题建立',
    subtitle: '凯格尔训练怎么做',
    voiceover: '产后恢复里，凯格尔训练是很多妈妈会接触到的基础训练。',
    simulatorState: 'intro',
    doctorTone: 'normal',
    emphasis: '先理解，再开始训练',
  },
  {
    id: 's2_muscle',
    startMs: 2_000,
    endMs: 5_000,
    title: '训练部位',
    subtitle: '练的是盆底肌',
    voiceover: '你要练的，不是肚子，也不是大腿，而是盆底肌。',
    simulatorState: 'highlight',
    doctorTone: 'normal',
    emphasis: '练的是盆底肌',
  },
  {
    id: 's3_direction',
    startMs: 5_000,
    endMs: 8_000,
    title: '发力方向',
    subtitle: '向内收，向上提',
    voiceover: '你可以把它理解成，轻轻忍住尿意，再把力量向内、向上提。',
    simulatorState: 'direction',
    doctorTone: 'normal',
    emphasis: '向内收，向上提',
  },
  {
    id: 's4_wrong_action',
    startMs: 8_000,
    endMs: 11_000,
    title: '错误动作',
    subtitle: '不要夹腿，不要憋全身',
    voiceover: '重点不是夹腿、耸臀或屏住全身，而是温和发力。',
    simulatorState: 'wrong-action',
    doctorTone: 'normal',
    emphasis: '温和发力，不要误用腹腿臀',
  },
  {
    id: 's5_ready',
    startMs: 11_000,
    endMs: 13_000,
    title: '训练准备',
    subtitle: '准备开始',
    voiceover: '下面我们做一组最基础的练习。',
    simulatorState: 'ready',
    doctorTone: 'normal',
    emphasis: '准备 3 秒进入节拍',
  },
  {
    id: 's6_contract',
    startMs: 13_000,
    endMs: 16_000,
    title: '收紧',
    subtitle: '收紧，3秒',
    voiceover: '先轻轻收紧，保持三秒。',
    simulatorState: 'contract',
    doctorTone: 'normal',
    emphasis: '轻轻收紧，保持三秒',
  },
  {
    id: 's7_release',
    startMs: 16_000,
    endMs: 20_000,
    title: '放松',
    subtitle: '放松，4秒',
    voiceover: '然后慢慢放松，不要一下子泄力。',
    simulatorState: 'relax',
    doctorTone: 'normal',
    emphasis: '慢慢放松，不要一下子泄力',
  },
  {
    id: 's8_done',
    startMs: 20_000,
    endMs: 23_000,
    title: '完成反馈',
    subtitle: '先做对，再做多',
    voiceover: '这就算完成一次。先做对，比做多更重要。',
    simulatorState: 'done',
    doctorTone: 'normal',
    emphasis: '先做对，再做多',
  },
  {
    id: 's9_risk',
    startMs: 23_000,
    endMs: 27_000,
    title: '风险提示',
    subtitle: '明显不适时先暂停训练',
    voiceover: '如果你有明显疼痛、坠胀，或者异常出血，先暂停自练。',
    simulatorState: 'risk',
    doctorTone: 'serious',
    emphasis: '明显不适时先暂停训练',
    showRiskCard: true,
  },
  {
    id: 's10_cta',
    startMs: 27_000,
    endMs: 30_000,
    title: '产品收口',
    subtitle: '先评估，再开始训练',
    voiceover: '在美柚里，你会先做评估，再进入适合自己的训练节奏。',
    simulatorState: 'cta',
    doctorTone: 'normal',
    emphasis: '先评估，再开始训练',
    showCta: true,
  },
];

export function clampKegelReviewElapsedMs(elapsedMs: number) {
  if (elapsedMs < 0) return 0;
  if (elapsedMs > kegelReviewTotalMs) return kegelReviewTotalMs;
  return elapsedMs;
}

export function getKegelReviewSceneAt(elapsedMs: number) {
  const safeElapsedMs = clampKegelReviewElapsedMs(elapsedMs);

  return (
    kegelReviewScenes.find((scene) => safeElapsedMs >= scene.startMs && safeElapsedMs < scene.endMs) ??
    kegelReviewScenes[kegelReviewScenes.length - 1]
  );
}

export function getKegelReviewProgress(elapsedMs: number) {
  return Math.round((clampKegelReviewElapsedMs(elapsedMs) / kegelReviewTotalMs) * 100);
}

export function getKegelReviewSceneIndex(sceneId: string) {
  const index = kegelReviewScenes.findIndex((scene) => scene.id === sceneId);
  return index >= 0 ? index + 1 : 1;
}

export function getKegelTempoValue(scene: KegelReviewScene, elapsedMs: number) {
  const safeElapsedMs = clampKegelReviewElapsedMs(elapsedMs);
  const remainingMs = Math.max(0, scene.endMs - safeElapsedMs);

  if (scene.simulatorState === 'ready') {
    return Math.max(1, Math.ceil(remainingMs / 1_000));
  }

  if (scene.simulatorState === 'contract') {
    return Math.max(1, Math.ceil(remainingMs / 1_000));
  }

  if (scene.simulatorState === 'relax') {
    return Math.max(1, Math.ceil(remainingMs / 1_000));
  }

  return null;
}

export function getKegelStateLabel(scene: KegelReviewScene) {
  switch (scene.simulatorState) {
    case 'intro':
      return '建立主题';
    case 'highlight':
      return '识别训练部位';
    case 'direction':
      return '理解发力方向';
    case 'wrong-action':
      return '排除错误动作';
    case 'ready':
      return '准备开始';
    case 'contract':
      return '收紧阶段';
    case 'relax':
      return '放松阶段';
    case 'done':
      return '完成一次基础节拍';
    case 'risk':
      return '风险提示';
    case 'cta':
      return '进入产品链路';
    default:
      return scene.title;
  }
}
