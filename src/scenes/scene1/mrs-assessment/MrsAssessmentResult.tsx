import { MrsAssessmentResultSummary } from './mrsAssessmentScoring';

type MrsAssessmentResultProps = {
  summary: MrsAssessmentResultSummary;
};

export function MrsAssessmentResult({ summary }: MrsAssessmentResultProps) {
  return (
    <div className="scene1-gad7-assessment-result-page scene1-mrs-assessment-result-page">
      <section
        className="scene1-assessment-block scene1-gad7-assessment-result-card scene1-mrs-assessment-result-card"
        data-testid="scene1-mrs-assessment-result-main-card"
      >
        <div className="scene1-gad7-assessment-result-card-head">
          <div>
            <span className={`scene1-assessment-result-badge-mini ${summary.tone}`}>{summary.levelLabel}</span>
            <h2>{summary.title}</h2>
            <strong className="scene1-gad7-assessment-result-insight">MRS 总分 {summary.score} 分</strong>
          </div>

          <div className="scene1-gad7-assessment-result-copy">
            <p>{summary.summary}</p>
          </div>
        </div>

        <div className="scene1-gad7-assessment-result-metrics">
          <div className="scene1-gad7-assessment-result-metric">
            <span>躯体维度</span>
            <strong>{summary.somaticScore}</strong>
            <em>重度阈值 6 分</em>
          </div>
          <div className="scene1-gad7-assessment-result-metric">
            <span>心理维度</span>
            <strong>{summary.psychologicalScore}</strong>
            <em>重度阈值 4 分</em>
          </div>
          <div className="scene1-gad7-assessment-result-metric">
            <span>泌尿生殖维度</span>
            <strong>{summary.urogenitalScore}</strong>
            <em>重度阈值 2 分</em>
          </div>
        </div>

        {summary.severeDimensions.length > 0 ? (
          <div className="scene1-gad7-assessment-result-section">
            <h3>重点维度</h3>
            <ul className="scene1-gad7-assessment-result-list">
              {summary.severeDimensions.map((dimension) => (
                <li key={dimension}>
                  {dimension === 'somatic'
                    ? '躯体维度已达到重度影响阈值。'
                    : dimension === 'psychological'
                      ? '心理维度已达到重度影响阈值。'
                      : '泌尿生殖维度已达到重度影响阈值。'}
                </li>
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
