import { scene1Config } from '../scene1Config';

export function HealthCard() {
  return (
    <div className="health">
      <span className="health-light"></span>
      <div className="health-text">
        <div className="health-title">
          {scene1Config.healthTitle}
          <span className="health-phase">{scene1Config.phaseLabel}</span>
        </div>
        <div className="health-desc">{scene1Config.healthDesc}</div>
      </div>
      <div className="health-day">
        <div className="health-day-num">{scene1Config.dayNum}</div>
        <div className="health-day-lbl">今日</div>
      </div>
    </div>
  );
}
