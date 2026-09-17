import React from 'react';

export const ProcessHeader: React.FC = () => {
  return (
    <div className="process-header-wrap">
      <div className="process-header-eyebrow">
        <span className="eyebrow-dash"></span>
        <span className="eyebrow-text">OUR PROCESS</span>
        <span className="eyebrow-dash"></span>
      </div>
      <h2 className="process-main-title">
        From Idea to <span className="process-impact-accent">Impact</span>
      </h2>
      <p className="process-main-desc">
        A clear and collaborative process to build digital solutions that create real business value.
      </p>

      {/* Decorative top-right corner metadata from reference */}
      <div className="process-corner-meta corner-top-right" aria-hidden="true">
        <span className="corner-meta-line">IDEAS</span>
        <span className="corner-meta-line">SOLUTIONS</span>
        <span className="corner-meta-line highlight">REAL IMPACT</span>
        <div className="corner-meta-dash"></div>
      </div>
    </div>
  );
};
