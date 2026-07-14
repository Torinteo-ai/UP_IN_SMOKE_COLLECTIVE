'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    const response = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const payload = await response.json().catch(() => null);

    if (!response.ok) {
      setError(payload?.error ?? 'Unable to sign in.');
      setIsSubmitting(false);
      return;
    }

    router.replace('/admin');
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="brand-panel mx-auto max-w-lg space-y-5 p-7 md:p-10">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-stone-300">Admin email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-[#3a3d37] bg-[#141414]/80 px-4 py-3 text-stone-100 outline-none transition focus:border-[#8e9a7f]"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-stone-300">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-xl border border-[#3a3d37] bg-[#141414]/80 px-4 py-3 text-stone-100 outline-none transition focus:border-[#8e9a7f]"
        />
      </div>

      {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="brand-cta w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Signing in…' : 'Sign in securely'}
      </button>
    </form>
  );
}
