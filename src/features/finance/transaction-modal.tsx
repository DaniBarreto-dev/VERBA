import { useState, type FormEvent } from 'react';
import { Plus, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { expenseCategories, type Transaction } from './model';
import { useFinance } from './provider';
export function TransactionModal({ open, onOpenChange }: { open: boolean; onOpenChange: (value: boolean) => void }) {
 const { addTransaction, dark } = useFinance();
 const [type, setType] = useState<Transaction['type']>('expense');
 const categories = type === 'expense' ? expenseCategories : ['Salário', 'Freelance', 'Outros'];
 function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); const data = new FormData(event.currentTarget); const amount = Number(data.get('amount')); if (!Number.isFinite(amount) || amount <= 0) return; addTransaction({ description: String(data.get('description')).trim(), amount, type, category: String(data.get('category')), date: String(data.get('date')) }); onOpenChange(false); }
 return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className={dark ? 'dark text-foreground' : 'text-foreground'}><DialogHeader><DialogTitle>Nova transação</DialogTitle><DialogDescription>Um novo movimento na sua vida financeira.</DialogDescription></DialogHeader>
  <form onSubmit={submit} className="form-fields mt-3"><label className="field">Descrição<Input name="description" required placeholder="Ex.: Compras no supermercado" maxLength={100} /></label>
   <label className="field">Valor (R$)<Input name="amount" type="number" required min="0.01" step="0.01" placeholder="0,00" inputMode="decimal" /></label>
   <div className="field"><span>Tipo</span><div className="grid grid-cols-2 gap-2"><Button type="button" variant={type === 'income' ? 'default' : 'outline'} onClick={() => setType('income')} aria-pressed={type === 'income'}><ArrowDownLeft />Entrada</Button><Button type="button" variant={type === 'expense' ? 'destructive' : 'outline'} onClick={() => setType('expense')} aria-pressed={type === 'expense'}><ArrowUpRight />Saída</Button></div></div>
   <div className="form-two-cols"><label className="field">Categoria<select key={type} name="category" className="form-select" required>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label className="field">Data<Input name="date" type="date" required defaultValue="2026-11-19" /></label></div>
   <div className="flex justify-end gap-2 mt-3"><Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button><Button type="submit"><Plus />Salvar transação</Button></div>
  </form>
 </DialogContent></Dialog>;
}
