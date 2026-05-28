const steps = [
  'Complete a quick eligibility check in under 2 minutes.',
  'Book a consultation with a licensed UK clinic partner.',
  'Receive clinician-led guidance and tailored treatment planning.',
];

const reasons = [
  'Trusted UK clinical network',
  'Clear, private digital journey',
  'Professional patient-first support',
  'Designed for long-term wellness outcomes',
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-grain">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,255,191,0.12),transparent_45%)]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink/80 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between">
          <a href="#top" className="text-sm font-semibold tracking-[0.2em] text-emeraldGlow">
            UP IN SMOKE
          </a>
          <nav className="hidden gap-6 text-sm text-zinc-300 md:flex">
            <a href="#how-it-works" className="transition hover:text-emeraldGlow">How it works</a>
            <a href="#eligibility" className="transition hover:text-emeraldGlow">Eligibility</a>
            <a href="#community" className="transition hover:text-emeraldGlow">Community</a>
          </nav>
          <a href="#cta" className="rounded-full border border-emeraldGlow/40 px-4 py-2 text-sm font-medium text-emeraldGlow transition hover:bg-emeraldGlow/10">
            Book Consultation
          </a>
        </div>
      </header>

      <section id="top" className="section-shell relative pb-20 pt-20 md:pt-28">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-400">UK Medical Wellness Platform</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          Premium access to professional telehealth-guided wellness support.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-300">
          Built for eligible UK patients seeking a refined, secure, and clinician-led journey with trusted licensed partners.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="#eligibility" className="animate-pulseGlow rounded-full bg-emeraldGlow px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Check Eligibility</a>
          <a href="#cta" className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-emeraldGlow/50 hover:text-emeraldGlow">Book Consultation</a>
        </div>
      </section>

      <section id="how-it-works" className="section-shell pb-20">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step} className="glass-card animate-float p-6" style={{ animationDelay: `${index * 0.2}s` }}>
              <p className="text-xs uppercase tracking-[0.2em] text-emeraldGlow">Step {index + 1}</p>
              <p className="mt-3 text-zinc-200">{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="eligibility" className="section-shell pb-20">
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Who may be eligible?</h2>
          <p className="mt-4 max-w-3xl text-zinc-300">
            Eligibility is reviewed by independent clinicians based on your health history and treatment needs. Conditions may include chronic pain, anxiety, PTSD, insomnia, ADHD, and other clinician-assessed cases.
          </p>
          <a href="#cta" className="mt-8 inline-flex rounded-full bg-emeraldGlow px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Check Eligibility</a>
        </div>
      </section>

      <section className="section-shell pb-20">
        <h2 className="text-2xl font-semibold text-white md:text-3xl">Why choose us</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div key={reason} className="glass-card p-5 text-zinc-200">{reason}</div>
          ))}
        </div>
      </section>

      <section id="community" className="section-shell pb-20">
        <div className="glass-card p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Join the community</h2>
          <p className="mt-4 text-zinc-300">Access wellness education, responsible patient guidance, and updates from our partner ecosystem.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#" className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-100 transition hover:border-emeraldGlow/50 hover:text-emeraldGlow">Join Community</a>
            <a href="#" className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-100 transition hover:border-emeraldGlow/50 hover:text-emeraldGlow">Telegram</a>
            <a href="#" className="rounded-full border border-zinc-700 px-5 py-2 text-sm text-zinc-100 transition hover:border-emeraldGlow/50 hover:text-emeraldGlow">Discord</a>
          </div>
        </div>
      </section>

      <section id="cta" className="section-shell pb-28">
        <div className="glass-card p-8 text-center md:p-12">
          <h2 className="text-3xl font-semibold text-white">Ready to begin your wellness journey?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-300">Start with a quick eligibility check or secure a professional consultation through our UK clinical network.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="#" className="rounded-full bg-emeraldGlow px-6 py-3 text-sm font-semibold text-ink transition hover:brightness-110">Check Eligibility</a>
            <a href="#" className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-emeraldGlow/50 hover:text-emeraldGlow">Book Consultation</a>
            <a href="#community" className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-emeraldGlow/50 hover:text-emeraldGlow">Join Community</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 pb-24 pt-10">
        <div className="section-shell text-sm text-zinc-400">
          <p>We do not prescribe, dispense, or supply medical cannabis products.</p>
          <p className="mt-2">All consultations, prescribing decisions, and dispensing activities are handled exclusively by licensed UK healthcare professionals and regulated partner clinics/pharmacies.</p>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-emeraldGlow/20 bg-ink/95 p-3 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-2">
          <a href="#eligibility" className="rounded-full bg-emeraldGlow px-4 py-3 text-center text-xs font-semibold text-ink">Check Eligibility</a>
          <a href="#cta" className="rounded-full border border-emeraldGlow/50 px-4 py-3 text-center text-xs font-semibold text-emeraldGlow">Book Consultation</a>
        </div>
      </div>
    </main>
  );
}
