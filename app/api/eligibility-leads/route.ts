import { apiError, apiSuccess } from '@/lib/api-response';
import { createSupabaseAdminClient } from '@/lib/supabase';
import { parseEligibilityLead } from '@/lib/lead-validation';
import { applyBasicRateLimit } from '@/lib/rate-limit';

export async function POST(request: Request) {
  const forwardedFor = request.headers.get('x-forwarded-for') ?? '';
  const ip = forwardedFor.split(',')[0]?.trim() || 'unknown';
  const rateLimit = applyBasicRateLimit(`eligibility:${ip}`, 60_000, 10);

  if (!rateLimit.allowed) {
    return apiError('RATE_LIMITED', 'Too many submissions. Please try again shortly.', 429, {
      retryAfterSec: rateLimit.retryAfterSec,
    });
  }

  const body = await request.json().catch(() => null);
  const { data, error } = parseEligibilityLead(body);

  if (error || !data) {
    return apiError('BAD_REQUEST', error ?? 'Invalid submission.', 400);
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
    return apiError('INTERNAL_ERROR', 'Unable to save your submission right now.', 500);
  }

  return apiSuccess({ submitted: true });
}
