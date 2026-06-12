import { PsqiAssessmentResultSummary } from './psqiAssessmentScoring';

type PsqiAssessmentResultProps = {
  summary: PsqiAssessmentResultSummary;
};

export function PsqiAssessmentResult({ summary }: PsqiAssessmentResultProps) {
  return (
    <div className="scene1-gad7-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-gad7-assessment-result-card"
        data-testid="scene1-psqi-assessment-result-main-card"
      >
        <div className="scene1-gad7-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.tone}`}>
              {summary.levelLabel}
            </span>
            <h2>{summary.title}</h2>
            <strong className="scene1-gad7-assessment-result-insight">
              PSQI 总分 {summary.score} 分
            </strong>
          </div>

          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.summary}</p>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-metrics">
          <div className="scene1-gad7-assessment-result-metric">
            <span>睡眠质量</span>
            <strong>{summary.componentScores.subjectiveQuality}</strong>
            <em>主观感受</em>
          </div>
          <div className="scene1-gad7-assessment-result-metric">
            <span>入睡与效率</span>
            <strong>
              {summary.componentScores.sleepLatency + summary.componentScores.sleepEfficiency}
            </strong>
            <em>入睡潜伏期 + 睡眠效率</em>
          </div>
          <div className="scene1-gad7-assessment-result-metric">
            <span>白天影响</span>
            <strong>{summary.componentScores.daytimeDysfunction}</strong>
            <em>{summary.hasPoorSleep ? '已影响白天功能' : '当前影响较低'}</em>
          </div>
        </div>

        <div
          className="scene1-gad7-assessment-result-section"
          data-testid="scene1-psqi-assessment-result-component-feedback"
        >
          <h3>七维反馈</h3>
          <ul className="scene1-gad7-assessment-result-list">
            {summary.componentFeedback.map((item) => (
              <li
                key={item.id}
                data-testid={`scene1-psqi-assessment-result-component-feedback-${item.id}`}
              >
                {`${item.label} ${item.score}分：${item.feedback}`}
              </li>
            ))}
          </ul>
        </div>

        {summary.dominantModules.length > 0 ? (
          <div className="scene1-gad7-assessment-result-section">
            <h3>重点模块</h3>
            <ul className="scene1-gad7-assessment-result-list">
              {summary.dominantModules.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {summary.personalizedNotes.length > 0 ? (
          <div className="scene1-gad7-assessment-result-section">
            <h3>补充提示</h3>
            <ul className="scene1-gad7-assessment-result-list">
              {summary.personalizedNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="scene1-gad7-assessment-result-section">
          <h3>建议方向</h3>
          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.advice}</p>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-section">
          <h3>说明</h3>
          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
