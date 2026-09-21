export interface TestimonialItem {
  id: number;
  name: string;
  type: 'school' | 'coaching';
  city: string;
  initials: string;
  color: string;
  image: string;
  feedback: string;
  person: string;
  role: string;
  highlightMetric?: string;
  tagline?: string;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 1,
    name: 'Scholars Foundation School',
    type: 'school',
    city: 'Jaipur, India',
    initials: 'SFS',
    color: '#800000',
    image: '/clients/scholars-foundation.jpg',
    feedback:
      'AcadOS has completely transformed how we manage exams and student data. Everything from test creation to results is now seamless and professional.',
    person: 'Principal',
    role: 'Scholars Foundation School',
    highlightMetric: '100% Digital Exam Workflow',
    tagline: 'Bringing Excellence',
  },
  {
    id: 2,
    name: 'Scholars International School',
    type: 'school',
    city: 'Rajasthan, India',
    initials: 'SIS',
    color: '#1d4ed8',
    image: '/clients/scholars-international.jpg',
    feedback:
      'The platform is intuitive and the support team is exceptional. Our teachers spend less time on admin and more time teaching. Highly recommended.',
    person: 'Director',
    role: 'Scholars International School',
    highlightMetric: 'Saved 15+ Admin Hours/Wk',
    tagline: 'Faith, Excellence, Truth',
  },
  {
    id: 3,
    name: 'LectureWala',
    type: 'coaching',
    city: 'India',
    initials: 'LW',
    color: '#059669',
    image: '/clients/lecturewala.jpg',
    feedback:
      'As an online coaching platform, AcadOS gave us the edge we needed — smart test delivery, analytics, and a learner app our students love.',
    person: 'Founder',
    role: 'LectureWala',
    highlightMetric: '50K+ Mock Tests Delivered',
    tagline: 'Your Customized Lectureroom',
  },
  {
    id: 4,
    name: 'Samariya Classes',
    type: 'coaching',
    city: 'Rajasthan, India',
    initials: 'SC',
    color: '#d97706',
    image: '/clients/samariya-classes.jpg',
    feedback:
      'Our batch results improved significantly after switching to AcadOS. The CBT platform is fast, reliable, and our students find it easy to use.',
    person: 'Director',
    role: 'Samariya Classes',
    highlightMetric: 'NTA-Style CBT Simulation',
    tagline: 'Empowering Student Futures',
  },
  {
    id: 5,
    name: 'B2E Learning',
    type: 'coaching',
    city: 'India',
    initials: 'B2E',
    color: '#7c3aed',
    image: '/clients/b2e-learning.jpg',
    feedback:
      'From content library to OMR evaluation — we use AcadOS end-to-end. It replaced three different tools we were paying for separately.',
    person: 'Co-Founder',
    role: 'B2E Learning',
    highlightMetric: '3-in-1 Unified Platform',
    tagline: 'Beyond Education & Learning',
  },
  {
    id: 6,
    name: 'St. Xavier School',
    type: 'school',
    city: 'Behror, India',
    initials: 'SXS',
    color: '#0891b2',
    image: '/clients/st-xavier.jpg',
    feedback:
      'AcadOS brought order to our exam process. Parents appreciate the transparency and students stay engaged through the learners hub.',
    person: 'Academic Coordinator',
    role: 'St. Xavier School',
    highlightMetric: '99.8% OMR Evaluation Precision',
    tagline: 'Excellence in Education',
  },
  {
    id: 7,
    name: 'Whizdom Institute',
    type: 'coaching',
    city: 'India',
    initials: 'WI',
    color: '#be185d',
    image: '/clients/whizdom.jpg',
    feedback:
      'The ERP module alone saved us 10+ hours a week. Combined with the test platform, AcadOS is now the backbone of our institute.',
    person: 'Operations Head',
    role: 'Whizdom Institute',
    highlightMetric: '10+ Hours Saved Weekly',
    tagline: 'Nurturing Academic Prowess',
  },
  {
    id: 8,
    name: 'Geeta Classes',
    type: 'coaching',
    city: 'India',
    initials: 'GC',
    color: '#ea580c',
    image: '/clients/geeta-classes.jpg',
    feedback:
      'Simple to onboard, powerful in use. Our faculty adapted within days and our students were immediately comfortable with the interface.',
    person: 'Director',
    role: 'Geeta Classes',
    highlightMetric: 'Zero Onboarding Friction',
    tagline: 'Dedicated to Shaping Bright Futures',
  },
];
