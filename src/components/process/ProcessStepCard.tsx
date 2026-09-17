import React, { useRef, useEffect } from 'react';
import { ProcessStepItem } from './processData';
import { ProcessIcon } from './ProcessIcons';

interface ProcessStepCardProps {
  step: ProcessStepItem;
  isActive: boolean;
  isPassed: boolean;
  isHovered: boolean;
  onHover: (id: number | null) => void;
  onClick: (id: number) => void;
}



export const ProcessStepCard: React.FC<ProcessStepCardProps> = React.memo(({
  step,
  isActive,
  isPassed,
  isHovered,
  onHover,
  onClick,
}) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isRevealed, setIsRevealed] = React.useState<boolean>(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const rowStateClass = isActive ? 'is-active' : isPassed ? 'is-passed' : 'is-upcoming';
  const revealClass = isRevealed ? 'is-revealed' : 'is-hidden';
  const hoverClass = isHovered ? 'is-hovered' : '';
  const sideClass = step.side === 'left' ? 'row-side-left' : 'row-side-right';

  const cardElement = (
    <div
      className={`process-card-box ${isActive ? 'card-active' : ''} ${isPassed ? 'card-passed' : ''}`}
      onMouseEnter={() => onHover(step.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(step.id)}
      role="button"
      tabIndex={0}
      aria-label={`Step ${step.number}: ${step.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(step.id);
        }
      }}
    >
      {/* Speech-Bubble Notch pointing toward center node */}
      <div className="card-pointer-notch" aria-hidden="true"></div>

      {/* Step Number with horizontal accent dash */}
      <div className="card-top-number-row">
        <span className="card-step-num">{step.number}</span>
        <span className="card-step-dash"></span>
      </div>

      {/* Card Content: Image layout if media provided, else Icon Grid */}
      {step.imageUrl || step.mediaUrl || step.gifUrl ? (
        <div className="card-video-layout">
          <div className="card-media-wrap">
            <img
              className="card-media-video card-media-img"
              src={(step.imageUrl || step.mediaUrl || step.gifUrl)!}
              alt={step.title}
              loading="lazy"
            />
          </div>
          <div className="card-text-block">
            <h3 className="card-step-title">{step.title}</h3>
            <p className="card-step-desc">{step.description}</p>
          </div>
        </div>
      ) : (
        <div className={`card-content-grid ${step.side === 'right' ? 'layout-icon-right' : 'layout-icon-left'}`}>
          {/* Icon container */}
          <div className="card-icon-badge">
            <div className="icon-badge-glow" aria-hidden="true"></div>
            <ProcessIcon type={step.iconType} className="card-icon-svg" />
          </div>

          {/* Text information */}
          <div className="card-text-block">
            <h3 className="card-step-title">{step.title}</h3>
            <p className="card-step-desc">{step.description}</p>
          </div>
        </div>
      )}

      {/* Subtle bottom active accent line */}
      <div className="card-active-accent-bar" aria-hidden="true"></div>
    </div>
  );

  const metaElement = (
    <div className="process-opposite-meta" aria-hidden="true">
      <div className="meta-text-block">
        {step.phaseTags.map((tag, idx) => (
          <span key={idx} className={`meta-tag ${idx === 0 ? 'meta-tag-primary' : ''}`}>
            {tag}
          </span>
        ))}
        <div className="meta-accent-line"></div>
      </div>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className={`process-step-row ${sideClass} ${rowStateClass} ${revealClass} ${hoverClass}`}
      data-step={step.id}
    >
      {/* Desktop Left Slot */}
      <div className="process-row-col col-left">
        {step.side === 'left' ? cardElement : metaElement}
      </div>

      {/* Center Node Slot */}
      <div
        className="process-row-node-slot"
        onClick={() => onClick(step.id)}
        role="button"
        tabIndex={0}
        aria-label={`Jump to Step ${step.number}`}
      >
        <div className="process-timeline-node">
          <div className="node-outer-ring"></div>
          {isActive && <div className="node-pulse-wave"></div>}
          <div className="node-center-dot">
            <span className="node-inner-core"></span>
          </div>
        </div>
      </div>

      {/* Desktop Right Slot */}
      <div className="process-row-col col-right">
        {step.side === 'right' ? cardElement : metaElement}
      </div>
    </div>
  );
});
