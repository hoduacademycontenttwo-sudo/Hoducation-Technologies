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

const ProcessStepVideo = React.memo<{ src: string; title: string }>(({ src, title }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.loop = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('loop', '');

    const playVideo = () => {
      if (!video) return;
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            const unlockPlay = () => {
              video.play().catch(() => {});
              window.removeEventListener('touchstart', unlockPlay);
              window.removeEventListener('click', unlockPlay);
              window.removeEventListener('scroll', unlockPlay);
            };
            window.addEventListener('touchstart', unlockPlay, { once: true, passive: true });
            window.addEventListener('click', unlockPlay, { once: true });
            window.addEventListener('scroll', unlockPlay, { once: true, passive: true });
          });
        }
      }
    };

    playVideo();

    // Force play on every possible event
    const forcePlay = () => { playVideo(); };

    // Video element events
    video.addEventListener('pause', forcePlay);
    video.addEventListener('ended', forcePlay);
    video.addEventListener('waiting', forcePlay);
    video.addEventListener('stalled', forcePlay);
    video.addEventListener('suspend', forcePlay);
    video.addEventListener('abort', forcePlay);
    video.addEventListener('emptied', forcePlay);

    // Window + document events — catch every user interaction
    window.addEventListener('scroll', forcePlay, { passive: true });
    window.addEventListener('wheel', forcePlay, { passive: true });
    window.addEventListener('touchmove', forcePlay, { passive: true });
    window.addEventListener('touchstart', forcePlay, { passive: true });
    window.addEventListener('touchend', forcePlay, { passive: true });
    window.addEventListener('pointermove', forcePlay, { passive: true });
    window.addEventListener('pointerdown', forcePlay, { passive: true });
    window.addEventListener('keydown', forcePlay, { passive: true });
    window.addEventListener('mousedown', forcePlay, { passive: true });
    window.addEventListener('click', forcePlay, { passive: true });
    document.addEventListener('scroll', forcePlay, { passive: true });

    // Page visibility / focus
    const handleVisibility = () => { playVideo(); };
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);
    window.addEventListener('blur', forcePlay);
    document.addEventListener('focus', handleVisibility, true);

    // Nuclear 100ms heartbeat: paused → play, currentTime frozen → reload + play
    let lastTime = -1;
    let frozenCount = 0;
    const intervalId = setInterval(() => {
      if (!video) return;
      if (video.paused) {
        video.play().catch(() => {});
        return;
      }
      if (video.currentTime === lastTime && !video.paused) {
        frozenCount++;
        if (frozenCount >= 3) {
          video.load();
          video.play().catch(() => {});
          frozenCount = 0;
        }
      } else {
        frozenCount = 0;
      }
      lastTime = video.currentTime;
    }, 100);

    return () => {
      video.removeEventListener('pause', forcePlay);
      video.removeEventListener('ended', forcePlay);
      video.removeEventListener('waiting', forcePlay);
      video.removeEventListener('stalled', forcePlay);
      video.removeEventListener('suspend', forcePlay);
      video.removeEventListener('abort', forcePlay);
      video.removeEventListener('emptied', forcePlay);
      window.removeEventListener('scroll', forcePlay);
      window.removeEventListener('wheel', forcePlay);
      window.removeEventListener('touchmove', forcePlay);
      window.removeEventListener('touchstart', forcePlay);
      window.removeEventListener('touchend', forcePlay);
      window.removeEventListener('pointermove', forcePlay);
      window.removeEventListener('pointerdown', forcePlay);
      window.removeEventListener('keydown', forcePlay);
      window.removeEventListener('mousedown', forcePlay);
      window.removeEventListener('click', forcePlay);
      document.removeEventListener('scroll', forcePlay);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
      window.removeEventListener('blur', forcePlay);
      document.removeEventListener('focus', handleVisibility, true);
      clearInterval(intervalId);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="card-media-video"
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
      controls={false}
      aria-label={title}
      onPause={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
      onEnded={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
      onSuspend={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
      onStalled={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
      onWaiting={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
      onAbort={(e) => { (e.currentTarget as HTMLVideoElement).play().catch(() => {}); }}
    />
  );
});

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

      {/* Card Content: Image, Video, or GIF layout if media provided, else Icon Grid */}
      {step.imageUrl || step.mediaUrl || step.gifUrl || step.videoUrl ? (
        <div className="card-video-layout">
          <div className="card-media-wrap">
            {step.imageUrl || step.mediaUrl || step.gifUrl ? (
              <img
                className="card-media-video card-media-img"
                src={(step.imageUrl || step.mediaUrl || step.gifUrl)!}
                alt={step.title}
                loading="lazy"
              />
            ) : (
              <ProcessStepVideo src={step.videoUrl!} title={step.title} />
            )}
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
