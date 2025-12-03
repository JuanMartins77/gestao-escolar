# Sistema de Gestão Escolar - Backend Django

Backend completo do sistema de gestão escolar com Django REST Framework.

## Requisitos

- Python 3.10+
- PostgreSQL 13+
- pip ou virtualenv

## Instalação

### 1. Criar ambiente virtual

```bash
python -m venv venv
```

### 2. Ativar ambiente virtual

Windows:
```bash
venv\Scripts\activate
```

Linux/Mac:
```bash
source venv/bin/activate
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

### 4. Configurar banco de dados

Crie um banco de dados PostgreSQL:

```sql
CREATE DATABASE gestao_escolar;
CREATE USER gestao_user WITH PASSWORD 'sua_senha';
GRANT ALL PRIVILEGES ON DATABASE gestao_escolar TO gestao_user;
```

### 5. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```bash
copy .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 6. Executar o schema SQL

Execute o arquivo `database/schema.sql` no PostgreSQL:

```bash
psql -U gestao_user -d gestao_escolar -f ../database/schema.sql
```

### 7. Criar migrações Django

```bash
python manage.py makemigrations
python manage.py migrate
```

### 8. Criar superusuário

```bash
python manage.py createsuperuser
```

### 9. Executar servidor

```bash
python manage.py runserver
```

O servidor estará disponível em: http://localhost:8000

## Endpoints da API

### Autenticação
- `GET /api/usuarios/me/` - Dados do usuário logado
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout

### Usuários
- `GET /api/usuarios/` - Listar usuários
- `POST /api/usuarios/` - Criar usuário
- `GET /api/usuarios/{id}/` - Detalhes do usuário
- `PUT /api/usuarios/{id}/` - Atualizar usuário
- `DELETE /api/usuarios/{id}/` - Deletar usuário
- `GET /api/usuarios/por_tipo/?tipo=aluno` - Filtrar por tipo

### Alunos
- `GET /api/alunos/` - Listar alunos
- `POST /api/alunos/` - Criar aluno
- `GET /api/alunos/{id}/` - Detalhes do aluno
- `GET /api/alunos/{id}/boletim/` - Boletim do aluno
- `GET /api/alunos/{id}/frequencia_resumo/` - Resumo de frequência

### Professores
- `GET /api/professores/` - Listar professores
- `GET /api/professores/{id}/turmas/` - Turmas do professor

### Turmas
- `GET /api/turmas/` - Listar turmas
- `POST /api/turmas/` - Criar turma
- `GET /api/turmas/{id}/alunos/` - Alunos da turma
- `GET /api/turmas/{id}/disciplinas/` - Disciplinas da turma

### Notas
- `GET /api/notas/` - Listar notas
- `POST /api/notas/` - Lançar nota
- `GET /api/notas/?aluno={id}` - Notas de um aluno
- `GET /api/notas/?turma={id}&bimestre={1-4}` - Notas por turma e bimestre

### Frequências
- `GET /api/frequencias/` - Listar frequências
- `POST /api/frequencias/` - Registrar frequência
- `GET /api/frequencias/?aluno={id}` - Frequências de um aluno

### Comunicados
- `GET /api/comunicados/` - Listar comunicados
- `POST /api/comunicados/` - Criar comunicado

### Eventos
- `GET /api/eventos/` - Listar eventos
- `POST /api/eventos/` - Criar evento

## Permissões por Tipo de Usuário

### Administrador
- Acesso total ao sistema
- Gerenciar todos os usuários
- Configurações do sistema

### Secretaria
- Gerenciar alunos, professores e responsáveis
- Gerenciar turmas e matrículas
- Visualizar relatórios

### Coordenador
- Gerenciar professores e disciplinas
- Editar notas e frequências
- Criar comunicados e eventos

### Professor
- Lançar notas e frequências
- Visualizar turmas e alunos
- Criar comunicados para suas turmas

### Aluno
- Visualizar próprias notas e frequências
- Visualizar comunicados e eventos
- Atualizar perfil

### Responsável
- Visualizar dados dos alunos vinculados
- Receber comunicados
- Visualizar eventos

## Estrutura do Projeto

```
backend/
├── config/              # Configurações do Django
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── escola/              # App principal
│   ├── models.py        # Modelos do banco
│   ├── admin.py         # Interface admin
│   └── migrations/
├── api/                 # API REST
│   ├── views.py         # ViewSets
│   ├── serializers.py   # Serializers
│   ├── permissions.py   # Permissões customizadas
│   └── urls.py
├── manage.py
└── requirements.txt
```

## Comandos Úteis

### Criar migrações
```bash
python manage.py makemigrations
```

### Aplicar migrações
```bash
python manage.py migrate
```

### Criar superusuário
```bash
python manage.py createsuperuser
```

### Coletar arquivos estáticos
```bash
python manage.py collectstatic
```

### Executar testes
```bash
python manage.py test
```

### Shell interativo
```bash
python manage.py shell
```

## Admin Interface

Acesse o painel administrativo em: http://localhost:8000/admin

Use as credenciais do superusuário criado.

## Desenvolvimento

Para desenvolvimento, certifique-se de que `DEBUG=True` no arquivo `.env`.

## Produção

Para produção:
1. Configure `DEBUG=False`
2. Configure `SECRET_KEY` com valor seguro
3. Configure `ALLOWED_HOSTS` adequadamente
4. Use servidor WSGI (Gunicorn, uWSGI)
5. Configure servidor web (Nginx, Apache)
6. Configure SSL/HTTPS
