import { createSupabaseAdminClient } from '@/lib/supabase';
import LeadStatusSelect from '@/components/lead-status-select';
import { LEAD_STATUS_OPTIONS, type LeadStatus } from '@/lib/lead-validation';

type Lead = {
  id: string;
  first_name: string | null;
  email: string | null;
  condition_category: string | null;
  consultation_interest: string | null;
  created_at: string;
  status: LeadStatus | null;
};

const formatDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
};

function StatusBadge({ status }: { status: LeadStatus }) {
  const toneMap: Record<LeadStatus, string> = {
    New: 'border-emeraldGlow/50 bg-emeraldGlow/10 text-emeraldGlow',
    Contacted: 'border-sky-400/40 bg-sky-400/10 text-sky-300',
    Approved: 'border-violet-400/40 bg-violet-400/10 text-violet-300',
    Closed: 'border-zinc-500/40 bg-zinc-500/10 text-zinc-300',
  };

  return <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${toneMap[status]}`}>{status}</span>;
}

export default async function AdminLeadsPage() {
  const supabaseAdmin = createSupabaseAdminClient();

  const { data, error } = await supabaseAdmin
    .from('eligibility_leads')
    .select('id, first_name, email, condition_category, consultation_interest, created_at, status')
    .order('created_at', { ascending: false });

  const leads: Lead[] = data ?? [];

  return (
    <main className="section-shell py-10 md:py-14">
      <div className="glass-card p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-white/10 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">Internal Admin</p>
            <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">Onboarding Leads</h1>
          </div>
          <p className="text-sm text-zinc-400">{leads.length} lead{leads.length === 1 ? '' : 's'}</p>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">Could not load leads right now. Please refresh and try again.</div>
        ) : leads.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-8 text-center text-zinc-300">No onboarding submissions yet.</div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => {
              const status = LEAD_STATUS_OPTIONS.includes((lead.status ?? 'New') as LeadStatus) ? (lead.status as LeadStatus) : 'New';

              return (
                <article key={lead.id} className="rounded-xl border border-white/10 bg-zinc-950/50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs uppercase tracking-[0.12em] text-zinc-400">Submitted {formatDate(lead.created_at)}</p>
                    <StatusBadge status={status} />
                  </div>
                  <h2 className="mt-2 text-lg font-semibold text-white">{lead.first_name || 'Unnamed lead'}</h2>
                  <dl className="mt-3 space-y-2 text-sm">
                    <div><dt className="text-zinc-400">Email</dt><dd className="text-zinc-200">{lead.email || '—'}</dd></div>
                    <div><dt className="text-zinc-400">Condition</dt><dd className="text-zinc-200">{lead.condition_category || '—'}</dd></div>
                    <div><dt className="text-zinc-400">Consultation</dt><dd className="text-zinc-200">{lead.consultation_interest || '—'}</dd></div>
                  </dl>
                  <div className="mt-4">
                    <LeadStatusSelect leadId={lead.id} initialStatus={status} />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
