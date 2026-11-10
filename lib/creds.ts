/** Validates the {email, password} body shared by signup and login. */
export function parseCreds(body: unknown): { email: string; password: string } | { error: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  const password = typeof b.password === 'string' ? b.password : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { error: 'bad_email' };
  if (password.length < 8 || password.length > 200) return { error: 'weak_password' };
  return { email, password };
}
