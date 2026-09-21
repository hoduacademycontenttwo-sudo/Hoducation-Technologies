import React from 'react';
import styled from 'styled-components';

interface LoaderProps {
  size?: number | string;
  fullscreen?: boolean;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  size = 200,
  fullscreen = false,
  className = '',
}) => {
  return (
    <StyledWrapper
      className={`${fullscreen ? 'fullscreen' : ''} ${className}`}
      $size={typeof size === 'number' ? `${size}px` : size}
    >
      <svg viewBox="0 0 100 100" className="loader">
        <g className="points"> 
          <circle fill="#fff" r={50} cy={50} cx={50} className="ciw" />
          <circle r={4} cy={50} cx={5} className="ci2" />
          <circle r={4} cy={50} cx={95} className="ci1" />
        </g>
      </svg>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ $size?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  &.fullscreen {
    min-height: 60vh;
  }

  .loader {
    width: ${({ $size }) => $size || '200px'};
    max-height: 900px;
    transform-origin: 50% 50%;
    overflow: visible;
  }

  .ci1 {
    fill: var(--higru, #800020);
    animation: toBig 3s infinite -1.5s;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  .ciw {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: breath 3s infinite;
  }

  .ci2 {
    fill: var(--higru, #800020);
    animation: toBig2 3s infinite;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  .points {
    animation: rot 3s infinite;
    transform-box: fill-box;
    transform-origin: 50% 50%;
  }

  @keyframes rot {
    0% {
      transform: rotate(0deg);
    }

    30% {
      transform: rotate(360deg);
    }

    50% {
      transform: rotate(360deg);
    }

    80% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes toBig {
    0% {
      transform: scale(1) translateX(0px);
    }

    30% {
      transform: scale(1) translateX(0px);
    }

    50% {
      transform: scale(10) translateX(-4.5px);
    }

    80% {
      transform: scale(10) translateX(-4.5px);
    }

    100% {
      transform: scale(1) translateX(0px);
    }
  }

  @keyframes toBig2 {
    0% {
      transform: scale(1) translateX(0px);
    }

    30% {
      transform: scale(1) translateX(0px);
    }

    50% {
      transform: scale(10) translateX(4.5px);
    }

    80% {
      transform: scale(10) translateX(4.5px);
    }

    100% {
      transform: scale(1) translateX(0px);
    }
  }

  @keyframes breath {
    15% {
      transform: scale(1);
    }

    40% {
      transform: scale(1.1);
    }

    65% {
      transform: scale(1);
    }

    90% {
      transform: scale(1.1);
    }
  }

  .dwf, .share {
    position: fixed;
    bottom: 4px;
    right: 10px;
    background-color: #0003;
    padding: 3px;
    border-radius: 3px;
  }
`;

export default Loader;
