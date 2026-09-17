import { ProductItem } from '../types/enquiry';

export const PRODUCTS_CATALOG: ProductItem[] = [
  {
    id: 'custom-software',
    name: 'Custom Software & Portals',
    tagline: 'Tailored Cloud Architecture & Web Applications',
    category: 'flagship',
    badge: 'CUSTOM DEV',
    badgeColor: '#b5a0ff',
    description:
      'Purpose-built web platforms, secure client portals, internal operations software, and resilient API microservices engineered around your precise company workflows.',
    metrics: '100% Bespoke',
    metricsLabel: 'Architecture Match',
    features: [
      'Role-based granular ACL, encryption & audit compliance',
      'Modern microservices & resilient PostgreSQL architecture',
      'Third-party payment gateways & custom data pipeline integrations',
      'Dedicated engineering team, SLA maintenance and DevOps',
    ],
    icon: 'fa-code',
    turnaroundTime: 'Agile sprints delivery',
  },
  {
    id: 'enterprise-erp',
    name: 'Enterprise ERP & CRM Systems',
    tagline: 'Unified Resource Planning & Sales Intelligence',
    category: 'enterprise',
    badge: 'ENTERPRISE',
    badgeColor: '#60a5fa',
    description:
      'Multi-branch resource planning, end-to-end billing, automated invoicing, inventory tracking, staff payroll, and high-velocity customer relationship management.',
    metrics: 'Unified Ops',
    metricsLabel: 'Multi-Branch Sync',
    features: [
      'Automated billing, reconciliation & financial analytics',
      'Lead pipeline tracking with automated follow-up triggers',
      'Multi-tier department access & organizational hierarchy',
      'Inventory, asset lifecycle and procurement management',
    ],
    icon: 'fa-layer-group',
    turnaroundTime: '2 - 4 weeks onboarding',
  },
  {
    id: 'automations',
    name: 'Intelligent Automations',
    tagline: 'Event-Driven RPA & Seamless System Integration',
    category: 'automation',
    badge: 'AUTOMATION',
    badgeColor: '#34d399',
    description:
      'Background webhooks, automated document parsing, zero-latency database synchronizations, and cross-platform workflows that eliminate repetitive human latency.',
    metrics: 'Zero Latency',
    metricsLabel: 'Automated Sync',
    features: [
      'Event-driven data pipelines & webhook orchestrators',
      'Automated WhatsApp & Email customer notification loops',
      'Document extraction, optical reading & validation bots',
      'Custom ERP/CRM bidirectional sync with third-party tools',
    ],
    icon: 'fa-bolt-lightning',
    turnaroundTime: 'Fast plug-and-play setup',
  },
  {
    id: 'acados',
    name: 'AcadOS (Our EdTech Product)',
    tagline: 'Hoducation’s Flagship Academic Operating System',
    category: 'ai',
    badge: 'COMPANY PRODUCT',
    badgeColor: '#f59e0b',
    description:
      'Our proprietary 5-in-1 institutional operating system built by Hoducation for schools, colleges, and coaching networks — managing student records, fee billing, automated question generation, and parent apps.',
    metrics: '30+ Campuses',
    metricsLabel: 'Powered by AcadOS',
    features: [
      'Automated question paper generator in < 60 seconds',
      '99.8% precision computer-vision OMR sheet evaluation',
      'Integrated fee collections & WhatsApp parent notifications',
      'Multi-campus student lifecycle & examination management',
    ],
    icon: 'fa-graduation-cap',
    turnaroundTime: 'Turnkey deployment',
  },
  {
    id: 'cms-portals',
    name: 'CMS & Digital Platforms',
    tagline: 'High-Performance Web Engines & Knowledge Hubs',
    category: 'flagship',
    badge: 'DIGITAL WEB',
    badgeColor: '#e879f9',
    description:
      'Ultra-fast, content-managed web platforms, resource repositories, and digital publishing engines designed for high-traffic institutions and growing businesses.',
    metrics: '< 1s Load',
    metricsLabel: 'Engineered Performance',
    features: [
      'Headless architecture with modern dynamic UI',
      'SEO-optimized semantic engineering and asset compression',
      'Intuitive admin dashboard for non-technical team updates',
      'Enterprise-grade security and automated CDN distribution',
    ],
    icon: 'fa-file-lines',
    turnaroundTime: '1 - 2 weeks rollout',
  },
];

export const ORG_TYPES = [
  { id: 'enterprise', label: 'Corporate / Business', icon: 'fa-briefcase' },
  { id: 'tech_startup', label: 'Tech Startup / SaaS', icon: 'fa-rocket' },
  { id: 'institution', label: 'School / College / Institute', icon: 'fa-school' },
  { id: 'multicampus', label: 'Multi-Branch Group', icon: 'fa-network-wired' },
  { id: 'agency', label: 'Service / Consulting Firm', icon: 'fa-building' },
] as const;

export const SCALE_OPTIONS = [
  { id: 'small', label: 'Under 100', desc: 'Core team / Startup' },
  { id: 'medium', label: '100 – 1,000', desc: 'Growing organization' },
  { id: 'large', label: '1,000 – 5,000', desc: 'Large business / Campus' },
  { id: 'enterprise', label: '5,000+ Users', desc: 'Enterprise / Chain' },
] as const;

export const ADDON_MODULES = [
  { id: 'api_sync', label: 'Custom REST API & Webhook Connectors', tag: 'Dev' },
  { id: 'whatsapp', label: 'WhatsApp & SMS Notification Engine', tag: 'Automation' },
  { id: 'pg', label: 'Payment Gateway (Razorpay/Stripe/Easebuzz)', tag: 'Finance' },
  { id: 'mobile_app', label: 'White-Labeled Mobile Apps (iOS & Android)', tag: 'Mobile' },
  { id: 'security', label: 'Role-Based ACL & Enterprise Audit Logging', tag: 'Security' },
  { id: 'devops', label: 'High-Availability Cloud Hosting & 24/7 SLA', tag: 'DevOps' },
] as const;

export const TIMELINE_OPTIONS = [
  { id: 'urgent', label: 'Immediate (< 2 Weeks)' },
  { id: '1month', label: 'Within 30 Days' },
  { id: 'next_term', label: 'Upcoming Quarter / Term' },
  { id: 'exploring', label: 'Exploring / Requesting Proposal' },
] as const;
