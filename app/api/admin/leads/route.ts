import { apiError, apiSuccess } from '@/lib/api-response';
import { createSupabaseAdminClient } from '@/lib/supabase';

const PAGE_SIZE = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.max(1, Number(searchParams.get('page') ?? '1'));
  const status = searchParams.get('status') ?? '';
  const consultation = searchParams.get('consultation') ?? '';
  const createdFrom = searchParams.get('createdFrom') ?? '';
  const createdTo = searchParams.get('createdTo') ?? '';
  const q = (searchParams.get('q') ?? '').trim();

  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const supabaseAdmin = createSupabaseAdminClient();
  let query = supabaseAdmin
    .from('eligibility_leads')
    .select('id, first_name, email, condition_category, consultation_interest, created_at, status, admin_note, updated_at, status_updated_at', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (status) query = query.eq('status', status);
  if (consultation) query = query.eq('consultation_interest', consultation);
  if (createdFrom) query = query.gte('created_at', createdFrom);
  if (createdTo) query = query.lte('created_at', `${createdTo}T23:59:59.999Z`);
  if (q) query = query.or(`first_name.ilike.%${q}%,email.ilike.%${q}%`);

  const { data, error, count } = await query;

  if (error) {
    return apiError('INTERNAL_ERROR', 'Could not load leads.', 500);
  }

  return apiSuccess({
    leads: data ?? [],
    pagination: {
      page,
      pageSize: PAGE_SIZE,
      total: count ?? 0,
      totalPages: Math.max(1, Math.ceil((count ?? 0) / PAGE_SIZE)),
    },
  });
}
