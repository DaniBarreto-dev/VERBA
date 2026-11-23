# VERBA
## Sistema de Gestão Financeira Pessoal com Open Finance e Banco de Dados em Nuvem

**Trabalho de Conclusão de Curso (TCC) — SENAI**

**Status do projeto:** Em produção / Funcional  
**Aplicação:** https://verba-tcc-senai.lovable.app  
**Categoria:** Desenvolvimento de Sistemas

---

## 1. Apresentação do Projeto

O VERBA é um sistema web de gestão financeira pessoal desenvolvido como Trabalho de Conclusão de Curso no SENAI. A plataforma tem como finalidade facilitar o gerenciamento das finanças individuais, permitindo o acompanhamento de receitas, despesas, saldos e movimentações financeiras em um único ambiente.

O sistema foi desenvolvido com uma interface moderna, responsiva e intuitiva, oferecendo recursos de categorização de despesas, visualização gráfica de indicadores financeiros e gerenciamento de transações.

A proposta também contempla funcionalidades inspiradas no Open Finance brasileiro, visando demonstrar como a centralização de informações provenientes de diferentes instituições financeiras pode contribuir para uma gestão financeira mais eficiente.

A aplicação utiliza banco de dados PostgreSQL em nuvem, autenticação de usuários e políticas de segurança para garantir o isolamento das informações financeiras individuais.

## 2. Problema e Justificativa

A falta de organização financeira representa uma dificuldade recorrente para muitas pessoas. A ausência de ferramentas acessíveis e intuitivas pode comprometer o acompanhamento de receitas, despesas e compromissos financeiros.

Entre os principais problemas identificados estão:

- Dificuldade de controlar receitas e despesas.
- Falta de organização das movimentações financeiras.
- Dispersão de informações entre diferentes instituições bancárias.
- Dificuldade de visualizar padrões de consumo.
- Ausência de ferramentas simplificadas para análise financeira.
- Necessidade de proteção e privacidade dos dados pessoais.

Diante desse cenário, o VERBA foi desenvolvido com o propósito de centralizar informações financeiras e oferecer recursos que auxiliem os usuários na organização e compreensão de sua situação econômica.

## 3. Objetivos

### 3.1. Objetivo geral

Desenvolver uma aplicação web de gestão financeira pessoal capaz de centralizar movimentações financeiras, organizar receitas e despesas e apresentar indicadores visuais que auxiliem no controle e planejamento financeiro dos usuários.

### 3.2. Objetivos específicos

- Implementar sistema de cadastro e autenticação de usuários.
- Desenvolver mecanismos de gerenciamento de receitas e despesas.
- Implementar categorização de movimentações financeiras.
- Criar um painel com indicadores e gráficos interativos.
- Utilizar banco de dados relacional em nuvem.
- Implementar isolamento de informações por usuário.
- Desenvolver uma simulação de integração inspirada no Open Finance.
- Garantir uma interface responsiva e acessível.
- Planejar funcionalidades adicionais para ampliar a utilização comercial da plataforma.

## 4. Funcionalidades Implementadas

As funcionalidades descritas nesta seção correspondem aos recursos já implementados e funcionais na versão atual do VERBA.

### 4.1. Autenticação e gerenciamento de usuários

- Cadastro de usuários com e-mail e senha.
- Autenticação real de usuários.
- Validação de credenciais.
- Gerenciamento de sessões.
- Persistência da sessão após atualização ou fechamento da página.
- Isolamento dos dados financeiros por usuário autenticado.

### 4.2. Banco de dados em nuvem

O sistema utiliza PostgreSQL hospedado em ambiente de nuvem, permitindo o armazenamento persistente das informações.

Atualmente, o banco de dados realiza:

- Armazenamento de informações cadastrais.
- Registro de transações financeiras.
- Exclusão persistente de movimentações.
- Armazenamento de informações relacionadas às conexões bancárias simuladas.
- Controle de acesso por meio de políticas Row Level Security (RLS).

### 4.3. Painel financeiro

O dashboard apresenta indicadores financeiros calculados automaticamente a partir das movimentações armazenadas no banco de dados.

Indicadores disponíveis:

- Saldo total.
- Total de receitas.
- Total de despesas.

### 4.4. Visualização gráfica

O sistema disponibiliza gráficos interativos para facilitar a interpretação dos dados financeiros.

**Gráfico de rosca (Donut):**

Apresenta a distribuição proporcional das despesas por categorias, como alimentação, moradia, transporte e lazer.

**Gráfico de barras:**

Apresenta a comparação entre receitas e despesas ao longo dos meses, permitindo visualizar o comportamento financeiro do usuário.

### 4.5. Gerenciamento de transações

- Cadastro de receitas.
- Cadastro de despesas.
- Definição de descrição.
- Seleção de categoria.
- Definição de data e valor.
- Exclusão de movimentações.
- Filtros por tipo de transação.
- Busca dinâmica por descrição.
- Atualização automática dos indicadores e gráficos após alterações.

As operações de criação e exclusão são persistidas diretamente no banco de dados em nuvem.

### 4.6. Simulação de Open Finance

O VERBA possui um fluxo demonstrativo inspirado no processo de consentimento do Open Finance brasileiro.

Instituições contempladas na simulação:

- Nubank.
- Itaú.
- Bradesco.
- Banco do Brasil.
- Banco Inter.

O fluxo permite apresentar uma jornada de consentimento e importar movimentações financeiras de exemplo para a conta do usuário.

**Limitação da implementação atual:** o recurso é uma simulação acadêmica. Não existe conexão direta com as APIs oficiais das instituições financeiras, nem acesso a extratos bancários reais por meio desse fluxo.

### 4.7. Interface e experiência do usuário

- Interface moderna inspirada em plataformas financeiras.
- Layout responsivo.
- Compatibilidade com dispositivos móveis e computadores.
- Alternância entre modo claro e modo escuro.
- Componentes de interface acessíveis.
- Navegação simplificada.

## 5. Arquitetura e Tecnologias Utilizadas

O projeto utiliza uma arquitetura baseada em tecnologias modernas de desenvolvimento web, com separação entre apresentação, aplicação e armazenamento de dados.

### 5.1. Tecnologias

| Tecnologia | Finalidade |
|---|---|
| TypeScript 5 | Linguagem principal e tipagem estática |
| React 19 | Construção da interface |
| Vite | Ambiente de desenvolvimento e build |
| TanStack Router | Gerenciamento de rotas |
| TanStack Start | Estrutura da aplicação |
| Tailwind CSS v4 | Estilização da interface |
| Radix UI | Componentes acessíveis |
| Recharts | Construção dos gráficos |
| Lucide | Biblioteca de ícones |
| PostgreSQL | Banco de dados relacional |
| Lovable Cloud | Infraestrutura em nuvem |
| Row Level Security | Controle de acesso aos dados |
| Vitest | Testes automatizados |

### 5.2. Estrutura da arquitetura

```text
CAMADA DE APRESENTAÇÃO
|
|-- React 19
|-- TypeScript
|-- Tailwind CSS v4
|-- Radix UI
|-- TanStack Router
|-- Recharts
|
V
CAMADA DE APLICAÇÃO E NUVEM
|
|-- TanStack Start
|-- Lovable Cloud
|-- Autenticação
|-- Regras da aplicação
|
V
CAMADA DE DADOS
|
|-- PostgreSQL
|-- Row Level Security (RLS)
|
|-- profiles
|-- transactions
|-- bank_connections
```

## 6. Modelo de Dados

O banco de dados utiliza PostgreSQL e possui três tabelas principais na implementação atual.

### 6.1. Tabela `public.profiles`

Armazena informações cadastrais dos usuários.

| Campo | Descrição |
|---|---|
| id | Identificador do usuário |
| name | Nome do usuário |
| updated_at | Data da última atualização |

### 6.2. Tabela `public.transactions`

Armazena as movimentações financeiras realizadas pelos usuários.

| Campo | Descrição |
|---|---|
| id | Identificador da transação |
| user_id | Identificador do proprietário |
| description | Descrição da movimentação |
| category | Categoria financeira |
| date | Data da movimentação |
| amount | Valor da movimentação |
| type | Tipo de movimentação |
| source_bank | Instituição de origem |

### 6.3. Tabela `public.bank_connections`

Armazena informações das instituições vinculadas por meio da simulação de Open Finance.

| Campo | Descrição |
|---|---|
| id | Identificador da conexão |
| user_id | Identificador do usuário |
| bank | Instituição financeira |
| balance | Saldo informado |
| connected_at | Data da conexão |

## 7. Segurança e Privacidade

A proteção das informações dos usuários é um dos aspectos fundamentais da arquitetura do VERBA.

O projeto utiliza autenticação e políticas Row Level Security (RLS) para restringir o acesso aos registros armazenados no PostgreSQL.

O isolamento de dados permite que cada usuário visualize e gerencie exclusivamente as informações vinculadas à sua própria conta, conforme as políticas de acesso configuradas no banco.

Entre os mecanismos utilizados estão:

- Autenticação individual.
- Persistência segura das informações.
- Políticas de acesso por usuário.
- Controle de operações sobre registros financeiros.
- Separação lógica dos dados.
- Armazenamento em banco de dados na nuvem.

A ampliação comercial da plataforma deverá contemplar uma revisão de segurança, políticas de privacidade, termos de uso, procedimentos de exclusão de dados e adequação à Lei Geral de Proteção de Dados (LGPD).

## 8. Funcionalidades Planejadas

Além das funcionalidades já implementadas, o VERBA possui um planejamento de evolução com o objetivo de ampliar seus recursos e aproximar a plataforma de um produto comercial completo.

As funcionalidades a seguir ainda precisam ser desenvolvidas.

### 8.1. Filtro por mês e ano

Implementar um seletor de período que permita visualizar as movimentações financeiras de meses específicos.

Etapas previstas:

1. Adicionar seletor de mês e ano no dashboard.
2. Definir o mês atual como período padrão.
3. Filtrar as transações conforme o período selecionado.
4. Atualizar os indicadores de saldo, receitas e despesas.
5. Atualizar os gráficos de acordo com o período.
6. Adicionar navegação entre meses anteriores e posteriores.

**Resultado esperado:** permitir que o usuário analise individualmente sua situação financeira em cada período.

### 8.2. Gerenciamento de contas conectadas

Desenvolver uma área específica para visualizar e administrar instituições financeiras vinculadas.

Etapas previstas:

1. Criar uma página denominada "Minhas Contas".
2. Consultar os registros da tabela `bank_connections`.
3. Apresentar nome da instituição e saldo informado.
4. Exibir a data de conexão.
5. Implementar opção de desconexão.
6. Atualizar o estado da conexão após a revogação.
7. Implementar sincronização das movimentações simuladas.

**Resultado esperado:** proporcionar maior organização e transparência sobre as instituições cadastradas.

### 8.3. Gerenciamento de perfil e segurança da conta

Implementar recursos adicionais para administração da conta.

Etapas previstas:

1. Criar página de configurações.
2. Permitir alteração do nome do usuário.
3. Implementar recuperação de senha por e-mail.
4. Permitir alteração da senha atual.
5. Implementar gerenciamento de sessão.
6. Desenvolver processo de exclusão da conta.
7. Revisar políticas de acesso e proteção de informações.

### 8.4. Orçamentos e metas financeiras

Desenvolver uma funcionalidade que permita estabelecer limites de gastos mensais por categoria.

Etapas previstas:

1. Criar tabela `budgets` no PostgreSQL.
2. Permitir selecionar uma categoria financeira.
3. Definir um limite mensal.
4. Calcular automaticamente o total gasto na categoria.
5. Apresentar barra de progresso.
6. Exibir alertas quando o limite estiver próximo ou for ultrapassado.

**Exemplo:** o usuário define um orçamento mensal de R$ 800,00 para alimentação. Conforme as despesas são registradas, o sistema atualiza o percentual utilizado.

### 8.5. Transações recorrentes

Implementar um mecanismo para gerenciamento de movimentações financeiras periódicas.

Etapas previstas:

1. Criar opção de transação recorrente.
2. Permitir definir frequência semanal, mensal ou anual.
3. Definir data inicial e final.
4. Implementar geração automática dos lançamentos.
5. Evitar duplicidade de registros.
6. Permitir edição, pausa e cancelamento de recorrências.

Exemplos de utilização:

- Salários.
- Aluguéis.
- Mensalidades.
- Assinaturas.
- Despesas fixas.

### 8.6. Exportação de relatórios financeiros

Desenvolver ferramentas para exportação dos dados financeiros.

Etapas previstas:

1. Criar botão de exportação.
2. Permitir selecionar o período desejado.
3. Implementar geração de arquivos CSV.
4. Implementar exportação para Excel.
5. Desenvolver relatórios em PDF.
6. Incluir resumo financeiro e movimentações.
7. Garantir que cada usuário exporte somente seus próprios dados.

### 8.7. Importação de extratos bancários

Implementar uma alternativa de importação de movimentações reais por arquivos disponibilizados pelas instituições financeiras.

Formatos previstos:

- OFX.
- CSV.

Etapas previstas:

1. Criar opção de importação de extratos.
2. Permitir envio dos arquivos.
3. Desenvolver leitores para os formatos suportados.
4. Identificar datas, descrições e valores.
5. Classificar receitas e despesas.
6. Apresentar prévia das movimentações.
7. Implementar identificação de possíveis duplicidades.
8. Salvar os registros no PostgreSQL.

**Resultado esperado:** permitir que o usuário importe movimentações reais a partir dos extratos baixados em seu próprio banco.

### 8.8. Integração oficial com Open Finance

A integração bancária oficial representa uma etapa futura de evolução do projeto.

No Brasil, o Open Finance é regulamentado pelo Banco Central e possui requisitos específicos de segurança, consentimento e participação.

Para viabilizar a conexão com instituições financeiras, será avaliada a contratação de agregadores especializados, como:

- Pluggy.
- Belvo.
- Klavi.

Etapas previstas:

1. Pesquisar fornecedores e condições comerciais.
2. Avaliar instituições financeiras suportadas.
3. Criar ambiente de desenvolvimento com o fornecedor escolhido.
4. Obter credenciais de integração.
5. Desenvolver comunicação segura no backend.
6. Implementar fluxo real de consentimento.
7. Receber movimentações por meio das APIs disponibilizadas.
8. Implementar sincronização de dados.
9. Desenvolver revogação de consentimento.
10. Realizar testes de segurança e conformidade.

A contratação de um agregador não elimina automaticamente todas as exigências regulatórias e contratuais aplicáveis. A viabilidade deverá ser avaliada conforme o modelo de operação adotado.

## 9. Evolução da Estrutura do Banco de Dados

Para suportar as funcionalidades planejadas, serão avaliadas novas estruturas de armazenamento.

| Tabela planejada | Finalidade |
|---|---|
| `budgets` | Armazenamento de orçamentos mensais |
| `recurring_transactions` | Configurações de movimentações recorrentes |
| `import_batches` | Controle das importações de extratos |
| `user_preferences` | Preferências individuais dos usuários |

As novas tabelas deverão possuir relacionamentos adequados, restrições de integridade e políticas RLS compatíveis com o modelo de segurança existente.

Também será avaliada a ampliação da tabela `bank_connections` para incluir informações de status, identificadores externos e dados necessários ao gerenciamento dos consentimentos.

## 10. Cronograma de Desenvolvimento

O cronograma abaixo apresenta uma proposta de organização para as próximas etapas de desenvolvimento.

| Semana | Atividade |
|---|---|
| 1 | Implementação do filtro por mês e ano |
| 2 | Desenvolvimento da área de contas conectadas |
| 3 | Perfil, recuperação de senha e segurança |
| 4 | Orçamentos e metas financeiras |
| 5 | Transações recorrentes |
| 6 | Exportação de relatórios |
| 7 | Importação de extratos OFX e CSV |
| 8 | Testes, correções e documentação |

A integração oficial com Open Finance será considerada uma etapa posterior, devido à necessidade de contratação de serviços especializados e adequação aos requisitos aplicáveis.

## 11. Testes e Validação

O processo de validação deverá contemplar testes funcionais, de segurança e de experiência do usuário.

Critérios previstos:

- Verificar o funcionamento do cadastro e login.
- Confirmar a persistência das movimentações.
- Validar os cálculos de receitas, despesas e saldos.
- Verificar a atualização dos gráficos.
- Testar o isolamento de dados entre usuários.
- Verificar o funcionamento dos filtros.
- Avaliar a responsividade da interface.
- Identificar erros no console e nas requisições.
- Validar os fluxos de importação e exportação.
- Executar testes automatizados com Vitest.

## 12. Como Executar Localmente

### 12.1. Pré-requisitos

- Node.js instalado.
- Git instalado.
- Bun ou npm.
- Acesso às configurações do ambiente Lovable Cloud, quando necessário.

### 12.2. Clonar o repositório

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

### 12.3. Entrar na pasta do projeto

```bash
cd verba
```

### 12.4. Instalar as dependências

Com Bun:

```bash
bun install
```

Ou com npm:

```bash
npm install
```

### 12.5. Executar os testes

```bash
bun test
```

Ou:

```bash
npm test
```

### 12.6. Iniciar o servidor

```bash
bun dev
```

Ou:

```bash
npm run dev
```

A aplicação poderá ser acessada pelo endereço local informado no terminal. A porta padrão configurada para o projeto é:

http://localhost:8080

**Observação:** a execução local pode exigir a configuração de variáveis de ambiente e credenciais do Lovable Cloud. Essas informações devem ser configuradas localmente e nunca publicadas no repositório.

## 13. Roteiro para Apresentação do TCC

Para a apresentação do projeto à banca avaliadora, recomenda-se a seguinte sequência:

### 13.1. Introdução

- Apresentação do tema.
- Contextualização sobre educação financeira.
- Identificação dos problemas que motivaram o desenvolvimento.
- Apresentação dos objetivos do VERBA.

### 13.2. Demonstração prática

- Realização do cadastro de um usuário.
- Demonstração do processo de autenticação.
- Apresentação do dashboard.
- Explicação dos indicadores financeiros.
- Demonstração dos gráficos.
- Cadastro de uma receita.
- Cadastro de uma despesa.
- Exclusão de uma transação.
- Apresentação da simulação de Open Finance.

### 13.3. Apresentação técnica

- Explicação da arquitetura.
- Apresentação das tecnologias utilizadas.
- Demonstração da persistência no PostgreSQL.
- Explicação das políticas RLS.
- Apresentação do modelo de dados.
- Demonstração da responsividade.

### 13.4. Encerramento

Apresentação dos resultados obtidos, das limitações atuais e das funcionalidades planejadas para a evolução do sistema.

## 14. Conformidade e Considerações sobre a LGPD

Como o VERBA trabalha com informações pessoais e financeiras, sua evolução comercial deverá considerar os princípios e obrigações da Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018).

Entre os pontos que deverão ser contemplados estão:

- Política de Privacidade.
- Termos de Uso.
- Transparência sobre o tratamento de dados.
- Definição de finalidades e bases legais.
- Controle de acesso às informações.
- Procedimentos de correção e exclusão de dados.
- Políticas de retenção e armazenamento.
- Medidas técnicas e administrativas de segurança.
- Procedimentos para atendimento aos direitos dos titulares.

A publicação desses documentos e a implementação de controles técnicos deverão ser acompanhadas de avaliação jurídica e de segurança apropriada.

## 15. Considerações Finais

O VERBA representa uma proposta de aplicação tecnológica voltada à organização e ao gerenciamento financeiro pessoal.

A implementação atual demonstra a utilização de tecnologias modernas de desenvolvimento web, banco de dados relacional em nuvem, autenticação de usuários, mecanismos de controle de acesso e visualização gráfica de informações financeiras.

As funcionalidades já desenvolvidas estabelecem a base para a evolução da plataforma, enquanto os recursos planejados buscam ampliar sua capacidade de gerenciamento, automação e integração com instituições financeiras.

Dessa forma, o projeto não se limita à construção de um painel financeiro, mas apresenta uma estrutura que poderá evoluir para uma solução mais abrangente de gestão financeira pessoal.

## 16. Informações Acadêmicas

**Nome do projeto:** VERBA — Sistema de Gestão Financeira Pessoal com Open Finance e Banco de Dados em Nuvem.

**Instituição:** SENAI.

**Modalidade:** Trabalho de Conclusão de Curso.

**Área de formação:** Desenvolvimento de Sistemas.

**Tipo de aplicação:** Sistema Web.

**Status:** Em produção / Funcional.

**Endereço da aplicação:** https://verba-tcc-senai.lovable.app

---

**VERBA — Organização, controle e planejamento financeiro em um único lugar.**
