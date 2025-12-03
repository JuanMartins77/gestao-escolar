# Sistema de Gestão Escolar 2.0

Sistema completo de gestão escolar com frontend moderno e backend Django REST API.

## 🚀 Características

### Frontend
- ✅ Interface moderna e responsiva
- ✅ Sistema de login integrado
- ✅ Dashboard com estatísticas
- ✅ Cadastro de usuários multi-etapas
- ✅ Integração completa com API

### Backend
- ✅ Django REST Framework
- ✅ PostgreSQL database
- ✅ Sistema de permissões por tipo de usuário
- ✅ API RESTful completa
- ✅ Autenticação de sessão
- ✅ Admin interface

### Funcionalidades
- 👥 Gestão de usuários (Admin, Secretaria, Coordenador, Professor, Aluno, Responsável)
- 📚 Gestão de disciplinas e turmas
- 📊 Lançamento de notas e frequências
- 📢 Comunicados e eventos
- 📈 Relatórios e boletins
- 🔐 Sistema de permissões robusto

## 📋 Requisitos

- Python 3.10+
- PostgreSQL 13+
- Navegador moderno (Chrome, Firefox, Edge)

## 🛠️ Instalação Rápida

### 1. Configurar Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar (Windows)
venv\Scripts\activate

# Ativar (Linux/Mac)
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Configurar .env
copy .env.example .env
# Edite o .env com suas configurações

# Criar banco de dados PostgreSQL
psql -U postgres
CREATE DATABASE gestao_escolar;
\q

# Executar schema
psql -U postgres -d gestao_escolar -f ../database/schema.sql

# Executar migrações
python manage.py makemigrations
python manage.py migrate

# Configuração inicial (cria admin, disciplinas, etc)
python setup.py

# Iniciar servidor
python manage.py runserver
```

### 2. Acessar Sistema

Abra o navegador e acesse:
- **Frontend**: Abra `index.html` no navegador
- **API**: http://localhost:8000/api
- **Admin**: http://localhost:8000/admin

### Credenciais Padrão

- **Usuário**: admin
- **Senha**: admin123

⚠️ **Altere a senha padrão imediatamente!**

## 📁 Estrutura do Projeto

```
gestao-escolar-2.0.0/
├── backend/                    # Backend Django
│   ├── config/                # Configurações Django
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── escola/                # App principal
│   │   ├── models.py         # Modelos do banco
│   │   ├── admin.py          # Interface admin
│   │   └── migrations/
│   ├── api/                   # API REST
│   │   ├── views.py          # ViewSets
│   │   ├── serializers.py    # Serializers
│   │   ├── permissions.py    # Permissões
│   │   └── urls.py
│   ├── manage.py
│   ├── setup.py              # Script de configuração
│   ├── requirements.txt
│   └── README.md
├── database/                  # Scripts SQL
│   ├── schema.sql            # Schema do banco
│   └── seed_data.sql         # Dados de exemplo
├── js/                        # JavaScript
│   └── api.js                # Cliente API
├── index.html                 # Página de login
├── dashboard.html             # Dashboard principal
├── cadastro.html              # Cadastro de usuários
├── SISTEMA_PERMISSOES.md      # Documentação de permissões
├── API_REFERENCE.md           # Referência da API
├── GUIA_INSTALACAO.md         # Guia detalhado
└── README.md                  # Este arquivo
```

## 🔐 Sistema de Permissões

### Administrador
- Acesso total ao sistema
- Gerenciar todos os usuários
- Configurações do sistema

### Secretaria
- Gerenciar alunos e matrículas
- Gerenciar turmas
- Visualizar relatórios

### Coordenador
- Gerenciar professores e disciplinas
- Editar notas e frequências
- Criar comunicados

### Professor
- Lançar notas e frequências
- Visualizar suas turmas
- Criar comunicados para turmas

### Aluno
- Visualizar próprias notas
- Visualizar frequência
- Ver comunicados e eventos

### Responsável
- Visualizar dados dos alunos vinculados
- Receber comunicados

Veja `SISTEMA_PERMISSOES.md` para detalhes completos.

## 📡 API Endpoints

### Principais Endpoints

```
GET  /api/usuarios/          # Listar usuários
POST /api/usuarios/          # Criar usuário
GET  /api/usuarios/me/       # Usuário atual

GET  /api/alunos/            # Listar alunos
GET  /api/alunos/{id}/boletim/  # Boletim do aluno

GET  /api/turmas/            # Listar turmas
GET  /api/turmas/{id}/alunos/   # Alunos da turma

POST /api/notas/             # Lançar nota
POST /api/frequencias/       # Registrar frequência

GET  /api/comunicados/       # Listar comunicados
GET  /api/eventos/           # Listar eventos
```

Veja `API_REFERENCE.md` para documentação completa.

## 🎯 Uso Básico

### 1. Fazer Login

```javascript
// No frontend (já integrado)
await api.login('admin', 'admin123');
```

### 2. Criar Aluno

```javascript
// Primeiro criar usuário
const usuario = await api.createUsuario({
    username: 'joao.silva',
    email: 'joao@escola.com',
    first_name: 'João',
    last_name: 'Silva',
    password: 'senha123',
    tipo_usuario: 'aluno',
    cpf: '123.456.789-00'
});

// Depois criar perfil de aluno
const aluno = await api.createAluno({
    usuario: usuario.id,
    matricula: '2024001',
    data_matricula: '2024-02-01',
    turma_atual: 1
});
```

### 3. Lançar Nota

```javascript
await api.createNota({
    aluno: 1,
    turma_disciplina: 1,
    bimestre: 1,
    nota: 8.5,
    observacao: 'Bom desempenho'
});
```

### 4. Buscar Boletim

```javascript
const boletim = await api.getBoletim(1);
console.log(boletim);
// {
//   "Matemática": { "bimestre_1": 8.5, "media": 8.5 },
//   "Português": { "bimestre_1": 9.0, "media": 9.0 }
// }
```

## 🧪 Testando o Sistema

### Testar API com cURL

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Listar alunos
curl http://localhost:8000/api/alunos/ -b cookies.txt
```

### Testar Frontend

1. Abra `index.html` no navegador
2. Faça login com: admin / admin123
3. Navegue pelo dashboard
4. Teste as funcionalidades

## 📊 Banco de Dados

### Tabelas Principais

- `usuarios` - Usuários do sistema
- `alunos` - Perfis de alunos
- `professores` - Perfis de professores
- `disciplinas` - Disciplinas
- `turmas` - Turmas
- `turmas_disciplinas` - Relação turma-disciplina-professor
- `notas` - Notas dos alunos
- `frequencias` - Frequências
- `comunicados` - Comunicados
- `eventos` - Eventos

Veja `database/schema.sql` para estrutura completa.

## 🔧 Comandos Úteis

### Backend

```bash
# Criar migrações
python manage.py makemigrations

# Aplicar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Executar testes
python manage.py test

# Shell interativo
python manage.py shell

# Coletar arquivos estáticos
python manage.py collectstatic
```

### Banco de Dados

```bash
# Backup
pg_dump -U postgres gestao_escolar > backup.sql

# Restaurar
psql -U postgres gestao_escolar < backup.sql

# Conectar ao banco
psql -U postgres -d gestao_escolar
```

## 🚀 Deploy em Produção

### Checklist

- [ ] Configure `DEBUG=False`
- [ ] Configure `SECRET_KEY` segura
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use servidor WSGI (Gunicorn)
- [ ] Configure servidor web (Nginx)
- [ ] Configure SSL/HTTPS
- [ ] Configure firewall
- [ ] Altere senhas padrão
- [ ] Configure backup automático
- [ ] Configure logs
- [ ] Configure monitoramento

### Exemplo com Gunicorn

```bash
# Instalar Gunicorn
pip install gunicorn

# Executar
gunicorn config.wsgi:application --bind 0.0.0.0:8000
```

## 📚 Documentação Adicional

- `GUIA_INSTALACAO.md` - Guia detalhado de instalação
- `API_REFERENCE.md` - Referência completa da API
- `SISTEMA_PERMISSOES.md` - Sistema de permissões
- `backend/README.md` - Documentação do backend

## 🐛 Solução de Problemas

### Erro: "Port 8000 already in use"

```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8000 | xargs kill -9
```

### Erro: "psycopg2 not found"

```bash
pip install psycopg2-binary
```

### Erro: "Permission denied" PostgreSQL

```sql
ALTER USER gestao_user CREATEDB;
GRANT ALL PRIVILEGES ON DATABASE gestao_escolar TO gestao_user;
```

### Frontend não conecta à API

1. Verifique se o backend está rodando
2. Verifique CORS no `settings.py`
3. Verifique a URL da API em `js/api.js`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto é de código aberto e está disponível sob a licença MIT.

## 👥 Suporte

Para dúvidas ou problemas:
- Consulte a documentação
- Verifique os logs do servidor
- Revise as configurações

## 🎓 Próximos Passos

1. ✅ Sistema básico implementado
2. 🔄 Adicionar relatórios avançados
3. 🔄 Implementar notificações em tempo real
4. 🔄 Adicionar exportação de dados (PDF, Excel)
5. 🔄 Implementar chat entre usuários
6. 🔄 Adicionar calendário acadêmico
7. 🔄 Implementar sistema de tarefas/trabalhos

---

**Desenvolvido com ❤️ para facilitar a gestão escolar**
