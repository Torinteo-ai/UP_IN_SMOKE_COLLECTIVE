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
  add column if not exists status text;

update public.eligibility_leads
set status = 'New'
where status is null;

alter table public.eligibility_leads
  alter column status set default 'New',
  alter column status set not null;

alter table public.eligibility_leads
  drop constraint if exists eligibility_leads_status_check;

alter table public.eligibility_leads
  add constraint eligibility_leads_status_check
  check (status in ('New', 'Contacted', 'Approved', 'Closed'));
