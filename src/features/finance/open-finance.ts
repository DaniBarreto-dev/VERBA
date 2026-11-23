import type { Transaction } from './model';
export const banks = ['Nubank', 'Itaú', 'Bradesco', 'Banco do Brasil', 'Inter'] as const;
export type Bank = (typeof banks)[number];
const base: Omit<Transaction, 'id' | 'description'>[] = [
  { category: 'Alimentação', date: '2026-11-19', amount: 89.9, type: 'expense' },
  { category: 'Transporte', date: '2026-11-20', amount: 42.5, type: 'expense' },
  { category: 'Lazer', date: '2026-11-21', amount: 59.9, type: 'expense' },
  { category: 'Pix recebido', date: '2026-11-22', amount: 350, type: 'income' },
];
const labels = ['Mercado', 'Transporte por app', 'Assinatura de streaming', 'Pix recebido'];
export function bankTransactions(bank: Bank): Omit<Transaction, 'id'>[] {
  const factor = 1 + banks.indexOf(bank) * 0.1;
  return base.map((t, i) => ({ ...t, amount: Math.round(t.amount * factor * 100) / 100, description: `${labels[i]} · ${bank}` }));
}
