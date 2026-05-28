'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';

type FormData = {
  firstName: string;
  email: string;
  ageConfirmed: boolean;
  ukResident: boolean;
  conditionCategory: string;
  previousTreatments: string;
  consultationInterest: string;
  consent: boolean;
};

const STORAGE_KEY = 'up-in-smoke-eligibility';
const initialData: FormData = { firstName: '', email: '', ageConfirmed: false, ukResident: false, conditionCategory: '', previousTreatments: '', consultationInterest: '', consent: false };
const conditionOptions = ['Chronic pain', 'Anxiety', 'PTSD', 'ADHD', 'Sleep issues', 'Other'];
const consultationOptions = ['Yes, I want a consultation', 'Not right now'];

export default function EligibilityForm() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [storageReady, setStorageReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFormData({ ...initialData, ...(JSON.parse(saved) as FormData) });
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady || typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData, storageReady]);

  const totalSteps = 4;
  const progress = useMemo(() => Math.round((step / totalSteps) * 100), [step]);
  const update = (field: keyof FormData, value: string | boolean) => { setError(''); setFormData((prev) => ({ ...prev, [field]: value })); };

  const validateStep = () => {
    if (step === 1 && (!formData.firstName.trim() || !formData.email.trim())) return 'Please enter your first name and email address.';
    if (step === 1 && !/^\S+@\S+\.\S+$/.test(formData.email)) return 'Please provide a valid email address.';
    if (step === 2 && (!formData.ageConfirmed || !formData.ukResident)) return 'You must confirm age (18+) and UK residency to continue.';
    if (step === 3 && !formData.conditionCategory) return 'Please choose a condition category.';
    if (step === 4 && (!formData.consultationInterest || !formData.consent)) return 'Please confirm consultation preference and consent to submit.';
    return '';
  };

  const onNext = () => { const e = validateStep(); if (e) return setError(e); setStep((s) => Math.min(s + 1, totalSteps)); };
  const onBack = () => { setError(''); setStep((s) => Math.max(s - 1, 1)); };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const e = validateStep();
    if (e) return setError(e);

    setError('');
    setIsSubmitting(true);

    const { error: submissionError } = await supabase.from('eligibility_leads').insert({
      first_name: formData.firstName.trim(),
      email: formData.email.trim(),
      age_confirmed: formData.ageConfirmed,
      uk_resident: formData.ukResident,
      condition_category: formData.conditionCategory,
      previous_treatments: formData.previousTreatments.trim(),
      consultation_interest: formData.consultationInterest,
      consent: formData.consent
    });

    if (submissionError) {
      setError('We could not submit your onboarding right now. Please try again in a moment.');
      setIsSubmitting(false);
      return;
    }

    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) return <div className="brand-panel mx-auto max-w-2xl p-8 text-center md:p-10"><p className="text-xs uppercase tracking-[0.2em] text-[#8e9a7f]">Submitted</p><h2 className="mt-3 text-3xl font-semibold text-[#efe7d7]">Thanks, you&apos;re in the patient pipeline.</h2><p className="mt-4 text-stone-300">Our partner team will review your onboarding details and share next steps by email.</p><div className="mt-8 space-y-2 text-sm text-stone-400"><p>Submission does not guarantee prescription approval.</p><p>Consultations are subject to clinician assessment.</p></div></div>;

  return (
    <form onSubmit={onSubmit} className="brand-panel mx-auto max-w-3xl p-6 pb-28 md:p-10 md:pb-10">
      <div className="mb-8"><div className="mb-3 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-stone-400"><span>Step {step} of {totalSteps}</span><span>{progress}% complete</span></div><div className="h-2 w-full overflow-hidden rounded-full bg-[#272a26]"><div className="h-full rounded-full bg-[#8e9a7f] transition-all duration-500" style={{ width: `${progress}%` }} /></div></div>
      <div className="step-fade min-h-[300px]">{/* step content */}
        {step === 1 && <div className="space-y-5"><h2 className="text-2xl font-semibold text-[#efe7d7]">Let&apos;s start with your details</h2><label className="block"><span className="mb-2 block text-sm text-stone-300">First name</span><input className="w-full rounded-xl border border-[#3a3d37] bg-[#141414]/80 px-4 py-3 text-stone-100 outline-none transition focus:border-[#8e9a7f]" value={formData.firstName} onChange={(e)=>update('firstName',e.target.value)} /></label><label className="block"><span className="mb-2 block text-sm text-stone-300">Email</span><input type="email" className="w-full rounded-xl border border-[#3a3d37] bg-[#141414]/80 px-4 py-3 text-stone-100 outline-none transition focus:border-[#8e9a7f]" value={formData.email} onChange={(e)=>update('email',e.target.value)} /></label></div>}
        {step === 2 && <div className="space-y-5"><h2 className="text-2xl font-semibold text-[#efe7d7]">Eligibility confirmations</h2><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#3a3d37] p-4"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#8e9a7f]" checked={formData.ageConfirmed} onChange={(e)=>update('ageConfirmed',e.target.checked)} /><span className="text-stone-200">I confirm I am aged 18 or over.</span></label><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#3a3d37] p-4"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#8e9a7f]" checked={formData.ukResident} onChange={(e)=>update('ukResident',e.target.checked)} /><span className="text-stone-200">I confirm I am a UK resident.</span></label></div>}
        {step === 3 && <div className="space-y-5"><h2 className="text-2xl font-semibold text-[#efe7d7]">Condition and treatment history</h2><label className="block"><span className="mb-2 block text-sm text-stone-300">Condition category</span><select className="w-full rounded-xl border border-[#3a3d37] bg-[#141414]/80 px-4 py-3 text-stone-100 outline-none transition focus:border-[#8e9a7f]" value={formData.conditionCategory} onChange={(e)=>update('conditionCategory',e.target.value)}><option value="">Select a category</option>{conditionOptions.map((option)=><option key={option} value={option}>{option}</option>)}</select></label><label className="block"><span className="mb-2 block text-sm text-stone-300">Previous treatments tried</span><textarea rows={4} className="w-full rounded-xl border border-[#3a3d37] bg-[#141414]/80 px-4 py-3 text-stone-100 outline-none transition focus:border-[#8e9a7f]" value={formData.previousTreatments} onChange={(e)=>update('previousTreatments',e.target.value)} /></label></div>}
        {step === 4 && <div className="space-y-5"><h2 className="text-2xl font-semibold text-[#efe7d7]">Consultation interest and consent</h2><div><p className="mb-3 text-sm text-stone-300">Are you interested in booking a consultation?</p><div className="space-y-3">{consultationOptions.map((option)=><label key={option} className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#3a3d37] p-4"><input type="radio" name="consultation" className="mt-1 h-4 w-4 accent-[#8e9a7f]" checked={formData.consultationInterest===option} onChange={()=>update('consultationInterest',option)} /><span className="text-stone-200">{option}</span></label>)}</div></div><label className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#3a3d37] p-4"><input type="checkbox" className="mt-1 h-4 w-4 accent-[#8e9a7f]" checked={formData.consent} onChange={(e)=>update('consent',e.target.checked)} /><span className="text-stone-200">I consent to UP IN SMOKE storing this onboarding information for follow-up contact.</span></label><div className="space-y-1 text-sm text-stone-400"><p>Submission does not guarantee prescription approval.</p><p>Consultations are subject to clinician assessment.</p></div></div>}
      </div>
      {error && <p className="mt-5 text-sm text-red-400">{error}</p>}
      <div className="sticky bottom-0 left-0 right-0 mt-8 -mx-6 border-t border-white/10 bg-[#111111]/95 p-4 backdrop-blur md:static md:m-0 md:border-0 md:bg-transparent md:p-0"><div className="flex items-center justify-between gap-3"><button type="button" onClick={onBack} disabled={step===1 || isSubmitting} className="rounded-full border border-[#3a3d37] px-5 py-2 text-sm font-medium text-stone-200 disabled:cursor-not-allowed disabled:opacity-40">Back</button>{step<totalSteps ? <button type="button" onClick={onNext} disabled={isSubmitting} className="rounded-full bg-[#8e9a7f] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">Continue</button> : <button type="submit" disabled={isSubmitting} className="rounded-full bg-[#8e9a7f] px-6 py-3 text-sm font-semibold text-[#111111] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40">{isSubmitting ? 'Submitting...' : 'Submit onboarding'}</button>}</div></div>
    </form>
  );
}
