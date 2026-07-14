import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSupabaseAdminClient } from '@/lib/supabase';

export const ADMIN_SESSION_COOKIE = 'uis_admin_session';

export async function getAdminUser() {
  const token = cookies().get(ADMIN_SESSION_COOKIE)?.value;

  if (!token) return null;

  const supabaseAdmin = createSupabaseAdminClient();
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) return null;

  const allowedEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const userEmail = data.user.email?.trim().toLowerCase();

  if (!allowedEmail || !userEmail || userEmail !== allowedEmail) return null;

  return data.user;
}

export async function requireAdminUser() {
  const user = await getAdminUser();

  if (!user) redirect('/admin/login');

  return user;
}
