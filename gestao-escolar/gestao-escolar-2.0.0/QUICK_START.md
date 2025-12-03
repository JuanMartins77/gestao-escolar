# 🚀 Quick Start Guide

## ✅ Sistema Configurado com Sucesso!

O backend Django está rodando e pronto para uso.

## 🌐 Acessar o Sistema

### 1. API REST
```
http://localhost:8000/api
```

### 2. Admin Interface
```
http://localhost:8000/admin
```

### 3. Frontend (Login)
Abra o arquivo no navegador:
```
gestao-escolar-2.0.0/index.html
```

## 🔑 Credenciais Padrão

```
Usuário: admin
Senha: admin123
```

⚠️ **Altere a senha após o primeiro login!**

## 📊 Dados Iniciais Criados

✅ Usuário administrador (admin)
✅ 8 disciplinas básicas:
   - Matemática (MAT)
   - Português (PORT)
   - História (HIST)
   - Geografia (GEO)
   - Ciências (CIEN)
   - Inglês (ING)
   - Educação Física (EDF)
   - Artes (ART)
✅ Turma de exemplo (6º A)

## 🎯 Próximos Passos

### 1. Testar a API

Abra o navegador e acesse:
```
http://localhost:8000/api
```

Você verá todos os endpoints disponíveis.

### 2. Acessar o Admin

```
http://localhost:8000/admin
```

Login: admin / admin123

No admin você pode:
- Criar novos usuários
- Gerenciar alunos e professores
- Criar turmas e disciplinas
- Visualizar todos os dados

### 3. Usar o Frontend

1. Abra `index.html` no navegador
2. Faça login com: admin / admin123
3. Navegue pelo dashboard

## 🔧 Comandos Úteis

### Parar o Servidor
No terminal onde o servidor está rodando:
```
Ctrl + C
```

### Iniciar o Servidor Novamente
```bash
cd gestao-escolar-2.0.0/backend
python manage.py runserver
```

### Criar Novo Superusuário
```bash
python manage.py createsuperuser
```

### Acessar Shell Django
```bash
python manage.py shell
```

## 📝 Criar Dados de Teste

### Via Admin Interface
1. Acesse http://localhost:8000/admin
2. Clique em "Usuários" → "Adicionar"
3. Preencha os dados e salve

### Via API (usando cURL)

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"admin\",\"password\":\"admin123\"}" \
  -c cookies.txt

# Criar disciplina
curl -X POST http://localhost:8000/api/disciplinas/ \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d "{\"nome\":\"Química\",\"codigo\":\"QUI\",\"carga_horaria\":60}"
```

### Via Frontend
1. Abra `cadastro.html` no navegador
2. Preencha o formulário
3. Clique em "Cadastrar"

## 🧪 Testar Funcionalidades

### 1. Criar um Professor

**Via Admin:**
1. Acesse http://localhost:8000/admin/escola/usuario/add/
2. Preencha:
   - Username: prof.joao
   - Email: joao@escola.com
   - Nome: João
   - Sobrenome: Silva
   - Tipo: Professor
   - CPF: 123.456.789-00
   - Senha: senha123
3. Salve

4. Acesse http://localhost:8000/admin/escola/professor/add/
5. Selecione o usuário criado
6. Preencha:
   - Registro: REG001
   - Especialidade: Matemática
   - Data admissão: hoje
   - Carga horária: 40
7. Salve

### 2. Criar um Aluno

**Via Admin:**
1. Crie o usuário (tipo: aluno)
2. Crie o perfil de aluno vinculado
3. Associe a uma turma

### 3. Lançar Notas

**Via API:**
```javascript
// No console do navegador (com index.html aberto e logado)
await api.createNota({
    aluno: 1,
    turma_disciplina: 1,
    bimestre: 1,
    nota: 8.5,
    observacao: 'Bom desempenho'
});
```

### 4. Ver Boletim

```javascript
const boletim = await api.getBoletim(1);
console.log(boletim);
```

## 🗄️ Banco de Dados

O sistema está usando **SQLite** (arquivo `db.sqlite3`).

### Vantagens:
- ✅ Não precisa instalar PostgreSQL
- ✅ Fácil de usar para desenvolvimento
- ✅ Arquivo único e portável

### Para Produção:
Recomendamos usar PostgreSQL. Para mudar:

1. Instale PostgreSQL
2. Edite `config/settings.py`
3. Descomente a configuração PostgreSQL
4. Comente a configuração SQLite
5. Execute as migrações novamente

## 📚 Documentação

- `README.md` - Visão geral completa
- `API_REFERENCE.md` - Documentação da API
- `GUIA_INSTALACAO.md` - Guia detalhado
- `SISTEMA_PERMISSOES.md` - Sistema de permissões

## 🐛 Problemas Comuns

### Erro: "Port 8000 already in use"
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Erro: "No module named 'X'"
```bash
pip install -r requirements.txt
```

### Resetar Banco de Dados
```bash
# Deletar db.sqlite3
del db.sqlite3

# Recriar
python manage.py migrate
python setup.py
```

## 🎓 Fluxo de Trabalho Típico

### Início do Ano Letivo

1. **Criar Turmas**
   - Admin → Turmas → Adicionar
   - Defina série, turno, capacidade

2. **Associar Disciplinas às Turmas**
   - Admin → Turmas-Disciplinas → Adicionar
   - Vincule professor, horários

3. **Matricular Alunos**
   - Criar usuário (tipo: aluno)
   - Criar perfil de aluno
   - Associar à turma

4. **Cadastrar Professores**
   - Criar usuário (tipo: professor)
   - Criar perfil de professor
   - Associar às turmas-disciplinas

### Durante o Ano

1. **Lançar Frequência Diária**
   - API: POST /api/frequencias/
   - Registrar presença/falta

2. **Lançar Notas por Bimestre**
   - API: POST /api/notas/
   - Bimestres: 1, 2, 3, 4

3. **Criar Comunicados**
   - API: POST /api/comunicados/
   - Selecionar turmas destinatárias

4. **Agendar Eventos**
   - API: POST /api/eventos/
   - Definir data, local, público

### Fim do Bimestre

1. **Gerar Boletins**
   - API: GET /api/alunos/{id}/boletim/
   - Exportar dados

2. **Analisar Frequência**
   - API: GET /api/alunos/{id}/frequencia_resumo/
   - Verificar percentuais

## 🎉 Pronto!

Seu sistema está funcionando! Explore as funcionalidades e personalize conforme necessário.

**Dúvidas?** Consulte a documentação completa nos arquivos MD do projeto.
