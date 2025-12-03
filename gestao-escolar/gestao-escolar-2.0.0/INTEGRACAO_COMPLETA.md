# 🎓 Sistema Integrado - Gestão Escolar 2.0

## ✅ STATUS DA INTEGRAÇÃO

### Backend Django + Banco de Dados SQLite
✅ **TOTALMENTE INTEGRADO E FUNCIONANDO**

- ✅ Servidor rodando em: http://127.0.0.1:8000
- ✅ Banco de dados SQLite criado e populado
- ✅ 12 usuários cadastrados (admin, professores, alunos, etc.)
- ✅ 8 disciplinas criadas
- ✅ 1 turma configurada (6º A)
- ✅ 24 notas lançadas
- ✅ 360 registros de frequência
- ✅ 3 comunicados ativos
- ✅ 2 eventos agendados

## 🌐 Como Acessar o Sistema

### 1️⃣ API REST (Backend)

**URL Base**: http://127.0.0.1:8000

**Endpoints Principais**:
```
http://127.0.0.1:8000/              → Página inicial (info do sistema)
http://127.0.0.1:8000/api/          → API navegável
http://127.0.0.1:8000/admin/        → Painel administrativo
```

### 2️⃣ Frontend HTML

**Abrir no navegador**:
1. Navegue até: `gestao-escolar-2.0.0`
2. Clique duas vezes em `index.html`
3. Faça login com uma das credenciais abaixo

## 🔑 Credenciais de Acesso

### Administrador
```
Usuário: admin
Senha: admin123
Acesso: Total ao sistema
```

### Secretária
```
Usuário: secretaria
Senha: senha123
Acesso: Gerenciar alunos, matrículas, turmas
```

### Coordenador
```
Usuário: coordenador
Senha: senha123
Acesso: Gerenciar professores, disciplinas, editar notas
```

### Professor (Matemática)
```
Usuário: prof.maria
Senha: senha123
Acesso: Lançar notas e frequências, ver suas turmas
```

### Aluno
```
Usuário: aluno.pedro
Senha: senha123
Acesso: Ver próprias notas, frequência, comunicados
```

### Responsável
```
Usuário: resp.jose
Senha: senha123
Acesso: Ver dados dos alunos vinculados
```

## 📊 Dados Disponíveis no Sistema

### Usuários (12 total)
- 1 Administrador
- 1 Secretária
- 1 Coordenador
- 3 Professores (Matemática, Português, História)
- 4 Alunos (Pedro, Julia, Lucas, Maria)
- 2 Responsáveis (José, Lúcia)

### Disciplinas (8 total)
- Matemática (MAT)
- Português (PORT)
- História (HIST)
- Geografia (GEO)
- Ciências (CIEN)
- Inglês (ING)
- Educação Física (EDF)
- Artes (ART)

### Turma
- **6º A** - Matutino - Sala 101
  - 4 alunos matriculados
  - 3 disciplinas ativas (Matemática, Português, História)
  - Professores associados

### Notas
- 24 notas lançadas
- Bimestres 1 e 2
- Notas entre 6.0 e 10.0

### Frequências
- 360 registros
- Últimos 30 dias
- ~90% de presença

### Comunicados
- Reunião de Pais
- Festa Junina
- Recesso Escolar

### Eventos
- Feira de Ciências (30/11/2024)
- Olimpíada de Matemática (05/12/2024)

## 🧪 Testando a Integração

### Teste 1: API REST

1. Abra o navegador
2. Acesse: http://127.0.0.1:8000/api/
3. Clique em "Log in" (canto superior direito)
4. Login: admin / admin123
5. Navegue pelos endpoints

**Testar endpoints**:
```
http://127.0.0.1:8000/api/usuarios/          → Ver todos os usuários
http://127.0.0.1:8000/api/alunos/            → Ver alunos
http://127.0.0.1:8000/api/alunos/1/boletim/  → Boletim do aluno 1
http://127.0.0.1:8000/api/disciplinas/       → Ver disciplinas
http://127.0.0.1:8000/api/notas/             → Ver notas
```

### Teste 2: Admin Panel

1. Acesse: http://127.0.0.1:8000/admin/
2. Login: admin / admin123
3. Explore as tabelas:
   - Usuários
   - Alunos
   - Professores
   - Disciplinas
   - Turmas
   - Notas
   - Frequências
   - Comunicados
   - Eventos

### Teste 3: Frontend HTML

1. Abra `index.html` no navegador
2. Teste com diferentes usuários:

**Como Admin**:
```
Login: admin / admin123
- Veja o dashboard completo
- Acesse todas as funcionalidades
```

**Como Professor**:
```
Login: prof.maria / senha123
- Veja suas turmas
- Lance notas e frequências
```

**Como Aluno**:
```
Login: aluno.pedro / senha123
- Veja seu boletim
- Veja sua frequência
- Veja comunicados
```

### Teste 4: Console do Navegador

Abra `index.html`, faça login e abra o console (F12):

```javascript
// Ver usuário atual
console.log(api.currentUser);

// Buscar alunos
const alunos = await api.getAlunos();
console.log(alunos);

// Ver boletim do aluno 1
const boletim = await api.getBoletim(1);
console.log(boletim);

// Ver disciplinas
const disciplinas = await api.getDisciplinas();
console.log(disciplinas);

// Ver comunicados
const comunicados = await api.getComunicados();
console.log(comunicados);
```

## 📈 Exemplos de Uso

### Exemplo 1: Ver Boletim de um Aluno

**Via API (navegador)**:
```
http://127.0.0.1:8000/api/alunos/1/boletim/
```

**Resposta**:
```json
{
  "Matemática": {
    "bimestre_1": 8.5,
    "bimestre_2": 9.2,
    "media": 8.85
  },
  "Português": {
    "bimestre_1": 7.8,
    "bimestre_2": 8.1,
    "media": 7.95
  }
}
```

### Exemplo 2: Ver Frequência de um Aluno

**Via API**:
```
http://127.0.0.1:8000/api/alunos/1/frequencia_resumo/
```

**Resposta**:
```json
{
  "Matemática": {
    "presencas": 27,
    "faltas": 3,
    "total": 30,
    "percentual_presenca": 90.0
  }
}
```

### Exemplo 3: Listar Alunos de uma Turma

**Via API**:
```
http://127.0.0.1:8000/api/turmas/1/alunos/
```

### Exemplo 4: Criar um Novo Comunicado

**Via Admin**:
1. Acesse: http://127.0.0.1:8000/admin/escola/comunicado/add/
2. Preencha os dados
3. Selecione as turmas
4. Salve

**Via API (POST)**:
```javascript
await api.createComunicado({
    titulo: 'Novo Comunicado',
    conteudo: 'Conteúdo do comunicado...',
    tipo: 'aviso',
    autor: 1,
    turmas: [1],
    ativo: true
});
```

## 🔄 Fluxo Completo de Uso

### Cenário: Professor Lançando Notas

1. **Login como Professor**
   - Abra `index.html`
   - Login: prof.maria / senha123

2. **Ver Suas Turmas**
   ```javascript
   const turmas = await api.getTurmasProfessor(1);
   ```

3. **Lançar Nota**
   ```javascript
   await api.createNota({
       aluno: 1,
       turma_disciplina: 1,
       bimestre: 3,
       nota: 8.5,
       observacao: 'Bom desempenho'
   });
   ```

### Cenário: Aluno Consultando Boletim

1. **Login como Aluno**
   - Login: aluno.pedro / senha123

2. **Ver Boletim**
   ```javascript
   const boletim = await api.getBoletim(1);
   console.log(boletim);
   ```

3. **Ver Frequência**
   ```javascript
   const freq = await api.getFrequenciaResumo(1);
   console.log(freq);
   ```

## 🗄️ Estrutura do Banco de Dados

### Arquivo SQLite
```
gestao-escolar-2.0.0/backend/db.sqlite3
```

### Tabelas Criadas
- usuarios (12 registros)
- alunos (4 registros)
- professores (3 registros)
- disciplinas (8 registros)
- turmas (1 registro)
- turmas_disciplinas (3 registros)
- notas (24 registros)
- frequencias (360 registros)
- comunicados (3 registros)
- eventos (2 registros)

### Visualizar Banco

**Opção 1: Django Shell**
```bash
cd backend
python manage.py shell
```

```python
from escola.models import *

# Ver todos os alunos
Aluno.objects.all()

# Ver notas de um aluno
Nota.objects.filter(aluno_id=1)

# Ver frequências
Frequencia.objects.filter(aluno_id=1, presente=False)
```

**Opção 2: SQLite Browser**
- Baixe: https://sqlitebrowser.org/
- Abra: `backend/db.sqlite3`
- Navegue pelas tabelas

## 🎯 Próximos Passos

### 1. Personalizar o Sistema
- Adicione mais turmas
- Cadastre mais alunos
- Configure o ano letivo

### 2. Testar Funcionalidades
- Lance notas para o 3º bimestre
- Registre frequências
- Crie novos comunicados

### 3. Explorar Relatórios
- Boletins completos
- Relatórios de frequência
- Estatísticas por turma

### 4. Configurar para Produção
- Migrar para PostgreSQL
- Configurar servidor web
- Implementar backup automático

## 🛠️ Comandos Úteis

### Resetar Banco de Dados
```bash
cd backend
del db.sqlite3
python manage.py migrate
python setup.py
python popular_banco.py
```

### Ver Logs do Servidor
O servidor mostra todas as requisições no terminal

### Parar o Servidor
```
Ctrl + C
```

### Reiniciar o Servidor
```bash
cd backend
python manage.py runserver
```

## 📞 Suporte

### Problemas Comuns

**Frontend não conecta à API**:
- ✅ Verifique se o servidor está rodando
- ✅ Verifique a URL em `js/api.js`
- ✅ Abra o console do navegador (F12) para ver erros

**Erro de autenticação**:
- ✅ Faça login primeiro
- ✅ Verifique as credenciais
- ✅ Limpe o cache do navegador

**Dados não aparecem**:
- ✅ Verifique se o banco foi populado
- ✅ Execute `python popular_banco.py` novamente
- ✅ Verifique os logs do servidor

## 🎉 Sistema Pronto!

Seu sistema está **100% integrado e funcionando**:

✅ Backend Django rodando
✅ Banco de dados populado com dados realistas
✅ API REST completa
✅ Admin panel configurado
✅ Frontend HTML pronto para uso
✅ 12 usuários de teste
✅ Dados de exemplo (notas, frequências, comunicados)

**Comece a usar agora mesmo!** 🚀
