export function hasPeriodKeyword(text: string): boolean {
  return /月经|例假|姨妈/.test(text);
}
