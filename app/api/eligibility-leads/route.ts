import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';
import { parseEligibilityLead } from '@/lib/lead-validation';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { data, error } = parseEligibilityLead(body);

  if (error || !data) {
    return NextResponse.json({ error: error ?? 'Invalid submission.' }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdminClient();

  const { error: insertError } = await supabaseAdmin.from('eligibility_leads').insert({
    first_name: data.firstName,
    email: data.email,
    age_confirmed: data.ageConfirmed,
    uk_resident: data.ukResident,
    condition_category: data.conditionCategory,
    previous_treatments: data.previousTreatments,
    consultation_interest: data.consultationInterest,
    consent: data.consent,
    status: 'New',
  });

  if (insertError) {
    return NextResponse.json({ error: 'Unable to save your submission right now.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
