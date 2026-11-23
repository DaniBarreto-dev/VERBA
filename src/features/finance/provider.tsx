import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Transaction } from './model';
type NewTx = Omit<Transaction, 'id'> & { source_bank?: string };
const FinanceContext = createContext<{
  ready: boolean; signedIn: boolean; signOut: () => Promise<void>;
  name: string; dark: boolean; setDark: (value: boolean) => void;
  transactions: Transaction[]; addTransaction: (value: NewTx) => Promise<void>; deleteTransaction: (id: string) => Promise<void>;
} | null>(null);
const toTx = (r: { id: string; description: string; category: string; date: string; amount: number; type: string }): Transaction => ({ id: r.id, description: r.description, category: r.category, date: r.date, amount: Number(r.amount), type: r.type as Transaction['type'] });
export function FinanceProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState('Aluno');
  const [dark, setDark] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => { setUserId(session?.user.id ?? null); setReady(true); });
    supabase.auth.getSession().then(({ data }) => { setUserId(data.session?.user.id ?? null); setReady(true); });
    return () => data.subscription.unsubscribe();
  }, []);
  useEffect(() => {
    if (!userId) { setTransactions([]); return; }
    supabase.from('transactions').select('*').order('date', { ascending: false }).then(({ data }) => setTransactions((data ?? []).map(toTx)));
    supabase.from('profiles').select('name').eq('id', userId).maybeSingle().then(({ data }) => setName(data?.name || 'Aluno'));
  }, [userId]);
  return <FinanceContext.Provider value={{ ready, signedIn: !!userId, name, dark, setDark, transactions,
    signOut: async () => { await supabase.auth.signOut(); },
    addTransaction: async value => { const { data, error } = await supabase.from('transactions').insert(value).select().single(); if (!error && data) setTransactions(items => [toTx(data), ...items]); },
    deleteTransaction: async id => { const { error } = await supabase.from('transactions').delete().eq('id', id); if (!error) setTransactions(items => items.filter(t => t.id !== id)); },
  }}><div className={dark ? 'dark app-theme' : 'app-theme'}>{children}</div></FinanceContext.Provider>;
}
export function useFinance() { const context = useContext(FinanceContext); if (!context) throw new Error('FinanceProvider is required'); return context; }
