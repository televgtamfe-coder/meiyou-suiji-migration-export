import { ExerciseAssessmentResultSummary } from './exerciseAssessmentScoring';

type ExerciseAssessmentResultProps = {
  summary: ExerciseAssessmentResultSummary;
};

export function ExerciseAssessmentResult({ summary }: ExerciseAssessmentResultProps) {
  return (
    <div className="scene1-exercise-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-exercise-assessment-result-card"
        data-testid="scene1-exercise-assessment-result-main-card"
      >
        <div className="scene1-exercise-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.tone}`}>
              {summary.resultSummary}
            </span>
            <h2>{summary.title}</h2>
            <strong className="scene1-exercise-assessment-result-insight">{summary.summaryText}</strong>
          </div>
          <div className="scene1-exercise-assessment-result-copy">
            <p>{summary.detail}</p>
            <p className="scene1-exercise-assessment-result-action">{summary.nextStepLabel}</p>
          </div>
        </div>

        <div className="scene1-exercise-assessment-result-metrics">
          <div className="scene1-exercise-assessment-result-metric">
            <span>阳性题目</span>
            <strong>{summary.positiveCount}</strong>
            <em>{summary.positiveCount === 0 ? '全部为否' : '需要关注'}</em>
          </div>
          <div className="scene1-exercise-assessment-result-metric">
            <span>关键提示</span>
            <strong>{summary.criticalAlerts.length}</strong>
            <em>{summary.criticalAlerts.length > 0 ? '高风险信号' : '未命中'}</em>
          </div>
        </div>

        {summary.hitQuestionLabels.length > 0 ? (
          <div className="scene1-exercise-assessment-result-section">
            <h3>命中题目</h3>
            <ul className="scene1-exercise-assessment-result-list">
              {summary.hitQuestionLabels.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="scene1-exercise-assessment-result-section">
          <h3>结果解释</h3>
          <div className="scene1-exercise-assessment-result-copy">
            <p>{summary.resultExplanation}</p>
          </div>
        </div>

        <div className="scene1-exercise-assessment-result-section">
          <h3>下一步建议</h3>
          <div className="scene1-exercise-assessment-result-copy">
            <p>{summary.nextStepAdvice}</p>
          </div>
        </div>

        <div className="scene1-exercise-assessment-result-section">
          <h3>免责声明</h3>
          <div className="scene1-exercise-assessment-result-copy">
            <p>{summary.disclaimer}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
