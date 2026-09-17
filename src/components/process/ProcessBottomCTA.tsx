import React from 'react';

export const ProcessBottomCTA: React.FC = () => {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = 'mailto:hello@hoducation.com?subject=Project Inquiry: Let\'s Build Together';
    }
  };

  return (
    <div className="process-bottom-cta-wrap">
      {/* Left editorial script */}
      <div className="process-bottom-left">
        <div className="script-wrap">
          <span className="script-line-1">Your Vision</span>
          <span className="script-line-2">_ Our Code</span>
        </div>
        <div className="process-corner-meta corner-bottom-left" aria-hidden="true">
          <div className="corner-meta-dash"></div>
          <span className="corner-meta-line">PLAN</span>
          <span className="corner-meta-line">BUILD</span>
          <span className="corner-meta-line">LAUNCH</span>
          <span className="corner-meta-line highlight">GROW</span>
        </div>
      </div>




      {/* Right editorial metadata */}
      <div className="process-bottom-right" aria-hidden="true">
        <div className="process-corner-meta corner-bottom-right">
          <span className="corner-meta-line">YOUR</span>
          <span className="corner-meta-line">VISION</span>
          <span className="corner-meta-line highlight">OUR CODE</span>
          <div className="corner-meta-dash"></div>
        </div>
      </div>
    </div>
  );
};
