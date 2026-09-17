import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PROCESS_STEPS } from './processData';
import { ProcessHeader } from './ProcessHeader';
import { ProcessStepCard } from './ProcessStepCard';
import './ProcessSection.css';

export const ProcessSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsContainerRef = useRef<HTMLDivElement>(null);
  const spineLineRef = useRef<HTMLDivElement>(null);
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [hoveredStepId, setHoveredStepId] = useState<number | null>(null);
  const lastActiveRef = useRef<number>(1);
  const tickingRef = useRef<boolean>(false);

  // Compute scroll progress through the section without triggering React re-renders
  const updateScrollProgress = useCallback(() => {
    if (!rowsContainerRef.current) return;

    const containerRect = rowsContainerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const containerHeight = containerRect.height;

    // Viewport trigger line (approx 45% from top of screen)
    const triggerY = windowHeight * 0.45;

    // How far the top of the container has scrolled past the trigger point
    const scrolledPx = triggerY - containerRect.top;
    const rawProgress = scrolledPx / Math.max(containerHeight, 1);
    const clampedProgress = Math.min(1, Math.max(0, rawProgress));

    // Update spine line height directly on DOM to prevent any React re-render during scroll
    if (spineLineRef.current) {
      spineLineRef.current.style.height = `${Math.round(clampedProgress * 100)}%`;
    }

    // Determine active step based on each row's actual vertical position
    const rowElements = rowsContainerRef.current.querySelectorAll('.process-step-row');
    let currentActive = 1;

    rowElements.forEach((el, index) => {
      const rowRect = el.getBoundingClientRect();
      const rowMid = rowRect.top + rowRect.height / 2;
      if (rowMid <= triggerY + 60) {
        currentActive = index + 1;
      }
    });

    if (currentActive !== lastActiveRef.current) {
      lastActiveRef.current = currentActive;
      setActiveStepId(currentActive);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // Initial calculation
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [updateScrollProgress]);

  // Click on a node or card to scroll smoothly to that step
  const handleStepClick = useCallback((stepId: number) => {
    setActiveStepId(stepId);
    lastActiveRef.current = stepId;

    const rowEl = rowsContainerRef.current?.querySelector(`.process-step-row[data-step="${stepId}"]`);
    if (rowEl) {
      const rect = rowEl.getBoundingClientRect();
      const targetScroll = window.scrollY + rect.top - (window.innerHeight / 2 - rect.height / 2);
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
    }
  }, []);

  return (
    <section className="process-timeline-section" id="process" ref={sectionRef} aria-label="Our Process">
      <div className="process-inner-wrap">
        {/* Section Header */}
        <ProcessHeader />

        {/* Process Alternating Rows & Timeline Spine */}
        <div className="process-timeline-body" ref={rowsContainerRef}>
          {/* Central Vertical Timeline Spine */}
          <div className="process-timeline-spine" aria-hidden="true">
            <div className="spine-base-line"></div>
            <div
              className="spine-progress-line"
              ref={spineLineRef}
              style={{ height: '10%' }}
            ></div>
          </div>

          {/* 6 Step Rows */}
          <div className="process-steps-track">
            {PROCESS_STEPS.map((step) => {
              const isActive = step.id === activeStepId;
              const isPassed = step.id < activeStepId;
              const isHovered = step.id === hoveredStepId;

              return (
                <ProcessStepCard
                  key={step.id}
                  step={step}
                  isActive={isActive}
                  isPassed={isPassed}
                  isHovered={isHovered}
                  onHover={setHoveredStepId}
                  onClick={handleStepClick}
                />
              );
            })}
          </div>
        </div>



      </div>
    </section>
  );
};

export default ProcessSection;
