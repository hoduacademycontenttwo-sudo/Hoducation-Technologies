import React from 'react';
import './Loader.css';

interface LoaderProps {
  fullscreen?: boolean;
  size?: number;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  fullscreen = false,
  size = 90,
  className = '',
}) => {
  return (
    <div
      className={`hodu-loader-wrapper ${fullscreen ? 'fullscreen' : ''} ${className}`}
      role="status"
      aria-label="Loading content"
    >
      <svg
        viewBox="0 0 100 100"
        className="hodu-loader-svg"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <g className="points">
          <circle fill="#fff" r={50} cy={50} cx={50} className="ciw" />
          <circle r={4} cy={50} cx={5} className="ci2" />
          <circle r={4} cy={50} cx={95} className="ci1" />
        </g>
      </svg>
    </div>
  );
};

export default Loader;
