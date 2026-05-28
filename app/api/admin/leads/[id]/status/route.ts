import { NextResponse } from 'next/server';
import { createSupabaseAdminClient } from '@/lib/supabase';
import { parseLeadStatus } from '@/lib/lead-validation';

type RouteContext = { params: { id: string } };

export async function PATCH(request: Request, context: RouteContext) {
  const body = await request.json().catch(() => null);
  const { status, error } = parseLeadStatus(body);

  if (error || !status) {
    return NextResponse.json({ error: error ?? 'Invalid status.' }, { status: 400 });
  }

  const supabaseAdmin = createSupabaseAdminClient();
  const leadId = context.params.id;

  const { error: updateError } = await supabaseAdmin
    .from('eligibility_leads')
    .update({ status })
    .eq('id', leadId);

  if (updateError) {
    return NextResponse.json({ error: 'Unable to update lead status.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, status });
}
