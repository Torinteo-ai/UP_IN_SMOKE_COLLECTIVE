import EligibilityForm from '@/components/eligibility-form';

export default function EligibilityPage() {
  return (
    <main className="relative min-h-screen bg-grain pb-14 pt-10 md:pb-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,255,191,0.12),transparent_45%)]" />
      </div>

      <section className="section-shell relative">
        <div className="mb-10 max-w-3xl">
          <a href="/" className="text-xs uppercase tracking-[0.2em] text-zinc-400 transition hover:text-emeraldGlow">← Back to home</a>
          <p className="mt-6 text-xs uppercase tracking-[0.25em] text-zinc-400">Eligibility + Lead Capture</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">Start your onboarding journey.</h1>
          <p className="mt-5 text-zinc-300">Complete this short flow to check eligibility, submit key details, and confirm whether you want a consultation with a licensed UK clinical partner.</p>
        </div>

        <EligibilityForm />
      </section>
    </main>
  );
}
