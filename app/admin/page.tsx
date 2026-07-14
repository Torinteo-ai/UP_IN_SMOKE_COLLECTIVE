import Logo from '@/components/logo';
import { requireAdminUser } from '@/lib/admin-auth';
import { createSupabaseAdminClient } from '@/lib/supabase';

type EligibilityLead = {
  id?: string | number;
  first_name?: string | null;
  email?: string | null;
  condition_category?: string | null;
  consultation_interest?: string | null;
  status?: string | null;
  created_at?: string | null;
};

function formatDate(value?: string | null) {
  if (!value) return 'Date unavailable';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

export default async function AdminDashboardPage() {
  const user = await requireAdminUser();
  const supabaseAdmin = createSupabaseAdminClient();
  const { data, error } = await supabaseAdmin
    .from('eligibility_leads')
    .select('*')
    .limit(100);

  const leads = (data ?? []) as EligibilityLead[];
  const newCount = leads.filter((lead) => (lead.status ?? 'New') === 'New').length;

  return (
    <main className="brand-surface min-h-screen py-8 md:py-12">
      <section className="section-shell">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#31342f] pb-7 md:flex-row md:items-center md:justify-between">
          <div>
            <Logo />
            <p className="mt-4 text-sm text-stone-400">Signed in as {user.email}</p>
          </div>
          <form action="/api/admin/logout" method="post">
            <button type="submit" className="brand-ghost-btn">Sign out</button>
          </form>
        </header>

        <div className="mb-8">
          <p className="brand-kicker">Owner dashboard</p>
          <h1 className="mt-3 text-4xl font-medium text-[#efe7d7]">Eligibility enquiries</h1>
          <p className="mt-3 max-w-2xl text-stone-300">This is the private list of applications submitted through the public eligibility form.</p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <article className="brand-panel p-6">
            <p className="text-sm text-stone-400">Total applications</p>
            <p className="mt-2 text-4xl font-semibold text-[#efe7d7]">{leads.length}</p>
          </article>
          <article className="brand-panel p-6">
            <p className="text-sm text-stone-400">New applications</p>
            <p className="mt-2 text-4xl font-semibold text-[#efe7d7]">{newCount}</p>
          </article>
        </div>

        {error ? (
          <div className="brand-panel p-6">
            <h2 className="text-xl font-medium text-[#efe7d7]">Applications could not be loaded</h2>
            <p className="mt-3 text-stone-300">Check the Supabase table and server environment configuration.</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="brand-panel p-8 text-center">
            <h2 className="text-2xl font-medium text-[#efe7d7]">No applications yet</h2>
            <p className="mt-3 text-stone-300">New eligibility submissions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-[1.5rem] border border-[#31342f] bg-[#171817]/90">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-[#31342f] bg-[#20221f] text-stone-400">
                  <tr>
                    <th className="px-5 py-4 font-medium">Applicant</th>
                    <th className="px-5 py-4 font-medium">Condition</th>
                    <th className="px-5 py-4 font-medium">Consultation</th>
                    <th className="px-5 py-4 font-medium">Status</th>
                    <th className="px-5 py-4 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2a2c28]">
                  {leads.map((lead, index) => (
                    <tr key={String(lead.id ?? `${lead.email}-${index}`)} className="text-stone-200">
                      <td className="px-5 py-4">
                        <p className="font-medium text-[#efe7d7]">{lead.first_name || 'Name unavailable'}</p>
                        <p className="mt-1 text-xs text-stone-400">{lead.email || 'Email unavailable'}</p>
                      </td>
                      <td className="px-5 py-4">{lead.condition_category || 'Not provided'}</td>
                      <td className="px-5 py-4">{lead.consultation_interest || 'Not provided'}</td>
                      <td className="px-5 py-4">
                        <span className="rounded-full border border-[#4a5045] bg-[#252922] px-3 py-1 text-xs text-[#cbd4c0]">
                          {lead.status || 'New'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-stone-400">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
