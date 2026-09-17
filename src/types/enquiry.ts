export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: 'flagship' | 'ai' | 'automation' | 'enterprise';
  badge: string;
  badgeColor?: string;
  description: string;
  metrics: string;
  metricsLabel: string;
  features: string[];
  icon: string;
  turnaroundTime: string;
}

export type OrgType = 'enterprise' | 'tech_startup' | 'institution' | 'multicampus' | 'agency';

export type UserScale = 'small' | 'medium' | 'large' | 'enterprise';

export type TimelineOption = 'urgent' | '1month' | 'next_term' | 'exploring';

export interface EnquiryFormData {
  selectedProducts: string[];
  orgType: OrgType;
  studentScale: UserScale;
  addons: string[];
  fullName: string;
  email: string;
  phone: string;
  orgName: string;
  city: string;
  timeline: TimelineOption;
  additionalNotes: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  orgName?: string;
  selectedProducts?: string;
}

export interface SubmissionResult {
  referenceId: string;
  timestamp: string;
  data: EnquiryFormData;
}
