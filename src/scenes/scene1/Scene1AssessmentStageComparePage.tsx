import { AssessmentStageClockSummary } from './components/AssessmentStageClockSummary';
import { StatusBar } from './components/StatusBar';

const sampleResultTitle = '进入围绝经期';

export function Scene1AssessmentStageComparePage() {
  return (
    <div
      className="scene1-assessment-stage-compare-page"
      data-testid="scene1-assessment-stage-compare-route-shell"
    >
      <StatusBar />

      <div className="scene1-assessment-stage-compare-scroll">
        <AssessmentStageClockSummary resultTitle={sampleResultTitle} />
      </div>
    </div>
  );
}
