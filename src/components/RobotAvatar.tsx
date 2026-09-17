import React from 'react';

interface RobotAvatarProps {
  size?: number;
  className?: string;
}

export const RobotAvatar: React.FC<RobotAvatarProps> = ({ size = 32, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        {/* Head Gradient */}
        <linearGradient id="robotHeadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#9e1228" />
          <stop offset="50%" stopColor="#7a0c1e" />
          <stop offset="100%" stopColor="#540713" />
        </linearGradient>

        {/* Ear Gradient */}
        <linearGradient id="robotEarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7a0c1e" />
          <stop offset="100%" stopColor="#3d040c" />
        </linearGradient>

        {/* Antenna Light Glow */}
        <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff4d6d" />
          <stop offset="60%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#be123c" />
        </radialGradient>

        {/* Eye Glow */}
        <radialGradient id="eyePupil" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="70%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
      </defs>

      {/* Antenna Stem */}
      <line x1="32" y1="12" x2="32" y2="18" stroke="#7a0c1e" strokeWidth="2.5" strokeLinecap="round" />

      {/* Antenna Glowing Dot */}
      <circle cx="32" cy="10" r="4.5" fill="url(#antennaGlow)" />
      <circle cx="33" cy="8.5" r="1.5" fill="#ffffff" opacity="0.8" />

      {/* Left Ear */}
      <rect x="7" y="27" width="5" height="14" rx="2.5" fill="url(#robotEarGrad)" />

      {/* Right Ear */}
      <rect x="52" y="27" width="5" height="14" rx="2.5" fill="url(#robotEarGrad)" />

      {/* Head Base */}
      <rect
        x="10"
        y="18"
        width="44"
        height="36"
        rx="14"
        fill="url(#robotHeadGrad)"
        stroke="#ff4d6d"
        strokeWidth="0.8"
        strokeOpacity="0.3"
      />

      {/* Head Highlight */}
      <path
        d="M16 22C16 20 18 19 21 19H43C46 19 48 20 48 22"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.25"
      />

      {/* Left Eye */}
      <circle cx="23" cy="34" r="6" fill="#f8fafc" />
      <circle cx="23" cy="34" r="3.2" fill="url(#eyePupil)" />
      <circle cx="24.2" cy="32.8" r="1.2" fill="#ffffff" />

      {/* Right Eye */}
      <circle cx="41" cy="34" r="6" fill="#f8fafc" />
      <circle cx="41" cy="34" r="3.2" fill="url(#eyePupil)" />
      <circle cx="42.2" cy="32.8" r="1.2" fill="#ffffff" />

      {/* Horizontal Mouth Line */}
      <line x1="24" y1="45" x2="40" y2="45" stroke="#220408" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
};

export default RobotAvatar;
