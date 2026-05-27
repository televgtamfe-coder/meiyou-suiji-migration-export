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

export const quickRecordItems = [
  { id: 'period', label: '月经来了', icon: '🩸', kind: 'toggle' as const },
  { id: 'love', label: '爱爱', icon: '💗', kind: 'plus' as const },
  { id: 'symptom', label: '症状', icon: '➕', kind: 'plus' as const },
  { id: 'mood', label: '心情', icon: '☺', kind: 'moods' as const, moods: ['😣', '😖', '😐', '😶', '🙂'] },
  { id: 'discharge', label: '白带', icon: '⏳', kind: 'plus' as const },
  { id: 'temp', label: '体温', icon: '🌡', kind: 'plus' as const },
  { id: 'weight', label: '体重', icon: '⚖', kind: 'plus' as const },
  { id: 'diary', label: '日记', icon: '📔', kind: 'text' as const, trailingText: '📷 ›' },
  { id: 'habit', label: '好习惯', icon: '👍', kind: 'badges' as const, badges: ['💧', '🍎', '☕', '🏃'] },
] as const;

export const tabbarItems = [
  { id: 'home', label: '美柚', iconType: 'meiyou' as const },
  { id: 'record', label: '记录', iconType: 'record' as const },
  { id: 'feed', label: '点滴', iconType: 'feed' as const },
  { id: 'cash', label: '返现', iconType: 'cash' as const },
  { id: 'me', label: '我', iconType: 'me' as const, notif: true },
] as const;
