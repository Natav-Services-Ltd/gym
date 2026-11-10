export const validDocId = (id: unknown): id is string =>
  typeof id === 'string' && /^(settings|active|s-[\w-]{1,80})$/.test(id);
