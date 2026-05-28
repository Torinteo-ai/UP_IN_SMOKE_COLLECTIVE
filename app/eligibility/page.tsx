import EligibilityForm from '@/components/eligibility-form';
import Logo from '@/components/logo';

export default function EligibilityPage() {
  return (
    <main className="brand-surface min-h-screen py-10 md:py-16">
      <section className="section-shell">
        <a href="/" className="mb-8 inline-flex" aria-label="Back home">
          <Logo />
        </a>

        <div className="brand-panel mb-8 rounded-[2rem] p-7 md:p-10">
          <p className="brand-kicker">Eligibility Intake</p>
          <h1 className="mt-3 text-4xl font-medium leading-tight text-[#efe7d7] md:text-5xl">Check suitability for a clinician consultation.</h1>
          <p className="mt-4 max-w-3xl text-stone-300">Share essential details for independent review. This intake supports a responsible, medical-wellness pathway and does not guarantee prescription approval.</p>
        </div>

        <EligibilityForm />
      </section>
    </main>
  );
}
