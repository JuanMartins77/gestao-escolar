# 🎯 Como Usar o Sistema

## 🌐 Acessando o Sistema

### Opção 1: Usar o Frontend HTML (Recomendado)

1. **Certifique-se que o servidor Django está rodando**
   ```
   Backend rodando em: http://127.0.0.1:8000
   ```

2. **Abra o arquivo HTML no navegador**
   - Navegue até a pasta: `gestao-escolar-2.0.0`
   - Clique duas vezes em `index.html`
   - OU arraste o arquivo para o navegador
   - OU clique com botão direito → "Abrir com" → Navegador

3. **Faça login**
   ```
   Usuário: admin
   Senha: admin123
   ```

### Opção 2: Usar a API Diretamente

1. **Página Inicial da API**
   ```
   http://127.0.0.1:8000/
   ```
   Mostra informações do sistema e endpoints disponíveis

2. **Navegador da API**
   ```
   http://127.0.0.1:8000/api/
   ```
   Interface navegável do Django REST Framework

3. **Admin Panel**
   ```
   http://127.0.0.1:8000/admin/
   ```
   Interface administrativa completa

## 📱 Testando o Sistema

### 1. Testar API no Navegador

Acesse: http://127.0.0.1:8000/api/

Você verá uma interface com todos os endpoints:
- `/api/usuarios/`
- `/api/alunos/`
- `/api/professores/`
- `/api/disciplinas/`
- `/api/turmas/`
- `/api/notas/`
- `/api/frequencias/`
- `/api/comunicados/`
- `/api/eventos/`

### 2. Fazer Login na API

1. Acesse: http://127.0.0.1:8000/api/auth/login/
2. Ou use o botão "Log in" no canto superior direito
3. Digite: admin / admin123

### 3. Testar Endpoints

Após fazer login, você pode:

**Ver usuários:**
```
http://127.0.0.1:8000/api/usuarios/
```

**Ver disciplinas:**
```
http://127.0.0.1:8000/api/disciplinas/
```

**Ver turmas:**
```
http://127.0.0.1:8000/api/turmas/
```

### 4. Usar o Admin Panel

1. Acesse: http://127.0.0.1:8000/admin/
2. Login: admin / admin123
3. Você verá todas as tabelas do sistema

**No Admin você pode:**
- ✅ Criar usuários
- ✅ Gerenciar alunos e professores
- ✅ Criar turmas e disciplinas
- ✅ Lançar notas e frequências
- ✅ Criar comunicados e eventos

## 🔧 Usando o Frontend HTML

### Estrutura dos Arquivos

```
gestao-escolar-2.0.0/
├── index.html          ← Página de login
├── dashboard.html      ← Dashboard principal
├── cadastro.html       ← Cadastro de usuários
└── js/
    └── api.js         ← Cliente da API
```

### Fluxo de Uso

1. **Login** (`index.html`)
   - Abra no navegador
   - Digite: admin / admin123
   - Será redirecionado para o dashboard

2. **Dashboard** (`dashboard.html`)
   - Visualize estatísticas
   - Acesse funcionalidades
   - Navegue pelo sistema

3. **Cadastro** (`cadastro.html`)
   - Cadastre novos usuários
   - Escolha o tipo (professor, aluno, etc.)
   - Preencha os dados

## 🧪 Exemplos de Teste

### Criar um Professor via Admin

1. Acesse: http://127.0.0.1:8000/admin/
2. Clique em "Usuários" → "Adicionar usuário"
3. Preencha:
   - **Username**: prof.maria
   - **Password**: senha123
   - **Password confirmation**: senha123
4. Clique em "Salvar e continuar editando"
5. Preencha mais dados:
   - **Nome**: Maria
   - **Sobrenome**: Santos
   - **Email**: maria@escola.com
   - **Tipo de usuário**: Professor
   - **CPF**: 987.654.321-00
6. Salve

7. Agora crie o perfil de professor:
   - Volte ao admin
   - Clique em "Professores" → "Adicionar professor"
   - Selecione o usuário "prof.maria"
   - **Registro profissional**: REG001
   - **Especialidade**: Matemática
   - **Data de admissão**: (escolha uma data)
   - **Carga horária semanal**: 40
8. Salve

### Criar uma Disciplina via API

1. Acesse: http://127.0.0.1:8000/api/disciplinas/
2. Role até o final da página
3. No formulário "POST", preencha:
   ```json
   {
     "nome": "Química",
     "codigo": "QUI",
     "descricao": "Disciplina de Química",
     "carga_horaria": 60,
     "ativa": true
   }
   ```
4. Clique em "POST"

### Ver Dados via API

**Listar todas as disciplinas:**
```
http://127.0.0.1:8000/api/disciplinas/
```

**Ver uma disciplina específica:**
```
http://127.0.0.1:8000/api/disciplinas/1/
```

**Filtrar usuários por tipo:**
```
http://127.0.0.1:8000/api/usuarios/por_tipo/?tipo=professor
```

## 🎓 Fluxo Completo de Uso

### Cenário: Configurar uma Turma

1. **Criar a Turma** (Admin)
   - Admin → Turmas → Adicionar
   - Nome: 7º B
   - Ano letivo: 2024
   - Série: 7º Ano
   - Turno: Matutino
   - Capacidade: 30
   - Sala: 201

2. **Associar Disciplinas** (Admin)
   - Admin → Turmas-Disciplinas → Adicionar
   - Turma: 7º B
   - Disciplina: Matemática
   - Professor: (selecione um)
   - Dia da semana: Segunda-feira
   - Horário início: 08:00
   - Horário fim: 09:00

3. **Matricular Alunos** (Admin)
   - Primeiro crie o usuário (tipo: aluno)
   - Depois crie o perfil de aluno
   - Associe à turma 7º B

4. **Lançar Notas** (API ou Admin)
   - Acesse /api/notas/
   - POST com dados do aluno, disciplina, bimestre e nota

## 📊 Visualizar Relatórios

### Boletim de um Aluno

**Via API:**
```
http://127.0.0.1:8000/api/alunos/1/boletim/
```

**Via Console do Navegador (com frontend aberto):**
```javascript
const boletim = await api.getBoletim(1);
console.log(boletim);
```

### Resumo de Frequência

**Via API:**
```
http://127.0.0.1:8000/api/alunos/1/frequencia_resumo/
```

## 🔍 Dicas Importantes

### ✅ O que funciona agora:

- ✅ API REST completa
- ✅ Admin panel
- ✅ Autenticação
- ✅ CRUD de todas as entidades
- ✅ Endpoints customizados (boletim, frequência)
- ✅ Sistema de permissões

### ⚠️ Lembre-se:

1. **Servidor deve estar rodando**
   - Verifique se vê: "Starting development server at http://127.0.0.1:8000/"

2. **Frontend é arquivo local**
   - Abra `index.html` diretamente no navegador
   - Não acesse via http://127.0.0.1:8000/index.html

3. **Faça login primeiro**
   - Na API: use o botão "Log in"
   - No Admin: acesse /admin/ e faça login
   - No Frontend: use index.html

4. **CORS está configurado**
   - O frontend pode se comunicar com a API
   - Configurado em `settings.py`

## 🐛 Solução de Problemas

### "Page not found" ao acessar /

✅ **Solução**: Acesse os endpoints corretos:
- http://127.0.0.1:8000/ (página inicial)
- http://127.0.0.1:8000/api/ (API)
- http://127.0.0.1:8000/admin/ (Admin)

### Frontend não conecta à API

✅ **Solução**: 
1. Verifique se o servidor está rodando
2. Abra o console do navegador (F12)
3. Veja se há erros de CORS
4. Verifique se está logado

### "Authentication credentials were not provided"

✅ **Solução**: Faça login primeiro:
- Na API: clique em "Log in" no canto superior direito
- No Frontend: use a página index.html

## 📞 Próximos Passos

1. ✅ Explore o Admin Panel
2. ✅ Crie alguns usuários de teste
3. ✅ Configure turmas e disciplinas
4. ✅ Teste o frontend HTML
5. ✅ Experimente a API

**Divirta-se explorando o sistema! 🎉**
