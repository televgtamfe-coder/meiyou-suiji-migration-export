import moodAfraidIcon from '../../assets/scene1-mood/afraid.png';
import moodAngryIcon from '../../assets/scene1-mood/angry.png';
import moodAnxiousIcon from '../../assets/scene1-mood/anxious.png';
import moodCalmIcon from '../../assets/scene1-mood/calm.png';
import moodConfidentIcon from '../../assets/scene1-mood/confident.png';
import moodExcitedIcon from '../../assets/scene1-mood/excited.png';
import moodHeartFlutterIcon from '../../assets/scene1-mood/heart-flutter.png';
import moodHeartbrokenIcon from '../../assets/scene1-mood/heartbroken.png';
import moodIndifferentIcon from '../../assets/scene1-mood/indifferent.png';
import moodInternalizedIcon from '../../assets/scene1-mood/internalized.png';
import moodIrritableIcon from '../../assets/scene1-mood/irritable.png';
import moodOrdinaryIcon from '../../assets/scene1-mood/ordinary.png';
import moodPrettyHappyIcon from '../../assets/scene1-mood/pretty-happy.png';
import moodRelaxedIcon from '../../assets/scene1-mood/relaxed.png';
import moodSatisfiedIcon from '../../assets/scene1-mood/satisfied.png';
import moodStressIcon from '../../assets/scene1-mood/stress.png';
import moodSuperHappyIcon from '../../assets/scene1-mood/super-happy.png';
import moodSurprisedIcon from '../../assets/scene1-mood/surprised.png';
import moodTouchyIcon from '../../assets/scene1-mood/touchy.png';
import moodUnhappyIcon from '../../assets/scene1-mood/unhappy.png';
import habitAppleBadgeIcon from '../../assets/scene1-habit/habit-apple.png';
import habitMugBadgeIcon from '../../assets/scene1-habit/habit-mug.png';
import habitPoopBadgeIcon from '../../assets/scene1-habit/habit-poop.png';
import habitTennisBadgeIcon from '../../assets/scene1-habit/habit-tennis.png';

export type Scene1MoodPreviewId =
  | 'super-happy'
  | 'pretty-happy'
  | 'calm'
  | 'unhappy'
  | 'anxious';

export type Scene1MoodOptionId =
  | 'super-happy'
  | 'excited'
  | 'surprised'
  | 'satisfied'
  | 'heart-flutter'
  | 'pretty-happy'
  | 'confident'
  | 'relaxed'
  | 'calm'
  | 'ordinary'
  | 'unhappy'
  | 'heartbroken'
  | 'irritable'
  | 'touchy'
  | 'angry'
  | 'internalized'
  | 'afraid'
  | 'indifferent'
  | 'anxious'
  | 'stress';

export type Scene1MoodPreviewItem = {
  id: Scene1MoodPreviewId;
  label: string;
  imageSrc: string;
};

export type Scene1MoodOption = {
  id: Scene1MoodOptionId;
  label: string;
  imageSrc: string;
};

export type Scene1MoodGroup = {
  id: 'positive' | 'neutral' | 'negative';
  title: string;
  options: Scene1MoodOption[];
};

export type Scene1HabitBadge = {
  id: 'apple' | 'mug' | 'tennis' | 'poop';
  label: string;
  imageSrc: string;
};

export const scene1Modes = ['经期', '备孕', '怀孕', '育儿'] as const;

export const calendarWeekdays = ['日', '一', '二', '三', '四', '五', '六'] as const;

export const calendarDays = [
  [null, null, null, null, { n: '1', cls: 'green' }, { n: '2', cls: 'green' }, { n: '3', cls: 'today', today: true }],
  [
    { n: '4', cls: 'green', dayId: 4 },
    { n: '5', cls: 'green', dayId: 5 },
    { n: '6', cls: 'green', dayId: 6 },
    { n: '7', cls: 'green', dayId: 7 },
    { n: '8', cls: 'green' },
    { n: '9', cls: 'green', dayId: 9 },
    { n: '10', cls: 'green', dayId: 10 },
  ],
  [
    { n: '11', cls: 'green', dayId: 11 },
    { n: '12', cls: 'green', dayId: 12 },
    { n: '13', cls: 'green', dayId: 13 },
    { n: '14', cls: 'green', dayId: 14 },
    { n: '15', cls: 'green', dayId: 15 },
    { n: '16', cls: 'green', dayId: 16 },
    { n: '17', cls: 'green' },
  ],
  [
    { n: '18', cls: 'green' },
    { n: '19', cls: 'ovulation' },
    { n: '20', cls: 'ovulation' },
    { n: '21', cls: 'ovulation' },
    { n: '22', cls: 'ovulation' },
    { n: '23', cls: 'ovulation' },
    { n: '24', cls: 'ovulation-day' },
  ],
  [
    { n: '25', cls: 'ovulation' },
    { n: '26', cls: 'green' },
    { n: '27', cls: 'green' },
    { n: '28', cls: 'green' },
    { n: '29', cls: 'green' },
    { n: '30', cls: 'green' },
    null,
  ],
] as const;

export const legendItems = [
  { label: '月经期', swatchClass: 'legend-swatch period' },
  { label: '预测经期', swatchClass: 'legend-swatch predicted' },
  { label: '排卵期', swatchClass: 'legend-swatch ovulation' },
  { label: '排卵日', swatchClass: 'legend-swatch ovulation-day' },
] as const;

export const scene1MoodPreviewItems: Scene1MoodPreviewItem[] = [
  { id: 'super-happy', label: '超开心', imageSrc: moodSuperHappyIcon },
  { id: 'pretty-happy', label: '挺开心', imageSrc: moodPrettyHappyIcon },
  { id: 'calm', label: '平静', imageSrc: moodCalmIcon },
  { id: 'unhappy', label: '不开心', imageSrc: moodUnhappyIcon },
  { id: 'anxious', label: '焦虑', imageSrc: moodAnxiousIcon },
];

export const scene1MoodGroups: Scene1MoodGroup[] = [
  {
    id: 'positive',
    title: '积极心情',
    options: [
      { id: 'super-happy', label: '超开心', imageSrc: moodSuperHappyIcon },
      { id: 'excited', label: '兴奋', imageSrc: moodExcitedIcon },
      { id: 'surprised', label: '惊喜', imageSrc: moodSurprisedIcon },
      { id: 'satisfied', label: '满足', imageSrc: moodSatisfiedIcon },
      { id: 'heart-flutter', label: '心动', imageSrc: moodHeartFlutterIcon },
      { id: 'pretty-happy', label: '挺开心', imageSrc: moodPrettyHappyIcon },
      { id: 'confident', label: '自信', imageSrc: moodConfidentIcon },
      { id: 'relaxed', label: '放松', imageSrc: moodRelaxedIcon },
    ],
  },
  {
    id: 'neutral',
    title: '中性心情',
    options: [
      { id: 'calm', label: '平静', imageSrc: moodCalmIcon },
      { id: 'ordinary', label: '一般', imageSrc: moodOrdinaryIcon },
    ],
  },
  {
    id: 'negative',
    title: '消极心情',
    options: [
      { id: 'unhappy', label: '不开心', imageSrc: moodUnhappyIcon },
      { id: 'heartbroken', label: '好伤心', imageSrc: moodHeartbrokenIcon },
      { id: 'irritable', label: '烦躁', imageSrc: moodIrritableIcon },
      { id: 'touchy', label: '易怒', imageSrc: moodTouchyIcon },
      { id: 'angry', label: '生气', imageSrc: moodAngryIcon },
      { id: 'internalized', label: '内耗', imageSrc: moodInternalizedIcon },
      { id: 'afraid', label: '害怕', imageSrc: moodAfraidIcon },
      { id: 'indifferent', label: '冷漠', imageSrc: moodIndifferentIcon },
      { id: 'anxious', label: '焦虑', imageSrc: moodAnxiousIcon },
      { id: 'stress', label: '压力', imageSrc: moodStressIcon },
    ],
  },
];

export const scene1HabitBadges: Scene1HabitBadge[] = [
  { id: 'apple', label: '苹果', imageSrc: habitAppleBadgeIcon },
  { id: 'mug', label: '水杯', imageSrc: habitMugBadgeIcon },
  { id: 'tennis', label: '网球', imageSrc: habitTennisBadgeIcon },
  { id: 'poop', label: '便便', imageSrc: habitPoopBadgeIcon },
];

export const quickRecordItems = [
  { id: 'period', label: '月经来了', icon: '🩸', kind: 'toggle' as const },
  { id: 'love', label: '爱爱', icon: '💖', kind: 'plus' as const },
  { id: 'symptom', label: '症状', icon: '↗', kind: 'plus' as const },
  { id: 'mood', label: '心情', icon: '☺', kind: 'moods' as const, moods: ['😣', '😖', '😐', '😶', '🙂'] },
  { id: 'discharge', label: '白带', icon: '🪷', kind: 'plus' as const },
  { id: 'temp', label: '体温', icon: '🌡', kind: 'plus' as const },
  { id: 'weight', label: '体重', icon: '⚖', kind: 'plus' as const },
  { id: 'diary', label: '日记', icon: '📝', kind: 'text' as const, trailingText: '📲 …' },
  { id: 'habit', label: '好习惯', icon: '🌤', kind: 'badges' as const, badges: scene1HabitBadges },
] as const;

export const tabbarItems = [
  { id: 'home', label: '美柚', iconType: 'meiyou' as const },
  { id: 'record', label: '记录', iconType: 'record' as const },
  { id: 'feed', label: '点滴', iconType: 'feed' as const },
  { id: 'cash', label: '返现', iconType: 'cash' as const },
  { id: 'me', label: '我', iconType: 'me' as const, notif: true },
] as const;
