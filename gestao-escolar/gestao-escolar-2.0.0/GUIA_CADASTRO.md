# 📝 Guia de Cadastro - Sistema EduGestão

## ✅ Cadastro Completo Integrado!

O sistema agora possui um cadastro completo em 3 etapas com **nome de usuário** para login.

---

## 🎯 Como Funciona:

### Passo 1: Tipo de Usuário
Escolha o tipo de conta:
- 👨‍🏫 Professor
- 📋 Coordenador
- 📝 Secretário
- 👔 Admin

### Passo 2: Dados Pessoais
Preencha:
- ✅ Nome Completo
- ✅ CPF (com máscara automática)
- ✅ Data de Nascimento
- ✅ Telefone (com máscara automática)
- ⭕ Telefone Alternativo (opcional)

### Passo 3: Dados de Acesso
Defina suas credenciais:
- ✅ **Nome de Usuário** (novo!)
- ✅ Email
- ✅ Senha (mínimo 6 caracteres)
- ✅ Confirmar Senha

---

## 🆕 Nome de Usuário

### O que é?
É o identificador único que você usará para fazer login no sistema.

### Regras:
- ✅ Mínimo 3 caracteres
- ✅ Apenas letras, números, ponto (.), hífen (-) ou underscore (_)
- ✅ Sem espaços
- ✅ Deve ser único no sistema

### Exemplos Válidos:
```
joao.silva
maria_santos
prof.carlos
admin.escola
coordenador123
```

### Exemplos Inválidos:
```
joão silva    ❌ (tem espaço e acento)
maria@santos  ❌ (tem @)
prof carlos   ❌ (tem espaço)
```

### 💡 Sugestão Automática:
Quando você preencher o **Nome Completo** no Passo 2, o sistema sugere automaticamente um nome de usuário no Passo 3!

**Exemplo:**
- Nome: `João da Silva`
- Sugestão: `joao.silva`

Você pode aceitar a sugestão ou digitar outro nome de usuário.

---

## 📋 Exemplo Completo de Cadastro:

### Passo 1:
```
Tipo: Professor
```

### Passo 2:
```
Nome Completo: Maria Santos
CPF: 123.456.789-00
Data de Nascimento: 15/05/1985
Telefone: (11) 98765-4321
Telefone Alternativo: (vazio)
```

### Passo 3:
```
Nome de Usuário: maria.santos
Email: maria.santos@escola.com
Senha: senha123
Confirmar Senha: senha123
```

### Resultado:
✅ Usuário criado com sucesso!
✅ Login automático
✅ Redirecionado para o dashboard

---

## 🔑 Fazer Login Depois:

Após o cadastro, use:

```
Usuário: maria.santos
Senha: senha123
```

**URL de Login:**
```
http://localhost:3000/index.html
```

---

## ✨ Validações Automáticas:

### No Passo 2:
- ✅ CPF formatado automaticamente (000.000.000-00)
- ✅ Telefone formatado automaticamente ((00) 00000-0000)
- ✅ Data de nascimento obrigatória

### No Passo 3:
- ✅ Nome de usuário único (verifica no banco)
- ✅ Email único (verifica no banco)
- ✅ CPF único (verifica no banco)
- ✅ Senha mínima de 6 caracteres
- ✅ Confirmação de senha deve coincidir
- ✅ Formato de email válido

---

## 🎨 Interface:

### Feedback Visual:
- ✅ Mensagens de erro em vermelho
- ✅ Mensagens de sucesso em verde
- ✅ Barra de progresso (1 → 2 → 3)
- ✅ Botões "Voltar" e "Próximo"
- ✅ Loading state ao cadastrar

### Animações:
- ✅ Transição suave entre passos
- ✅ Fade in dos formulários
- ✅ Hover effects nos cards

---

## 🔐 Segurança:

### O que o sistema faz:
1. ✅ Valida todos os campos no frontend
2. ✅ Envia dados para o backend Django
3. ✅ Django valida novamente (segurança dupla)
4. ✅ Verifica se username/email/CPF já existem
5. ✅ Criptografa a senha automaticamente
6. ✅ Salva no banco de dados SQLite
7. ✅ Faz login automático
8. ✅ Cria sessão segura
9. ✅ Redireciona para dashboard

### Dados Salvos:
```
Tabela: usuarios
- id (auto)
- username (único)
- email (único)
- password (criptografado)
- first_name
- last_name
- tipo_usuario
- cpf (único)
- telefone
- data_nascimento
- ativo (true)
- criado_em (auto)
- atualizado_em (auto)
```

---

## 🐛 Mensagens de Erro:

### Possíveis Erros:

**"Nome de usuário já existe"**
- Escolha outro nome de usuário

**"Email já cadastrado"**
- Use outro email ou faça login

**"CPF já cadastrado"**
- Este CPF já está no sistema

**"As senhas não coincidem"**
- Digite a mesma senha nos dois campos

**"Nome de usuário inválido"**
- Use apenas letras, números, ponto, hífen ou underscore

**"Senha deve ter no mínimo 6 caracteres"**
- Use uma senha mais longa

---

## 📱 Responsivo:

O formulário funciona perfeitamente em:
- ✅ Desktop (tela grande)
- ✅ Tablet (tela média)
- ✅ Celular (tela pequena)

---

## 🎉 Após o Cadastro:

### O que acontece:
1. ✅ Mensagem de sucesso aparece
2. ✅ Mostra o nome de usuário criado
3. ✅ Aguarda 3 segundos
4. ✅ Redireciona para o dashboard
5. ✅ Você já está logado!

### Mensagem de Sucesso:
```
✓ Cadastro realizado! Use "maria.santos" para fazer login.
```

---

## 💡 Dicas:

### Escolha um bom username:
- ✅ Fácil de lembrar
- ✅ Relacionado ao seu nome
- ✅ Profissional
- ✅ Curto e simples

### Exemplos Bons:
```
prof.maria
joao.silva
coord.carlos
admin.escola
```

### Exemplos Ruins:
```
xXx_maria_xXx
123456
usuario
teste
```

---

## 🔄 Fluxo Completo:

```
1. Acessa cadastro.html
   ↓
2. Escolhe tipo de usuário
   ↓
3. Preenche dados pessoais
   ↓
4. Sistema sugere username
   ↓
5. Define username, email e senha
   ↓
6. Clica em "Finalizar Cadastro"
   ↓
7. Sistema valida dados
   ↓
8. Envia para API Django
   ↓
9. Django cria usuário no banco
   ↓
10. Faz login automático
   ↓
11. Redireciona para dashboard
   ↓
12. Pronto! Você está logado!
```

---

## 📞 Suporte:

### Problemas?

**Não consigo cadastrar:**
- Verifique se todos os campos estão preenchidos
- Veja se há mensagens de erro em vermelho
- Tente outro nome de usuário

**Username já existe:**
- Escolha outro nome de usuário
- Adicione números: maria.santos2

**Email já cadastrado:**
- Use outro email
- Ou faça login com a conta existente

---

## ✅ Resumo:

**Cadastro Completo:**
- ✅ 3 passos simples
- ✅ Nome de usuário personalizado
- ✅ Sugestão automática de username
- ✅ Validações em tempo real
- ✅ Máscaras automáticas (CPF, telefone)
- ✅ Integração com banco de dados
- ✅ Login automático após cadastro
- ✅ Interface moderna e responsiva

**Acesse:**
```
http://localhost:3000/cadastro.html
```

**Faça seu cadastro agora!** 🚀
