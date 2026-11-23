import { useState } from 'react';
import { Landmark, Loader2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { banks, bankTransactions, type Bank } from './open-finance';
import { useFinance } from './provider';
export function OpenFinanceModal({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { addTransaction } = useFinance();
  const [bank, setBank] = useState<Bank | null>(null);
  const [step, setStep] = useState<'pick' | 'consent' | 'loading' | 'done'>('pick');
  const authorize = () => { if (!bank) return; setStep('loading'); setTimeout(() => { bankTransactions(bank).forEach(t => void addTransaction(t)); setStep('done'); }, 1500); };
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent>
    <DialogHeader><DialogTitle>Conectar banco · Open Finance</DialogTitle><DialogDescription>Simulação do fluxo oficial de compartilhamento de dados.</DialogDescription></DialogHeader>
    {step === 'pick' && <div className="grid gap-2">{banks.map(b => <Button key={b} variant="outline" className="justify-start" onClick={() => { setBank(b); setStep('consent'); }}><Landmark />{b}</Button>)}</div>}
    {step === 'consent' && <div className="grid gap-3 text-sm"><p>O <b>VERBA</b> solicita acesso aos seus dados no <b>{bank}</b>:</p><ul className="list-disc pl-5 text-muted-foreground"><li>Saldos e extratos da conta</li><li>Dados cadastrais básicos</li><li>Validade: 12 meses</li></ul><p className="flex items-center gap-2 text-muted-foreground"><ShieldCheck size={14} />Você pode revogar o consentimento a qualquer momento.</p><div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setStep('pick')}>Voltar</Button><Button onClick={authorize}>Autorizar</Button></div></div>}
    {step === 'loading' && <p className="flex items-center gap-2 py-6 justify-center"><Loader2 className="animate-spin" />Conectando ao {bank}...</p>}
    {step === 'done' && <div className="grid gap-3 text-center py-4"><CheckCircle2 className="mx-auto text-income" size={36} /><p>{bank} conectado! 4 movimentos importados.</p><Button onClick={() => onOpenChange(false)}>Concluir</Button></div>}
  </DialogContent></Dialog>;
}
