import { createFileRoute, Navigate, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, CalendarDays, ChevronDown, CircleHelp, GraduationCap, House, LogOut, Moon, Plus, Search, ShieldCheck, ShoppingBasket, Sun, Trash2, Utensils, Wallet, Car, Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Brand } from '@/features/finance/brand';
import { useFinance } from '@/features/finance/provider';
import { currency, totals, type Transaction } from '@/features/finance/model';
import { FinanceCharts } from '@/features/finance/charts';
import { TransactionModal } from '@/features/finance/transaction-modal';
import { OpenFinanceModal } from '@/features/finance/open-finance-modal';
import { Landmark } from 'lucide-react';
export const Route = createFileRoute('/dashboard')({
 head: () => ({ meta: [{ title: 'Visão geral | VERBA — Seu painel financeiro' }, { name: 'description', content: 'Acompanhe saldo, entradas, saídas e gastos por categoria no seu painel financeiro VERBA.' }, { property: 'og:title', content: 'Visão geral | VERBA' }, { property: 'og:description', content: 'Seu dinheiro em perspectiva. Acompanhe cada movimento com o VERBA.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
 component: Dashboard,
});
function Dashboard() {
 const { ready, signedIn, signOut, dark, setDark, transactions, deleteTransaction, name } = useFinance();
 const navigate = useNavigate();
 const [modal, setModal] = useState(false); const [bankModal, setBankModal] = useState(false);
 const [filter, setFilter] = useState<'all' | Transaction['type']>('all');
 const [search, setSearch] = useState('');
 const summary = totals(transactions);
 const visible = transactions.filter(t => (filter === 'all' || t.type === filter) && t.description.toLocaleLowerCase('pt-BR').includes(search.toLocaleLowerCase('pt-BR'))).sort((a, b) => b.date.localeCompare(a.date));
 if (!ready) return null;
 if (!signedIn) return <Navigate to="/" />;
 const summaries = [ { title: 'Saldo atual', value: summary.balance, icon: Wallet, kind: 'balance', foot: 'Seu saldo disponível', count: undefined }, { title: 'Total de entradas', value: summary.income, icon: ArrowDownLeft, kind: 'income', foot: 'receitas registradas', count: transactions.filter(t => t.type === 'income').length }, { title: 'Total de saídas', value: summary.expense, icon: ArrowUpRight, kind: 'expense', foot: 'despesas registradas', count: transactions.filter(t => t.type === 'expense').length } ];
 return <><header className="topbar"><div className="topbar-inner"><div className="flex items-center"><Brand /><span className="brand-divider" /><span className="small-label header-subtitle">Finanças pessoais</span></div><div className="header-actions"><Button variant="ghost" size="icon" aria-label={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} title={dark ? 'Ativar tema claro' : 'Ativar tema escuro'} onClick={() => setDark(!dark)}>{dark ? <Sun /> : <Moon />}</Button><Button variant="outline" onClick={() => setBankModal(true)}><Landmark />Conectar banco</Button><Button className="new-transaction-header" onClick={() => setModal(true)}><Plus />Nova transação</Button><span className="brand-divider !mx-0" /><div className="profile-avatar">{name.slice(0, 2).toUpperCase()}</div><Button variant="ghost" onClick={async () => { await signOut(); navigate({ to: '/', replace: true }); }} aria-label="Sair" title="Sair"><LogOut /><span className="logout-text">Sair</span></Button></div></div></header>
 <main className="dashboard"><div className="page-heading"><div><h1>Visão geral</h1><p>Olá, {name.split(' ')[0]}. Vamos cuidar dos seus próximos passos?</p></div><div className="period"><CalendarDays size={15} />Novembro, 2026</div></div>
 <section className="summary-grid" aria-label="Resumo financeiro">{summaries.map(s => <div key={s.kind} className={`summary-card ${s.kind}`}><div className="summary-head"><span>{s.title}</span><span className="summary-icon"><s.icon size={20} /></span></div><div className="summary-amount">{currency(s.value)}</div><div className="summary-foot">{s.count !== undefined ? <><span className={s.kind === 'income' ? 'text-income' : 'text-expense'}>{s.count}</span> {s.foot}</> : <span className="flex items-center gap-1.5"><span className="category-dot bg-balance" />{s.foot}</span>}</div></div>)}</section>
 <FinanceCharts transactions={transactions} />
 <section className="transactions-section"><div className="transactions-title"><h2>Suas transações</h2><span className="count-pill">{transactions.length} registros</span></div><div className="table-shell"><div className="table-tools"><div className="filter-tabs" role="tablist" aria-label="Filtrar transações">{([{ key: 'all', label: 'Todas' }, { key: 'income', label: 'Entradas' }, { key: 'expense', label: 'Saídas' }] as const).map(f => <Button key={f.key} variant="ghost" size="sm" role="tab" aria-selected={filter === f.key} className={filter === f.key ? 'active' : ''} onClick={() => setFilter(f.key)}>{f.key === 'income' ? <ArrowDownLeft /> : f.key === 'expense' ? <ArrowUpRight /> : null}{f.label}</Button>)}</div><div className="search-box"><Search /><Input placeholder="Buscar transação..." aria-label="Buscar por descrição" value={search} onChange={e => setSearch(e.target.value)} /></div></div>
 <div className="table-scroll"><table className="transaction-table"><thead><tr><th>Descrição</th><th>Categoria</th><th>Data</th><th className="value-cell">Valor</th><th><span className="sr-only">Ações</span></th></tr></thead><tbody>{visible.map(t => { const CategoryIcon = t.type === 'income' ? ArrowDownLeft : ({ 'Moradia': House, 'Alimentação': t.id === '8' ? Utensils : ShoppingBasket, 'Transporte': Car, 'Lazer': Clapperboard, 'Educação': GraduationCap }[t.category] || Wallet); return <tr key={t.id}><td><div className="transaction-description"><span className={`transaction-icon ${t.type}`}><CategoryIcon size={15} /></span>{t.description}</div></td><td><span className={`category-tag tag-${t.category}`}>{t.category}</span></td><td className="text-muted-foreground">{t.date.split('-').reverse().join('/')}</td><td className={`value-cell ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>{t.type === 'income' ? '+' : '−'} {currency(t.amount)}</td><td className="w-14"><Button size="icon" variant="ghost" className="text-muted-foreground hover:text-destructive" aria-label={`Excluir ${t.description}`} title={`Excluir ${t.description}`} onClick={() => deleteTransaction(t.id)}><Trash2 size={15} /></Button></td></tr>; })}</tbody></table></div>{!visible.length && <div className="empty-state">Nenhuma transação encontrada.</div>}<div className="table-footer">Mostrando {visible.length} de {transactions.length} transações</div></div></section>
 <footer className="dashboard-footer"><span>© 2026 VERBA. Um novo olhar para suas finanças.</span><span><ShieldCheck size={13} />Open Finance em modo de demonstração · Dados fictícios</span></footer></main>
 <OpenFinanceModal key={bankModal ? "bo" : "bc"} open={bankModal} onOpenChange={setBankModal} />
<TransactionModal key={modal ? 'open' : 'closed'} open={modal} onOpenChange={setModal} />
 </>;
}
