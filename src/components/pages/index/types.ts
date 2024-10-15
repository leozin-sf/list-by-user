export function supaString(input: string | undefined): string {
  if (input === undefined) {
    throw new Error('Variável de ambiente necessária não definida.');
  }
  return input;
}
