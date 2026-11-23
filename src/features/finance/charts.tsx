import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { categoryTotals, currency, expenseCategories, monthlyTotals, totals, type Transaction } from './model';
export function FinanceCharts({ transactions }: { transactions: Transaction[] }) {
 const categories = categoryTotals(transactions); const { expense } = totals(transactions);
 return <section className="charts-grid" aria-label="Gráficos financeiros">
  <div className="chart-panel"><div className="panel-heading"><h2>Gastos por categoria</h2><span className="small-label">Novembro</span></div><p className="panel-subtitle">Entenda para onde seu dinheiro vai</p>
   <div className="donut-layout"><div className="donut-wrap">
    {categories.length ? <ResponsiveContainer width="100%" height="100%"><PieChart><Pie isAnimationActive={false} data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={4} stroke="none" startAngle={90} endAngle={-270}>{categories.map(c => <Cell key={c.name} fill={c.color} />)}</Pie><Tooltip formatter={(value: number) => currency(value)} contentStyle={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} /></PieChart></ResponsiveContainer> : <div className="empty-state">Sem gastos</div>}
    <div className="donut-center"><span>Total de saídas</span><strong>{currency(expense)}</strong></div>
   </div><div className="category-legend">{categories.map(c => <div key={c.name} className="category-item"><span className="category-name"><i className={`category-dot category-${expenseCategories.indexOf(c.name) + 1}`} />{c.name}</span><span className="category-number">{currency(c.value)}<small>{Math.round(c.value / expense * 100)}%</small></span></div>)}</div></div>
  </div>
  <div className="chart-panel"><div className="panel-heading"><h2>Entradas vs. saídas</h2><div className="chart-key"><span><i className="bg-income" />Entradas</span><span><i className="bg-expense" />Saídas</span></div></div><p className="panel-subtitle">Seu movimento financeiro nos últimos 6 meses</p>
   <div className="bar-wrap"><ResponsiveContainer width="100%" height="100%"><BarChart data={monthlyTotals(transactions)} barGap={5} margin={{ top: 10, right: 0, left: -12, bottom: 0 }}><CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 4" /><XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 11 }} dy={10} /><YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} tickFormatter={value => value === 0 ? 'R$ 0' : `${Number(value) / 1000} mil`} ticks={[0, 2000, 4000, 6000, 8000]} /><Tooltip cursor={{ fill: 'var(--muted)' }} formatter={(value: number) => currency(value)} contentStyle={{ background: 'var(--card)', borderColor: 'var(--border)', color: 'var(--foreground)' }} /><Bar dataKey="income" name="Entradas" fill="var(--income)" radius={[4, 4, 0, 0]} maxBarSize={19} /><Bar dataKey="expense" name="Saídas" fill="var(--expense)" radius={[4, 4, 0, 0]} maxBarSize={19} /></BarChart></ResponsiveContainer></div>
  </div>
 </section>;
}
