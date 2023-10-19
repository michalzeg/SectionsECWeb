export function isInteger(str: string | number): boolean {

  const input = str as string;
  const parsed = parseInt(input, 10);
  const result = str == String(parsed);
  return result;
}
