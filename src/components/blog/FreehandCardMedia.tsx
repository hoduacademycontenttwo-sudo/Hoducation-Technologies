import React from 'react';
import { BlogPost } from '../../content/blog/types';

interface FreehandCardMediaProps {
  post: BlogPost;
  variant?: 'hero' | 'hero-secondary' | 'grid' | 'compact';
}

export const FreehandCardMedia: React.FC<FreehandCardMediaProps> = ({ post, variant = 'grid' }) => {
  // Map slugs to thematic visual styling
  const getThematicVisual = () => {
    switch (post.slug) {
      case 'custom-software-vs-ready-made-software':
        return {
          bgGradient: 'linear-gradient(135deg, #2b0b18 0%, #15040b 100%)',
          accentColor: '#f43f5e',
          badgeText: 'Custom vs SaaS',
          mainTitle: 'Custom Architecture vs. Ready-Made SaaS',
          subText: 'The 10x ROI Horizon for Scaling Systems',
          graphicType: 'code-split',
        };
      case 'ai-agents-vs-traditional-automation':
        return {
          bgGradient: 'linear-gradient(135deg, #092635 0%, #03141c 100%)',
          accentColor: '#06b6d4',
          badgeText: 'AI Agentic Swarms',
          mainTitle: 'Autonomous Agents vs. Deterministic RPA',
          subText: 'Why Multi-Agent Systems Surpass Rigid Scripts',
          graphicType: 'network-nodes',
        };
      case 'modern-school-erp-features':
        return {
          bgGradient: 'linear-gradient(135deg, #261506 0%, #0f0701 100%)',
          accentColor: '#f97316',
          badgeText: 'Institutional ERP',
          mainTitle: 'The 8 Non-Negotiable Modules',
          subText: 'Eliminating Fee Leakage & Fragmented Data',
          graphicType: 'gauge-ring',
        };
      case 'custom-software-development-cost-india':
        return {
          bgGradient: 'linear-gradient(135deg, #102619 0%, #05130b 100%)',
          accentColor: '#10b981',
          badgeText: 'Engineering Budget 2026',
          mainTitle: 'Enterprise Software Costs in India',
          subText: 'Transparent 2026 Pricing & Delivery Playbook',
          graphicType: 'scale-balance',
        };
      case 'crm-vs-erp-difference':
        return {
          bgGradient: 'linear-gradient(135deg, #0f1738 0%, #060a1d 100%)',
          accentColor: '#6366f1',
          badgeText: 'Enterprise Architecture',
          mainTitle: 'CRM vs. ERP: System Synergy',
          subText: 'Synchronizing Inbound Pipeline with ERP Delivery',
          graphicType: 'sync-pipeline',
        };
      case 'business-processes-automate-with-ai':
        return {
          bgGradient: 'linear-gradient(135deg, #1c0b2c 0%, #0a0312 100%)',
          accentColor: '#a855f7',
          badgeText: 'Process Engineering',
          mainTitle: '7 Repetitive Business Workflows',
          subText: 'Automated With Generative AI & Human-in-the-Loop',
          graphicType: 'flow-lanes',
        };
      case 'signs-outgrown-excel-spreadsheets':
        return {
          bgGradient: 'linear-gradient(135deg, #181e28 0%, #0c0f16 100%)',
          accentColor: '#38bdf8',
          badgeText: 'Data Architecture',
          mainTitle: '5 Red Flags Your Team Has Outgrown Excel',
          subText: 'Migrating Manual Sheets to High-Concurrence Databases',
          graphicType: 'grid-cracking',
        };
      case 'crm-automation-sales-follow-ups':
        return {
          bgGradient: 'linear-gradient(135deg, #2b1109 0%, #120602 100%)',
          accentColor: '#fb923c',
          badgeText: 'Revenue Engineering',
          mainTitle: 'Zero-Lead-Leakage Sales Pipelines',
          subText: 'Sub-60s Automated Multichannel Sequences',
          graphicType: 'conversion-funnel',
        };
      case 'website-crm-lead-machine':
        return {
          bgGradient: 'linear-gradient(135deg, #1b1c20 0%, #0c0d10 100%)',
          accentColor: '#eab308',
          badgeText: 'Inbound Growth Engine',
          mainTitle: 'Turning Web Visitors into Qualified Pipeline',
          subText: 'Automated Intent Scoring & Direct CRM Ingestion',
          graphicType: 'radar-intent',
        };
      case 'ai-automation-transforming-business-2026':
      default:
        return {
          bgGradient: 'linear-gradient(135deg, #180d2b 0%, #090314 100%)',
          accentColor: '#ec4899',
          badgeText: 'Autonomous Business 2026',
          mainTitle: 'Agentic Workflows in Production',
          subText: 'How High-Performance Companies Run on Autonomous Code',
          graphicType: 'swarm-matrix',
        };
    }
  };

  const visual = getThematicVisual();

  return (
    <div
      className={`freehand-media-box freehand-media-${variant}`}
      style={{ background: visual.bgGradient }}
      aria-hidden="true"
    >
      {/* Background Graphic Patterns & Glow */}
      <div className="freehand-media-glow" style={{ background: visual.accentColor }} />
      <div className="freehand-media-mesh" />

      {/* Top Left Brand Signature Mark (* hoducation) */}
      <div className="freehand-media-header">
        <div className="freehand-brand-mark">
          <span className="freehand-brand-asterisk">✱</span>
          <span className="freehand-brand-name">hoducation</span>
        </div>
        <div className="freehand-brand-badge">{visual.badgeText}</div>
      </div>

      {/* Middle Content Visual Representation */}
      <div className="freehand-media-center">
        {/* Left/Main Headline in Visual */}
        <div className="freehand-visual-headline">
          <div className="fh-visual-title-text">{visual.mainTitle}</div>
          <div className="fh-visual-sub-text">{visual.subText}</div>
        </div>

        {/* Right Infographic / Visual Element */}
        <div className="freehand-visual-graphic">
          {visual.graphicType === 'gauge-ring' && (
            <div className="fh-graphic-ring-wrap">
              <svg viewBox="0 0 120 120" className="fh-graphic-svg">
                <circle cx="60" cy="60" r="48" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="48"
                  stroke={visual.accentColor}
                  strokeWidth="8"
                  strokeDasharray="301.6"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="60" cy="60" r="32" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
                <circle
                  cx="60"
                  cy="60"
                  r="32"
                  stroke="#fbbf24"
                  strokeWidth="6"
                  strokeDasharray="201"
                  strokeDashoffset="45"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
              <div className="fh-ring-stat">
                <span className="fh-stat-num">90%</span>
                <span className="fh-stat-lbl">Automated</span>
              </div>
            </div>
          )}

          {visual.graphicType === 'network-nodes' && (
            <div className="fh-graphic-network">
              <div className="fh-net-center" style={{ borderColor: visual.accentColor }}>
                <span>Agent</span>
              </div>
              <div className="fh-net-node fh-node-1">API</div>
              <div className="fh-net-node fh-node-2">DB</div>
              <div className="fh-net-node fh-node-3">LLM</div>
              <div className="fh-net-node fh-node-4">CRM</div>
              <div className="fh-net-line line-1" />
              <div className="fh-net-line line-2" />
              <div className="fh-net-line line-3" />
              <div className="fh-net-line line-4" />
            </div>
          )}

          {visual.graphicType === 'scale-balance' && (
            <div className="fh-graphic-scale">
              <div className="fh-scale-beam" />
              <div className="fh-scale-pillar" />
              <div className="fh-scale-pan pan-left">
                <span className="pan-text">Build</span>
              </div>
              <div className="fh-scale-pan pan-right">
                <span className="pan-text">10x ROI</span>
              </div>
            </div>
          )}

          {visual.graphicType === 'code-split' && (
            <div className="fh-graphic-cards">
              <div className="fh-mini-card card-front">
                <div className="fh-code-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="fh-code-line l1" />
                <div className="fh-code-line l2" />
                <div className="fh-code-line l3" />
              </div>
              <div className="fh-mini-card card-back" style={{ borderColor: visual.accentColor }}>
                <span className="card-badge-pill">Bespoke</span>
              </div>
            </div>
          )}

          {visual.graphicType === 'sync-pipeline' && (
            <div className="fh-graphic-sync">
              <div className="fh-sync-box box-1">
                <span className="sync-tag">CRM</span>
                <span className="sync-val">+140%</span>
              </div>
              <div className="fh-sync-arrows">⇄</div>
              <div className="fh-sync-box box-2" style={{ borderColor: visual.accentColor }}>
                <span className="sync-tag">ERP</span>
                <span className="sync-val">100%</span>
              </div>
            </div>
          )}

          {!['gauge-ring', 'network-nodes', 'scale-balance', 'code-split', 'sync-pipeline'].includes(visual.graphicType) && (
            <div className="fh-graphic-matrix">
              <div className="fh-matrix-item mi-1" style={{ borderColor: visual.accentColor }}>
                <span>Autonomous</span>
              </div>
              <div className="fh-matrix-item mi-2">
                <span>Scalable</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
