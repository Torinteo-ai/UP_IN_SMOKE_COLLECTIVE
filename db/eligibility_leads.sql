-- Existing table hardening for eligibility leads.
-- Run in Supabase SQL editor.

create table if not exists public.eligibility_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text,
  email text,
  age_confirmed boolean,
  uk_resident boolean,
  condition_category text,
  previous_treatments text,
  consultation_interest text,
  consent boolean,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Approved', 'Closed'))
);

alter table public.eligibility_leads
  add column if not exists status text,
  add column if not exists admin_note text,
  add column if not exists updated_at timestamptz not null default now(),
  add column if not exists status_updated_at timestamptz;

update public.eligibility_leads
set status = 'New',
    updated_at = coalesce(updated_at, created_at, now())
where status is null;

alter table public.eligibility_leads
  alter column status set default 'New',
  alter column status set not null,
  alter column updated_at set default now(),
  alter column updated_at set not null;

alter table public.eligibility_leads
  drop constraint if exists eligibility_leads_status_check;

alter table public.eligibility_leads
  add constraint eligibility_leads_status_check
  check (status in ('New', 'Contacted', 'Approved', 'Closed'));

create table if not exists public.lead_admin_activity (
  id bigserial primary key,
  lead_id uuid not null references public.eligibility_leads(id) on delete cascade,
  activity_type text not null check (activity_type in ('status_change', 'note_update')),
  previous_value text,
  new_value text,
  created_at timestamptz not null default now()
);

-- Safe index recommendations (keep concurrent for production traffic):
create index if not exists idx_eligibility_leads_created_at_desc on public.eligibility_leads (created_at desc);
create index if not exists idx_eligibility_leads_status_created_at on public.eligibility_leads (status, created_at desc);
create index if not exists idx_eligibility_leads_consultation_created_at on public.eligibility_leads (consultation_interest, created_at desc);
create index if not exists idx_eligibility_leads_email_lower on public.eligibility_leads (lower(email));
create index if not exists idx_eligibility_leads_first_name_lower on public.eligibility_leads (lower(first_name));
create index if not exists idx_lead_admin_activity_lead_id_created_at on public.lead_admin_activity (lead_id, created_at desc);
