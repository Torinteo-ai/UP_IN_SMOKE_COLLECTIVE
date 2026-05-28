import Logo from '@/components/logo';

const pathways = [
  {
    title: 'Clinical Eligibility Review',
    body: 'Start with a focused intake designed for UK patients seeking clinician-reviewed wellness support.',
  },
  {
    title: 'Partner Clinic Consultation',
    body: 'If appropriate, you are matched to licensed professionals for independent assessment and guidance.',
  },
  {
    title: 'Ongoing Wellness Direction',
    body: 'Receive a measured, responsible pathway with education and practical next-step clarity.',
  },
];

export default function HomePage() {
  return (
    <main className="brand-surface min-h-screen">
      <header className="brand-nav">
        <div className="section-shell flex h-20 items-center justify-between gap-4">
          <a href="#top" aria-label="UP IN SMOKE home">
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 text-sm text-stone-300 md:flex">
            <a href="#pathway" className="brand-link">Pathway</a>
            <a href="#standards" className="brand-link">Standards</a>
            <a href="#begin" className="brand-link">Begin</a>
          </nav>
          <a href="/eligibility" className="brand-cta">Check Eligibility</a>
        </div>
      </header>

      <section id="top" className="section-shell relative py-20 md:py-28">
        <div className="brand-smoke brand-smoke-a" />
        <div className="brand-smoke brand-smoke-b" />
        <p className="brand-kicker">Medical Wellness & Smoke-Culture Collective</p>
        <h1 className="max-w-4xl text-4xl font-medium leading-tight text-[#efe7d7] md:text-6xl">
          A boutique gateway for responsible, clinician-led cannabis wellness pathways.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-stone-300">
          UP IN SMOKE COLLECTIVE blends premium lounge sensibility with medical professionalism for eligible UK patients.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a href="/eligibility" className="brand-cta">Start Eligibility</a>
          <a href="#standards" className="brand-ghost-btn">View Care Standards</a>
        </div>
      </section>

      <section id="pathway" className="section-shell pb-20">
        <div className="grid gap-5 md:grid-cols-3">
          {pathways.map((item) => (
            <article key={item.title} className="brand-panel p-6">
              <h2 className="text-xl font-medium text-[#efe7d7]">{item.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-stone-300">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="standards" className="section-shell pb-20">
        <div className="brand-panel rounded-[2rem] p-8 md:p-12">
          <h2 className="text-3xl font-medium text-[#efe7d7]">Independent clinical standards, always.</h2>
          <p className="mt-5 max-w-3xl text-stone-300">
            We do not prescribe or dispense. All treatment decisions are made by licensed UK clinicians and regulated partner providers after independent review.
          </p>
        </div>
      </section>

      <section id="begin" className="section-shell pb-24">
        <div className="brand-panel p-8 md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-3xl font-medium text-[#efe7d7]">Begin your private intake.</h2>
              <p className="mt-4 max-w-xl text-stone-300">Complete the eligibility flow in minutes. If suitable, consultation options are presented next.</p>
            </div>
            <a href="/eligibility" className="brand-cta">Go to Eligibility</a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#31342f] py-10">
        <div className="section-shell flex flex-col gap-4 text-stone-400 md:flex-row md:items-center md:justify-between">
          <Logo showWordmark={false} />
          <p className="max-w-2xl text-sm">UP IN SMOKE COLLECTIVE · Consultations and prescribing decisions remain under licensed UK healthcare professionals.</p>
        </div>
      </footer>
    </main>
  );
}
