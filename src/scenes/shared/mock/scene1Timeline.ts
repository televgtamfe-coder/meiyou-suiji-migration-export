import type { TimelineBlock } from '../../types/scene';

export const scene1Timeline: TimelineBlock[] = [
  { id: 'day-0521', type: 'day', date: '21', weekday: '周三', isToday: true },
  {
    id: 'entry-1',
    type: 'entry',
    body: '今天有点坠胀，想先记一下。',
    time: '09:41',
    tags: [{ label: '经期' }, { label: '腹痛', auto: true }]
  }
];
