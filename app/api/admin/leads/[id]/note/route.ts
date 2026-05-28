import { apiError, apiSuccess } from '@/lib/api-response';
import { parseLeadNote } from '@/lib/lead-validation';
import { createSupabaseAdminClient } from '@/lib/supabase';

type RouteContext = { params: { id: string } };

export async function PATCH(request: Request, context: RouteContext) {
  const body = await request.json().catch(() => null);
  const { note, error } = parseLeadNote(body);

  if (error || note === undefined) {
    return apiError('BAD_REQUEST', error ?? 'Invalid note.', 400);
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const leadId = context.params.id;

  const { data: existingLead, error: fetchError } = await supabaseAdmin
    .from('eligibility_leads')
    .select('id, admin_note')
    .eq('id', leadId)
    .single();

  if (fetchError || !existingLead) {
    return apiError('NOT_FOUND', 'Lead not found.', 404);
  }

  const { error: updateError } = await supabaseAdmin
    .from('eligibility_leads')
    .update({ admin_note: note, updated_at: new Date().toISOString() })
    .eq('id', leadId);

  if (updateError) {
    return apiError('INTERNAL_ERROR', 'Unable to update lead note.', 500);
  }

  await supabaseAdmin.from('lead_admin_activity').insert({
    lead_id: leadId,
    activity_type: 'note_update',
    previous_value: existingLead.admin_note,
    new_value: note,
  });

  return apiSuccess({ note });
}
