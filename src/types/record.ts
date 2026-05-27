export type EntryTag = {
  label: string;
  emoji?: string;
  auto?: boolean;
};

export type TimelineEntry = {
  id: string;
  type: 'entry';
  body: string;
  time: string;
  tags: EntryTag[];
  isNew?: boolean;
};
