CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT 'Aluno',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  description text NOT NULL CHECK (char_length(description) BETWEEN 1 AND 100),
  category text NOT NULL,
  date date NOT NULL,
  amount numeric(12,2) NOT NULL CHECK (amount > 0),
  type text NOT NULL CHECK (type IN ('income','expense')),
  source_bank text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX transactions_user_idx ON public.transactions(user_id, date DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tx select" ON public.transactions FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own tx insert" ON public.transactions FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own tx update" ON public.transactions FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own tx delete" ON public.transactions FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.bank_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  bank text NOT NULL,
  balance numeric(12,2) NOT NULL DEFAULT 0,
  connected_at timestamptz NOT NULL DEFAULT now(),
  last_sync timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, bank)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bank_connections TO authenticated;
GRANT ALL ON public.bank_connections TO service_role;
ALTER TABLE public.bank_connections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own bank select" ON public.bank_connections FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own bank insert" ON public.bank_connections FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own bank update" ON public.bank_connections FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own bank delete" ON public.bank_connections FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  INSERT INTO public.profiles (id, name) VALUES (NEW.id, COALESCE(NULLIF(trim(NEW.raw_user_meta_data->>'name'), ''), 'Aluno'));
  INSERT INTO public.transactions (user_id, description, category, date, amount, type) VALUES
    (NEW.id, 'Salário mensal', 'Salário', '2026-11-05', 5500, 'income'),
    (NEW.id, 'Projeto freelance', 'Freelance', '2026-11-12', 1200, 'income'),
    (NEW.id, 'Aluguel do apartamento', 'Moradia', '2026-11-10', 1500, 'expense'),
    (NEW.id, 'Compras no supermercado', 'Alimentação', '2026-11-14', 420.5, 'expense'),
    (NEW.id, 'Combustível', 'Transporte', '2026-11-15', 180, 'expense'),
    (NEW.id, 'Cinema e jantar', 'Lazer', '2026-11-16', 150, 'expense'),
    (NEW.id, 'Curso de inglês', 'Educação', '2026-11-17', 280, 'expense'),
    (NEW.id, 'Almoço no restaurante', 'Alimentação', '2026-11-18', 65, 'expense');
  RETURN NEW;
END; $$;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();