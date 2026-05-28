'use client';

import { useState } from 'react';

export default function LeadNoteEditor({ leadId, initialNote }: { leadId: string; initialNote: string | null }) {
  const [note, setNote] = useState(initialNote ?? '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const save = async () => {
    setSaving(true);
    setMessage('');
    const response = await fetch(`/api/admin/leads/${leadId}/note`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ note }),
    });
    setSaving(false);
    setMessage(response.ok ? 'Saved' : 'Failed to save');
  };

  return (
    <div className="space-y-2">
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} className="w-full rounded-md border border-white/20 bg-zinc-900 p-2 text-xs text-white" placeholder="Add internal note..." />
      <div className="flex items-center gap-2">
        <button type="button" onClick={save} disabled={saving} className="rounded-md border border-white/20 px-2 py-1 text-xs text-zinc-200">{saving ? 'Saving...' : 'Save note'}</button>
        {message ? <span className="text-xs text-zinc-400">{message}</span> : null}
      </div>
    </div>
  );
}
