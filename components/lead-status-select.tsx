'use client';

import { useState } from 'react';
import { LEAD_STATUS_OPTIONS, type LeadStatus } from '@/lib/lead-validation';

export default function LeadStatusSelect({ leadId, initialStatus }: { leadId: string; initialStatus: LeadStatus }) {
  const [status, setStatus] = useState<LeadStatus>(initialStatus);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const onSave = async () => {
    setSaving(true);
    setError('');

    const response = await fetch(`/api/admin/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      setError('Failed to save');
      setSaving(false);
      return;
    }

    setSaving(false);
  };

  return (
    <div className="flex items-center gap-2">
      <select className="rounded-md border border-white/20 bg-zinc-900 px-2 py-1 text-xs text-white" value={status} onChange={(event) => setStatus(event.target.value as LeadStatus)} disabled={saving}>
        {LEAD_STATUS_OPTIONS.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button type="button" onClick={onSave} disabled={saving} className="rounded-md border border-white/20 px-2 py-1 text-xs text-zinc-200">{saving ? 'Saving...' : 'Save'}</button>
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </div>
  );
}
