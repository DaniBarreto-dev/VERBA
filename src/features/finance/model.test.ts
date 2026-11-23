import { describe, expect, it } from 'vitest';
import { categoryTotals, initialTransactions, monthlyTotals, totals } from './model';
describe('VERBA financial rules', () => {
  it('starts with exactly eight transactions', () => { expect(initialTransactions).toHaveLength(8); });
  it('calculates balance from income minus expenses', () => { expect(totals(initialTransactions)).toEqual({ income: 6700, expense: 2595.5, balance: 4104.5 }); });
  it('updates totals when adding an expense', () => { expect(totals([...initialTransactions, { id: 'test', description: 'Compra', category: 'Alimentação', date: '2026-11-19', amount: 100, type: 'expense' }]).balance).toBe(4004.5); });
  it('updates totals when deleting income', () => { expect(totals(initialTransactions.filter(t => t.id !== '2')).income).toBe(5500); });
  it('aggregates expenses only by category', () => { expect(categoryTotals(initialTransactions).find(c => c.name === 'Alimentação')?.value).toBe(485.5); expect(categoryTotals(initialTransactions).reduce((sum, c) => sum + c.value, 0)).toBe(2595.5); });
  it('shows six months and derives November from transactions', () => { const months = monthlyTotals(initialTransactions); expect(months).toHaveLength(6); expect(months[5]).toEqual({ month: 'Nov', income: 6700, expense: 2595.5 }); });
});
