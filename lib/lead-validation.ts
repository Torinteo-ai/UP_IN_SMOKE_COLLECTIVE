export const LEAD_STATUS_OPTIONS = ['New', 'Contacted', 'Approved', 'Closed'] as const;

export type LeadStatus = (typeof LEAD_STATUS_OPTIONS)[number];

export type EligibilityLeadInput = {
  firstName: string;
  email: string;
  ageConfirmed: boolean;
  ukResident: boolean;
  conditionCategory: string;
  previousTreatments: string;
  consultationInterest: string;
  consent: boolean;
};

const conditionOptions = ['Chronic pain', 'Anxiety', 'PTSD', 'ADHD', 'Sleep issues', 'Other'];
const consultationOptions = ['Yes, I want a consultation', 'Not right now'];

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const parseEligibilityLead = (payload: unknown): { data?: EligibilityLeadInput; error?: string } => {
  if (!isObject(payload)) return { error: 'Invalid submission payload.' };

  const firstName = String(payload.firstName ?? '').trim();
  const email = String(payload.email ?? '').trim().toLowerCase();
  const previousTreatments = String(payload.previousTreatments ?? '').trim();
  const conditionCategory = String(payload.conditionCategory ?? '');
  const consultationInterest = String(payload.consultationInterest ?? '');
  const ageConfirmed = payload.ageConfirmed === true;
  const ukResident = payload.ukResident === true;
  const consent = payload.consent === true;

  if (!firstName || firstName.length > 100) return { error: 'Please provide a valid first name.' };
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return { error: 'Please provide a valid email address.' };
  if (!ageConfirmed || !ukResident) return { error: 'Age and residency confirmations are required.' };
  if (!conditionOptions.includes(conditionCategory)) return { error: 'Please select a valid condition category.' };
  if (!consultationOptions.includes(consultationInterest)) return { error: 'Please select a valid consultation preference.' };
  if (previousTreatments.length > 2000) return { error: 'Previous treatments must be under 2000 characters.' };
  if (!consent) return { error: 'Consent is required.' };

  return {
    data: {
      firstName,
      email,
      ageConfirmed,
      ukResident,
      conditionCategory,
      previousTreatments,
      consultationInterest,
      consent,
    },
  };
};

export const parseLeadStatus = (payload: unknown): { status?: LeadStatus; error?: string } => {
  if (!isObject(payload)) return { error: 'Invalid request payload.' };
  const status = String(payload.status ?? '') as LeadStatus;

  if (!LEAD_STATUS_OPTIONS.includes(status)) {
    return { error: 'Invalid lead status.' };
  }

  return { status };
};
