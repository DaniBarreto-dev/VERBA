import { describe, expect, it } from 'vitest';
import { bankTransactions } from './open-finance';
import { totals } from './model';
describe('open finance simulado', () => {
  it('importa 4 movimentos do Nubank com saldo líquido de 157,70', () => {
    const items = bankTransactions('Nubank');
    expect(items).toHaveLength(4);
    expect(totals(items.map((t, i) => ({ ...t, id: String(i) }))).balance).toBeCloseTo(157.7);
  });
});
