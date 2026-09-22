import React, { useState } from 'react';
import { BlogPost } from '../../content/blog/types';
import './FreehandCardMedia.css';

interface FreehandCardMediaProps {
  post: BlogPost;
  variant?: 'hero' | 'hero-secondary' | 'grid' | 'compact';
}

export const FreehandCardMedia: React.FC<FreehandCardMediaProps> = ({ post, variant = 'grid' }) => {
  const [imageError, setImageError] = useState(false);

  // Fallback badges and gradients
  const getThematicVisual = () => {
    switch (post.slug) {
      case 'custom-software-vs-ready-made-software':
        return { bgGradient: 'linear-gradient(135deg, #2b0b18 0%, #15040b 100%)', badgeText: 'Custom vs SaaS' };
      case 'ai-agents-vs-traditional-automation':
        return { bgGradient: 'linear-gradient(135deg, #092635 0%, #03141c 100%)', badgeText: 'AI Agentic Swarms' };
      case 'modern-school-erp-features':
        return { bgGradient: 'linear-gradient(135deg, #261506 0%, #0f0701 100%)', badgeText: 'Institutional ERP' };
      case 'custom-software-development-cost-india':
        return { bgGradient: 'linear-gradient(135deg, #102619 0%, #05130b 100%)', badgeText: 'Pricing 2026' };
      case 'crm-vs-erp-difference':
        return { bgGradient: 'linear-gradient(135deg, #0f1738 0%, #060a1d 100%)', badgeText: 'CRM vs ERP' };
      case 'business-processes-automate-with-ai':
        return { bgGradient: 'linear-gradient(135deg, #1c0b2c 0%, #0a0312 100%)', badgeText: 'AI Automation' };
      case 'signs-outgrown-excel-spreadsheets':
        return { bgGradient: 'linear-gradient(135deg, #181e28 0%, #0c0f16 100%)', badgeText: 'Database Scale' };
      case 'crm-automation-sales-follow-ups':
        return { bgGradient: 'linear-gradient(135deg, #2b1109 0%, #120602 100%)', badgeText: 'Revenue Engine' };
      case 'website-crm-lead-machine':
        return { bgGradient: 'linear-gradient(135deg, #1b1c20 0%, #0c0d10 100%)', badgeText: 'Lead Machine' };
      case 'ai-automation-transforming-business-2026':
      default:
        return { bgGradient: 'linear-gradient(135deg, #180d2b 0%, #090314 100%)', badgeText: 'AI Enterprise' };
    }
  };

  const visual = getThematicVisual();
  const imageUrl = post.featuredImage || `/blog/${post.slug}.jpg`;

  return (
    <div
      className={`freehand-media-box freehand-media-${variant}`}
      style={{ background: visual.bgGradient }}
    >
      {/* High-Resolution Topic Image */}
      {!imageError && (
        <img
          src={imageUrl}
          alt={post.title}
          className="freehand-media-image"
          loading={variant === 'hero' ? 'eager' : 'lazy'}
          onError={() => setImageError(true)}
        />
      )}

      {/* Elegant Dark Vignette Overlay */}
      <div className="freehand-media-overlay" />

      {/* Top Floating Badge Row */}
      <div className="freehand-media-header">
        <div className="freehand-brand-mark">
          <img src="/ht-logo.jpg" alt="Hoducation Logo" className="freehand-brand-logo-img" width="18" height="18" />
          <span className="freehand-brand-name">HODUCATION</span>
        </div>
        <div className="freehand-topic-badge">
          {post.imageBadgeText || visual.badgeText}
        </div>
      </div>

      {/* Hero Bottom Banner Detail */}
      {variant === 'hero' && (
        <div className="freehand-media-bottom-info">
          <div className="freehand-media-hero-title-box">
            <p className="freehand-media-hero-lead">{post.title}</p>
            <p className="freehand-media-hero-sub">{post.readingTime} • Hoducation Engineering Insights</p>
          </div>
          <span className="freehand-media-pill-tag">
            {post.category}
          </span>
        </div>
      )}
    </div>
  );
};

