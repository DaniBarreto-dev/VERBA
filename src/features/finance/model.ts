export type Transaction = { id: string; description: string; category: string; date: string; amount: number; type: 'income' | 'expense' };
export const expenseCategories = ['Alimentação', 'Moradia', 'Transporte', 'Lazer', 'Educação'];
export const initialTransactions: Transaction[] = [
  { id: '1', description: 'Salário mensal', category: 'Salário', date: '2026-11-05', amount: 5500, type: 'income' },
  { id: '2', description: 'Projeto freelance', category: 'Freelance', date: '2026-11-12', amount: 1200, type: 'income' },
  { id: '3', description: 'Aluguel do apartamento', category: 'Moradia', date: '2026-11-10', amount: 1500, type: 'expense' },
  { id: '4', description: 'Compras no supermercado', category: 'Alimentação', date: '2026-11-14', amount: 420.5, type: 'expense' },
  { id: '5', description: 'Combustível', category: 'Transporte', date: '2026-11-15', amount: 180, type: 'expense' },
  { id: '6', description: 'Cinema e jantar', category: 'Lazer', date: '2026-11-16', amount: 150, type: 'expense' },
  { id: '7', description: 'Curso de inglês', category: 'Educação', date: '2026-11-17', amount: 280, type: 'expense' },
  { id: '8', description: 'Almoço no restaurante', category: 'Alimentação', date: '2026-11-18', amount: 65, type: 'expense' },
];
export const currency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
export function totals(transactions: Transaction[]) {
  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  return { income, expense, balance: income - expense };
}
export function categoryTotals(transactions: Transaction[]) {
  return expenseCategories.map((name, index) => ({ name, value: transactions.filter(t => t.type === 'expense' && t.category === name).reduce((sum, t) => sum + t.amount, 0), color: `var(--category-${index + 1})` })).filter(c => c.value > 0);
}
const history = [ { month: 'Jun', income: 5100, expense: 3200 }, { month: 'Jul', income: 5800, expense: 3700 }, { month: 'Ago', income: 5400, expense: 2900 }, { month: 'Set', income: 6200, expense: 4100 }, { month: 'Out', income: 5900, expense: 3400 } ];
export function monthlyTotals(transactions: Transaction[]) { const current = totals(transactions.filter(t => t.date.startsWith('2026-11'))); return [...history, { month: 'Nov', income: current.income, expense: current.expense }]; }
