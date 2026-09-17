import React from 'react';
import { ProcessStepItem } from './processData';

interface ProcessTimelineProps {
  steps: ProcessStepItem[];
  activeStepId: number;
  progressRatio: number; // 0 to 1
  hoveredStepId: number | null;
  onNodeClick: (stepId: number) => void;
}

export const ProcessTimeline: React.FC<ProcessTimelineProps> = ({
  steps,
  activeStepId,
  progressRatio,
  hoveredStepId,
  onNodeClick,
}) => {
  // Height of progress line in percentage:
  const progressPercent = Math.min(100, Math.max(0, progressRatio * 100));

  return (
    <div className="process-central-timeline" aria-hidden="true">
      {/* Background base track (light gray) */}
      <div className="timeline-base-track"></div>

      {/* Animated active maroon progress track */}
      <div
        className="timeline-progress-track"
        style={{ height: `${progressPercent}%` }}
      ></div>

      {/* Nodes for each step */}
      <div className="timeline-nodes-container">
        {steps.map((step) => {
          const isActive = step.id === activeStepId;
          const isPassed = step.id < activeStepId;
          const isHovered = step.id === hoveredStepId;

          let nodeState = 'node-upcoming';
          if (isActive) nodeState = 'node-active';
          else if (isPassed) nodeState = 'node-passed';

          return (
            <div
              key={step.id}
              className={`timeline-node-item ${nodeState} ${isHovered ? 'node-hovered' : ''}`}
              data-step-id={step.id}
              onClick={() => onNodeClick(step.id)}
              title={`Step ${step.number}: ${step.title}`}
            >
              {/* Outer expanding ring */}
              <div className="node-outer-ring"></div>
              {/* Pulse ripple wave on active */}
              {isActive && <div className="node-pulse-wave"></div>}
              {/* Center Dot */}
              <div className="node-center-dot">
                <span className="node-inner-core"></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
