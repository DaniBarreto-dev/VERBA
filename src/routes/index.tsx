import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Brand } from '@/features/finance/brand';
import loginImage from '@/assets/verba-login.jpg';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [{ title: 'Entrar | VERBA — Suas finanças com clareza' }, { name: 'description', content: 'Acesse o VERBA para acompanhar sua vida financeira. Controle receitas, despesas e saldo em um só lugar.' }, { property: 'og:title', content: 'Entrar | VERBA' }, { property: 'og:description', content: 'Mais clareza para sua vida financeira. Acesse seu painel VERBA.' }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }] }),
  component: Login,
});
function Login() {
 const [register, setRegister] = useState(false);
 const [showPassword, setShowPassword] = useState(false);
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [name, setName] = useState('');
 const navigate = useNavigate();
 const [busy, setBusy] = useState(false);
 async function submit(event: FormEvent) {
  event.preventDefault(); setBusy(true);
  const { error } = register
   ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin, data: { name: name.trim() } } })
   : await supabase.auth.signInWithPassword({ email, password });
  setBusy(false);
  if (error) { toast.error(error.message.includes('Invalid login') ? 'E-mail ou senha incorretos.' : error.message.includes('already') ? 'Este e-mail já tem conta. Entre com sua senha.' : error.message.includes('weak') ? 'Senha muito fácil de adivinhar. Escolha outra.' : error.message); return; }
  navigate({ to: '/dashboard' });
 }
 return <main className="login-page">
  <img className="login-background" src={loginImage} width={1536} height={1024} alt="Esculturas de vidro verde em uma composição de formas ascendentes" />
  <header className="login-top"><Brand /><span className="small-label">Seu dinheiro. Suas possibilidades.</span></header>
  <div className="login-center"><section className="login-card">
   <Brand /><h1>{register ? 'Comece uma nova fase.' : 'Bom ter você por aqui.'}</h1>
   <p>{register ? 'Crie sua conta e dê o primeiro passo.' : 'Entre para cuidar do que move seus planos.'}</p>
   <div className="auth-tabs" role="tablist" aria-label="Acesso"><Button variant="ghost" role="tab" aria-selected={!register} className={!register ? 'active' : ''} onClick={() => setRegister(false)}>Entrar</Button><Button variant="ghost" role="tab" aria-selected={register} className={register ? 'active' : ''} onClick={() => setRegister(true)}>Criar conta</Button></div>
   <form onSubmit={submit} className="form-fields">
    {register && <label className="field">Seu nome<div className="input-with-icon"><UserRound /><Input required autoComplete="name" value={name} onChange={e => setName(e.target.value)} placeholder="Como podemos chamar você?" /></div></label>}
    <label className="field">E-mail<div className="input-with-icon"><Mail /><Input type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></div></label>
    <label className="field">Senha<div className="input-with-icon"><LockKeyhole /><Input type={showPassword ? 'text' : 'password'} required minLength={6} autoComplete={register ? 'new-password' : 'current-password'} value={password} onChange={e => setPassword(e.target.value)} /><Button className="password-eye" size="icon" variant="ghost" type="button" title={showPassword ? 'Ocultar senha' : 'Mostrar senha'} aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</Button></div></label>
    <Button type="submit" disabled={busy} className="h-11 w-full mt-2">{register ? 'Criar conta' : 'Entrar'}<ArrowRight /></Button>
   </form>
   <div className="demo-label"><ShieldCheck size={15} /> Seus dados ficam salvos e protegidos</div>
  </section></div>
  <footer className="login-bottom"><span>© 2026 VERBA. Todos os direitos reservados.</span><span>Mais clareza. Mais liberdade.</span></footer>
 </main>;
}
