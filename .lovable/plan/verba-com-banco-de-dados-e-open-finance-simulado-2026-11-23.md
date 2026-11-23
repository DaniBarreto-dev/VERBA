# VERBA com banco de dados e Open Finance simulado

## O que muda para o usuário
- **Cadastro e login de verdade**: cada pessoa cria a própria conta com nome, e-mail e senha. Os dados continuam lá depois de recarregar a página ou entrar em outro aparelho.
- **Transações salvas**: as transações que você adicionar ou excluir ficam salvas na sua conta. Uma conta nova já começa com as 8 transações de exemplo, para o painel não aparecer vazio.
- **Open Finance (simulado)**: um botão novo, "Conectar banco", abre uma tela para escolher um banco fictício (Nubank, Itaú, Bradesco, Banco do Brasil, Inter). A tela simula a autorização: consentimento, carregamento e "conectado". Depois disso:
  - os movimentos fictícios desse banco são importados e marcados com o nome do banco;
  - uma lista de "Bancos conectados" mostra cada banco com saldo e opções para desconectar ou sincronizar de novo.
- O rodapé deixa claro que o Open Finance está em modo de demonstração.

## Etapas
1. Ativar o Lovable Cloud (banco de dados SQL e login).
2. Criar as tabelas: perfis (nome), transações e bancos conectados, cada uma visível só para o próprio dono.
3. Trocar o acesso de demonstração pelo cadastro e login reais e proteger o painel.
4. Fazer o painel ler e gravar no banco de dados.
5. Construir a tela de conectar banco e a lista de bancos conectados.
6. Testar o cadastro, a adição e a exclusão de transações e a conexão de um banco, com os totais e gráficos atualizando.

## Detalhes técnicos
- Lovable Cloud (PostgreSQL) com login por e-mail e senha. Um gatilho cria o perfil e copia as transações de exemplo no cadastro.
- Tabelas:
  - `profiles(id, name)`
  - `transactions(id, user_id, description, category, date, amount, type, source_bank)`
  - `bank_connections(id, user_id, bank, balance, connected_at, last_sync)`
- Em todas as tabelas: permissões (GRANT) e RLS que só deixam cada usuário acessar as próprias linhas.
- O painel vai para `_authenticated/dashboard`. As leituras usam o React Query com o cliente do navegador, e os cálculos continuam no `model.ts` com os testes atuais.
- Open Finance simulado: um módulo `features/finance/open-finance.ts` gera os movimentos de cada banco a partir de dados fixos, sem nenhum serviço externo. Ele vem com testes do total importado.
- A confirmação de e-mail será desligada para a apresentação, assim o cadastro entra direto.
