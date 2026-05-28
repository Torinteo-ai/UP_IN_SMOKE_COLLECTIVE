import { apiError, apiSuccess } from '@/lib/api-response';
import { createSupabaseAdminClient } from '@/lib/supabase';
import { parseLeadStatus } from '@/lib/lead-validation';

type RouteContext = { params: { id: string } };

export async function PATCH(request: Request, context: RouteContext) {
  const body = await request.json().catch(() => null);
  const { status, error } = parseLeadStatus(body);

  if (error || !status) {
    return apiError('BAD_REQUEST', error ?? 'Invalid status.', 400);
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const leadId = context.params.id;

  const { data: existingLead, error: fetchError } = await supabaseAdmin
    .from('eligibility_leads')
    .select('id, status')
    .eq('id', leadId)
    .single();

  if (fetchError || !existingLead) {
    return apiError('NOT_FOUND', 'Lead not found.', 404);
  }

  const now = new Date().toISOString();
  const updatePayload: Record<string, string> = { status, updated_at: now };

  if (existingLead.status !== status) {
    updatePayload.status_updated_at = now;
  }

  const { error: updateError } = await supabaseAdmin.from('eligibility_leads').update(updatePayload).eq('id', leadId);

  if (updateError) {
    return apiError('INTERNAL_ERROR', 'Unable to update lead status.', 500);
  }

  await supabaseAdmin.from('lead_admin_activity').insert({
    lead_id: leadId,
    activity_type: 'status_change',
    previous_value: existingLead.status,
    new_value: status,
  });

  return apiSuccess({ status });
}
