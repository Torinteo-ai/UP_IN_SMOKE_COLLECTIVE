'use client';

import { useEffect, useState } from 'react';
import LeadStatusSelect from '@/components/lead-status-select';
import LeadNoteEditor from '@/components/lead-note-editor';
import { LEAD_STATUS_OPTIONS, type LeadStatus } from '@/lib/lead-validation';

type Lead = {
  id: string;
  first_name: string | null;
  email: string | null;
  condition_category: string | null;
  consultation_interest: string | null;
  created_at: string;
  status: LeadStatus | null;
  admin_note: string | null;
  updated_at: string | null;
  status_updated_at: string | null;
};

const formatDate = (value: string | null) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' }).format(date);
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('');
  const [consultation, setConsultation] = useState('');
  const [createdFrom, setCreatedFrom] = useState('');
  const [createdTo, setCreatedTo] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError('');
      const params = new URLSearchParams({ page: String(page) });
      if (status) params.set('status', status);
      if (consultation) params.set('consultation', consultation);
      if (createdFrom) params.set('createdFrom', createdFrom);
      if (createdTo) params.set('createdTo', createdTo);
      if (q) params.set('q', q);

      const response = await fetch(`/api/admin/leads?${params.toString()}`);
      const json = await response.json();
      if (!response.ok || !json?.ok) {
        setError('Could not load leads right now.');
        setLoading(false);
        return;
      }
      setLeads(json.data.leads);
      setTotalPages(json.data.pagination.totalPages);
      setLoading(false);
    };
    load();
  }, [page, status, consultation, createdFrom, createdTo, q]);

  return <main className="section-shell py-10 md:py-14"><div className="glass-card p-6 md:p-8"><h1 className="mb-4 text-2xl font-semibold text-white md:text-3xl">Onboarding Leads</h1>
    <div className="mb-4 grid gap-2 md:grid-cols-5"><input placeholder="Search name/email" value={q} onChange={(e)=>{setPage(1);setQ(e.target.value);}} className="rounded border border-white/20 bg-zinc-900 px-2 py-1 text-sm text-white" />
    <select value={status} onChange={(e)=>{setPage(1);setStatus(e.target.value);}} className="rounded border border-white/20 bg-zinc-900 px-2 py-1 text-sm text-white"><option value="">All statuses</option>{LEAD_STATUS_OPTIONS.map(s=><option key={s} value={s}>{s}</option>)}</select>
    <input type="date" value={createdFrom} onChange={(e)=>{setPage(1);setCreatedFrom(e.target.value);}} className="rounded border border-white/20 bg-zinc-900 px-2 py-1 text-sm text-white" />
    <input type="date" value={createdTo} onChange={(e)=>{setPage(1);setCreatedTo(e.target.value);}} className="rounded border border-white/20 bg-zinc-900 px-2 py-1 text-sm text-white" />
    <select value={consultation} onChange={(e)=>{setPage(1);setConsultation(e.target.value);}} className="rounded border border-white/20 bg-zinc-900 px-2 py-1 text-sm text-white"><option value="">All consultation prefs</option><option value="Yes, I want a consultation">Yes</option><option value="Not right now">Not now</option></select></div>

    {loading ? <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-8 text-center text-zinc-300">Loading leads...</div> : error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error}</div> : leads.length===0 ? <div className="rounded-xl border border-white/10 bg-zinc-950/40 p-8 text-center text-zinc-300">No leads match current filters.</div> : <div className="space-y-4">{leads.map((lead)=>{const currentStatus = LEAD_STATUS_OPTIONS.includes((lead.status ?? 'New') as LeadStatus) ? (lead.status as LeadStatus) : 'New'; return <article key={lead.id} className="rounded-xl border border-white/10 bg-zinc-950/50 p-4"><p className="text-xs text-zinc-400">Submitted {formatDate(lead.created_at)}</p><h2 className="mt-1 text-lg font-semibold text-white">{lead.first_name || 'Unnamed lead'}</h2><p className="text-sm text-zinc-300">{lead.email || '—'}</p><p className="text-sm text-zinc-300">{lead.consultation_interest || '—'}</p><p className="text-xs text-zinc-500">Updated: {formatDate(lead.updated_at)} | Status updated: {formatDate(lead.status_updated_at)}</p><div className="mt-3"><LeadStatusSelect leadId={lead.id} initialStatus={currentStatus} /></div><div className="mt-3"><LeadNoteEditor leadId={lead.id} initialNote={lead.admin_note} /></div></article>;})}</div>}

    <div className="mt-6 flex items-center justify-between"><button disabled={page<=1} onClick={()=>setPage((p)=>Math.max(1,p-1))} className="rounded border border-white/20 px-3 py-1 text-xs text-white disabled:opacity-40">Previous</button><span className="text-xs text-zinc-400">Page {page} of {totalPages}</span><button disabled={page>=totalPages} onClick={()=>setPage((p)=>Math.min(totalPages,p+1))} className="rounded border border-white/20 px-3 py-1 text-xs text-white disabled:opacity-40">Next</button></div>
  </div></main>;
}
