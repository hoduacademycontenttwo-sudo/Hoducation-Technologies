import React from 'react';

interface ProcessIconProps {
  type: 'discovery' | 'requirements' | 'development' | 'demo' | 'launch' | 'support';
  className?: string;
}

export const ProcessIcon: React.FC<ProcessIconProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'discovery':
      // Two people seated facing each other across a table with speech bubbles
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Left person */}
          <circle cx="14" cy="18" r="4.5" />
          <path d="M7 33c0-3.8 3.1-7 7-7h2" />
          {/* Right person */}
          <circle cx="34" cy="18" r="4.5" />
          <path d="M41 33c0-3.8-3.1-7-7-7h-2" />
          {/* Center Table */}
          <path d="M19 28h10" />
          <path d="M24 28v11" />
          <path d="M18 39h12" />
          {/* Speech Bubble */}
          <path d="M20 12h8c2.2 0 4 1.8 4 4v2c0 2.2-1.8 4-4 4h-3l-3 3v-3h-2c-2.2 0-4-1.8-4-4v-2c0-2.2 1.8-4 4-4z" />
          <circle cx="23" cy="17" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="25" cy="17" r="0.75" fill="currentColor" stroke="none" />
          <circle cx="27" cy="17" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'requirements':
      // Document with checklist lines and writing pencil
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Sheet of paper */}
          <rect x="11" y="9" width="22" height="30" rx="3" />
          {/* Checklist horizontal lines */}
          <line x1="16" y1="17" x2="27" y2="17" />
          <line x1="16" y1="23" x2="25" y2="23" />
          <line x1="16" y1="29" x2="22" y2="29" />
          {/* Pencil / stylus on bottom right */}
          <path d="M37 23l-8 8-2 6 6-2 8-8a2.12 2.12 0 0 0 0-3l-1-1a2.12 2.12 0 0 0-3 0z" />
          <path d="M33 27l4 4" />
        </svg>
      );

    case 'development':
      // Monitor with code brackets </>
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Screen outer frame */}
          <rect x="9" y="11" width="30" height="22" rx="3" />
          {/* Code brackets */}
          <path d="M19 18l-4 4 4 4" />
          <path d="M29 18l4 4-4 4" />
          <line x1="26" y1="17" x2="22" y2="27" />
          {/* Stand and base */}
          <line x1="24" y1="33" x2="24" y2="38" />
          <line x1="17" y1="38" x2="31" y2="38" />
        </svg>
      );

    case 'demo':
      // Screen with play button inside
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Monitor frame */}
          <rect x="9" y="11" width="30" height="22" rx="3" />
          {/* Play triangle */}
          <polygon points="21,17 31,22 21,27" fill="currentColor" stroke="none" />
          {/* Stand */}
          <line x1="24" y1="33" x2="24" y2="38" />
          <line x1="17" y1="38" x2="31" y2="38" />
        </svg>
      );

    case 'launch':
      // Slanted rocket ship
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Rocket body */}
          <path d="M34 14c-4-4-11-2-16 3l-6 6a3 3 0 0 0 0 4.24l6.76 6.76a3 3 0 0 0 4.24 0l6-6c5-5 7-12 3-16z" />
          {/* Rocket window */}
          <circle cx="27.5" cy="20.5" r="2.5" />
          {/* Left fin */}
          <path d="M12 27l-3 4 5 1" />
          {/* Right fin */}
          <path d="M21 36l4 5 1-5" />
          {/* Exhaust flame */}
          <path d="M14 34l-5 5c0 0 2-5 0-7" strokeWidth="2" />
        </svg>
      );

    case 'support':
      // 3-column bar chart with ascending curve & arrow
      return (
        <svg
          className={className}
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Ascending bars */}
          <rect x="13" y="28" width="6" height="11" rx="1" fill="currentColor" stroke="none" />
          <rect x="22" y="22" width="6" height="17" rx="1" fill="currentColor" stroke="none" />
          <rect x="31" y="16" width="6" height="23" rx="1" fill="currentColor" stroke="none" />
          {/* Growth curve arrow */}
          <path d="M13 22c5-3 12-6 22-8" />
          <path d="M28 14h7v7" />
        </svg>
      );

    default:
      return null;
  }
};
