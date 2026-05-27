import type { TimelineEntry } from '../types/record';

export function buildTextEntry(text: string): TimelineEntry {
  return {
    id: `entry-${Date.now()}`,
    type: 'entry',
    body: text,
    time: '09:41',
    tags: [{ label: '经期', auto: true }],
    isNew: true
  };
}
