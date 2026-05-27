import type { TimelineBlock } from '../../../types/scene';

export function Timeline({ blocks }: { blocks: TimelineBlock[] }) {
  return (
    <div className="timeline">
      {blocks.map((block) => {
        if (block.type === 'day') {
          return (
            <div key={block.id} className="tl-section today">
              <div className="tl-day-row">
                <div className="tl-day-num">{block.date}</div>
                <div className="tl-day-meta">{block.weekday}</div>
              </div>
            </div>
          );
        }

        return (
          <div key={block.id} className="entry">
            <div className="entry-meta"><span>{block.time}</span></div>
            <div className="entry-body">{block.body}</div>
            <div className="tags">
              {block.tags.map((tag) => (
                <span key={tag.label} className={tag.auto ? 'tag auto' : 'tag'}>{tag.label}</span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
