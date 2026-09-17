export interface ProcessStepItem {
  id: number;
  number: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  phaseTags: string[];
  iconType: 'discovery' | 'requirements' | 'development' | 'demo' | 'launch' | 'support';
  videoUrl?: string;
  gifUrl?: string;
  mediaUrl?: string;
  imageUrl?: string;
}

export const PROCESS_STEPS: ProcessStepItem[] = [
  {
    id: 1,
    number: '01',
    title: 'Discovery & Meeting',
    description: 'We understand your goals, challenges and vision through detailed discussions.',
    side: 'left',
    phaseTags: ['IDEAS', 'DISCUSSIONS', 'PLANNING'],
    iconType: 'discovery',
    imageUrl: '/step-1-discovery.png',
  },
  {
    id: 2,
    number: '02',
    title: 'Requirements',
    description: 'We document your requirements, define scope, suggest the best solution and create a clear plan with timelines.',
    side: 'right',
    phaseTags: ['STRATEGY', 'STRUCTURE', 'CLARITY'],
    iconType: 'requirements',
    imageUrl: '/step-2-requirements.png',
  },
  {
    id: 3,
    number: '03',
    title: 'Design & Development',
    description: 'Our team designs, develops and iterates — keeping you in the loop with regular updates.',
    side: 'left',
    phaseTags: ['BUILDING', 'SOLUTIONS', 'TOGETHER'],
    iconType: 'development',
    videoUrl: '/step-3-design-development.mp4',
  },
  {
    id: 4,
    number: '04',
    title: 'Demo & Feedback',
    description: 'We showcase the working product, gather your feedback and make improvements as needed.',
    side: 'right',
    phaseTags: ['REVIEW', 'FEEDBACK', 'IMPROVE'],
    iconType: 'demo',
    videoUrl: '/step-4-demo-feedback.mp4',
  },
  {
    id: 5,
    number: '05',
    title: 'Launch / Ship',
    description: 'Once approved, we deploy your product to production and make it live.',
    side: 'left',
    phaseTags: ['DEPLOY', 'DELIVER', 'MAKE IT REAL'],
    iconType: 'launch',
    videoUrl: '/step-5-launch-ship.mp4',
  },
  {
    id: 6,
    number: '06',
    title: 'Support & Growth',
    description: 'We stay with you for ongoing support, maintenance and future enhancements.',
    side: 'right',
    phaseTags: ['SUPPORT', 'OPTIMIZE', 'GROW TOGETHER'],
    iconType: 'support',
    videoUrl: '/step-6-support-growth.mp4',
  },
];
