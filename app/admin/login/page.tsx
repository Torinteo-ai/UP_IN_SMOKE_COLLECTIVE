import { redirect } from 'next/navigation';
import AdminLoginForm from '@/components/admin-login-form';
import Logo from '@/components/logo';
import { getAdminUser } from '@/lib/admin-auth';

export default async function AdminLoginPage() {
  const user = await getAdminUser();

  if (user) redirect('/admin');

  return (
    <main className="brand-surface min-h-screen py-10 md:py-16">
      <section className="section-shell">
        <a href="/" className="mb-10 inline-flex" aria-label="Back home">
          <Logo />
        </a>

        <div className="mx-auto mb-8 max-w-2xl text-center">
          <p className="brand-kicker">Private administration</p>
          <h1 className="mt-3 text-4xl font-medium text-[#efe7d7] md:text-5xl">Secure owner access</h1>
          <p className="mt-4 text-stone-300">Sign in to review and manage eligibility enquiries.</p>
        </div>

        <AdminLoginForm />
      </section>
    </main>
  );
}
