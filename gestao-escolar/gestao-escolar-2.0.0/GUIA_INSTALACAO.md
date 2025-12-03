# Guia de Instalação - Sistema de Gestão Escolar 2.0

## Visão Geral

Este guia fornece instruções passo a passo para instalar e configurar o Sistema de Gestão Escolar 2.0.

## Pré-requisitos

### Software Necessário

1. **Python 3.10 ou superior**
   - Download: https://www.python.org/downloads/
   - Verifique: `python --version`

2. **PostgreSQL 13 ou superior**
   - Download: https://www.postgresql.org/download/
   - Verifique: `psql --version`

3. **Git** (opcional, para clonar repositório)
   - Download: https://git-scm.com/downloads

## Instalação Passo a Passo

### 1. Preparar o Ambiente

#### Windows

```cmd
# Navegar até a pasta do projeto
cd gestao-escolar-2.0.0\backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
venv\Scripts\activate
```

#### Linux/Mac

```bash
# Navegar até a pasta do projeto
cd gestao-escolar-2.0.0/backend

# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate
```

### 2. Instalar Dependências

```bash
pip install -r requirements.txt
```

### 3. Configurar Banco de Dados PostgreSQL

#### Criar Banco de Dados

Abra o terminal do PostgreSQL (psql) e execute:

```sql
-- Criar banco de dados
CREATE DATABASE gestao_escolar;

-- Criar usuário
CREATE USER gestao_user WITH PASSWORD 'sua_senha_segura';

-- Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE gestao_escolar TO gestao_user;

-- Conectar ao banco
\c gestao_escolar

-- Conceder privilégios no schema
GRANT ALL ON SCHEMA public TO gestao_user;
```

#### Executar Schema SQL

```bash
# Windows
psql -U gestao_user -d gestao_escolar -f ..\database\schema.sql

# Linux/Mac
psql -U gestao_user -d gestao_escolar -f ../database/schema.sql
```

#### Carregar Dados de Exemplo (Opcional)

```bash
# Windows
psql -U gestao_user -d gestao_escolar -f ..\database\seed_data.sql

# Linux/Mac
psql -U gestao_user -d gestao_escolar -f ../database/seed_data.sql
```

### 4. Configurar Variáveis de Ambiente

Copie o arquivo de exemplo:

```bash
# Windows
copy .env.example .env

# Linux/Mac
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:

```env
SECRET_KEY=sua-chave-secreta-aqui-gere-uma-nova
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

DATABASE_NAME=gestao_escolar
DATABASE_USER=gestao_user
DATABASE_PASSWORD=sua_senha_segura
DATABASE_HOST=localhost
DATABASE_PORT=5432

CORS_ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

**Gerar SECRET_KEY:**

```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 5. Executar Migrações Django

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Configuração Inicial

Execute o script de setup:

```bash
python setup.py
```

Este script irá:
- Criar usuário administrador padrão
- Criar disciplinas básicas
- Criar turma de exemplo

### 7. Criar Superusuário (Alternativa)

Se preferir criar manualmente:

```bash
python manage.py createsuperuser
```

### 8. Coletar Arquivos Estáticos

```bash
python manage.py collectstatic --noinput
```

### 9. Executar o Servidor

```bash
python manage.py runserver
```

O sistema estará disponível em:
- **Frontend**: http://localhost:8000
- **API**: http://localhost:8000/api
- **Admin**: http://localhost:8000/admin

## Credenciais Padrão

Após executar o `setup.py`:

- **Usuário**: admin
- **Senha**: admin123

⚠️ **IMPORTANTE**: Altere a senha padrão imediatamente!

## Verificação da Instalação

### 1. Testar API

Acesse: http://localhost:8000/api

Você deve ver a lista de endpoints disponíveis.

### 2. Testar Admin

Acesse: http://localhost:8000/admin

Faça login com as credenciais do administrador.

### 3. Testar Endpoints

```bash
# Listar usuários (requer autenticação)
curl http://localhost:8000/api/usuarios/

# Listar disciplinas
curl http://localhost:8000/api/disciplinas/
```

## Estrutura de Pastas

```
gestao-escolar-2.0.0/
├── backend/                 # Backend Django
│   ├── config/             # Configurações
│   ├── escola/             # App principal
│   ├── api/                # API REST
│   ├── manage.py
│   ├── requirements.txt
│   └── .env
├── database/               # Scripts SQL
│   ├── schema.sql
│   └── seed_data.sql
├── index.html             # Frontend
├── dashboard.html
└── cadastro.html
```

## Solução de Problemas

### Erro: "psycopg2 not found"

```bash
pip install psycopg2-binary
```

### Erro: "Permission denied" no PostgreSQL

Execute como superusuário do PostgreSQL:

```sql
ALTER USER gestao_user CREATEDB;
```

### Erro: "Port 8000 already in use"

Use outra porta:

```bash
python manage.py runserver 8080
```

### Erro de Migração

Limpe e recrie as migrações:

```bash
python manage.py migrate --fake escola zero
python manage.py migrate escola
```

## Próximos Passos

1. **Configurar Frontend**: Conecte os arquivos HTML à API
2. **Personalizar**: Ajuste cores, logos e textos
3. **Adicionar Usuários**: Crie professores, alunos e secretaria
4. **Configurar Turmas**: Defina turmas e disciplinas
5. **Testar Sistema**: Navegue pelas funcionalidades

## Suporte

Para problemas ou dúvidas:
1. Verifique os logs: `python manage.py runserver` mostra erros
2. Consulte a documentação do Django: https://docs.djangoproject.com
3. Revise o arquivo `SISTEMA_PERMISSOES.md` para entender as permissões

## Segurança

### Antes de ir para Produção:

1. ✓ Altere `DEBUG=False`
2. ✓ Configure `SECRET_KEY` única e segura
3. ✓ Configure `ALLOWED_HOSTS` corretamente
4. ✓ Use HTTPS (SSL/TLS)
5. ✓ Configure firewall
6. ✓ Faça backup regular do banco de dados
7. ✓ Altere todas as senhas padrão
8. ✓ Configure logs de auditoria
9. ✓ Implemente rate limiting
10. ✓ Configure CORS adequadamente
