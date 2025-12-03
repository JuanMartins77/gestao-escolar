# API Reference - Sistema de Gestão Escolar

## Base URL

```
http://localhost:8000/api
```

## Autenticação

A API usa autenticação de sessão do Django. Faça login através do endpoint de autenticação ou pelo admin.

### Login

```http
POST /api/auth/login/
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

### Logout

```http
POST /api/auth/logout/
```

### Usuário Atual

```http
GET /api/usuarios/me/
```

## Endpoints

### Usuários

#### Listar Usuários
```http
GET /api/usuarios/
```

#### Criar Usuário
```http
POST /api/usuarios/
Content-Type: application/json

{
  "username": "joao.silva",
  "email": "joao@escola.com",
  "first_name": "João",
  "last_name": "Silva",
  "password": "senha123",
  "tipo_usuario": "professor",
  "cpf": "123.456.789-00",
  "telefone": "(11) 98765-4321",
  "data_nascimento": "1985-05-15"
}
```

#### Filtrar por Tipo
```http
GET /api/usuarios/por_tipo/?tipo=professor
```

Tipos disponíveis: `admin`, `secretaria`, `coordenador`, `professor`, `aluno`, `responsavel`

### Alunos

#### Listar Alunos
```http
GET /api/alunos/
```

#### Criar Aluno
```http
POST /api/alunos/
Content-Type: application/json

{
  "usuario": 1,
  "matricula": "2024001",
  "data_matricula": "2024-02-01",
  "turma_atual": 1,
  "responsavel": 2,
  "endereco": "Rua das Flores, 123",
  "observacoes": "Aluno dedicado"
}
```

#### Boletim do Aluno
```http
GET /api/alunos/{id}/boletim/
```

Resposta:
```json
{
  "Matemática": {
    "bimestre_1": 8.5,
    "bimestre_2": 9.0,
    "media": 8.75
  },
  "Português": {
    "bimestre_1": 7.5,
    "bimestre_2": 8.0,
    "media": 7.75
  }
}
```

#### Resumo de Frequência
```http
GET /api/alunos/{id}/frequencia_resumo/
```

Resposta:
```json
{
  "Matemática": {
    "presencas": 38,
    "faltas": 2,
    "total": 40,
    "percentual_presenca": 95.0
  }
}
```

### Professores

#### Listar Professores
```http
GET /api/professores/
```

#### Turmas do Professor
```http
GET /api/professores/{id}/turmas/
```

### Disciplinas

#### Listar Disciplinas
```http
GET /api/disciplinas/
```

#### Criar Disciplina
```http
POST /api/disciplinas/
Content-Type: application/json

{
  "nome": "Física",
  "codigo": "FIS",
  "descricao": "Disciplina de Física",
  "carga_horaria": 80,
  "ativa": true
}
```

### Turmas

#### Listar Turmas
```http
GET /api/turmas/
```

#### Criar Turma
```http
POST /api/turmas/
Content-Type: application/json

{
  "nome": "7º A",
  "ano_letivo": 2024,
  "serie": "7º Ano",
  "turno": "matutino",
  "capacidade_maxima": 30,
  "sala": "102",
  "ativa": true
}
```

Turnos disponíveis: `matutino`, `vespertino`, `noturno`

#### Alunos da Turma
```http
GET /api/turmas/{id}/alunos/
```

#### Disciplinas da Turma
```http
GET /api/turmas/{id}/disciplinas/
```

### Notas

#### Listar Notas
```http
GET /api/notas/
```

#### Filtrar Notas
```http
# Por aluno
GET /api/notas/?aluno=1

# Por turma
GET /api/notas/?turma=1

# Por bimestre
GET /api/notas/?bimestre=1

# Combinado
GET /api/notas/?aluno=1&bimestre=2
```

#### Lançar Nota
```http
POST /api/notas/
Content-Type: application/json

{
  "aluno": 1,
  "turma_disciplina": 1,
  "bimestre": 1,
  "nota": 8.5,
  "observacao": "Bom desempenho"
}
```

Validações:
- Bimestre: 1 a 4
- Nota: 0.0 a 10.0

### Frequências

#### Listar Frequências
```http
GET /api/frequencias/
```

#### Filtrar Frequências
```http
# Por aluno
GET /api/frequencias/?aluno=1

# Por período
GET /api/frequencias/?data_inicio=2024-01-01&data_fim=2024-03-31

# Por turma
GET /api/frequencias/?turma=1
```

#### Registrar Frequência
```http
POST /api/frequencias/
Content-Type: application/json

{
  "aluno": 1,
  "turma_disciplina": 1,
  "data": "2024-03-15",
  "presente": true,
  "justificativa": ""
}
```

#### Registrar Falta Justificada
```http
POST /api/frequencias/
Content-Type: application/json

{
  "aluno": 1,
  "turma_disciplina": 1,
  "data": "2024-03-15",
  "presente": false,
  "justificativa": "Atestado médico"
}
```

### Comunicados

#### Listar Comunicados
```http
GET /api/comunicados/
```

#### Criar Comunicado
```http
POST /api/comunicados/
Content-Type: application/json

{
  "titulo": "Reunião de Pais",
  "conteudo": "Informamos que haverá reunião de pais...",
  "tipo": "aviso",
  "autor": 1,
  "turmas": [1, 2, 3],
  "data_expiracao": "2024-04-30",
  "ativo": true
}
```

Tipos disponíveis: `geral`, `urgente`, `evento`, `aviso`

### Eventos

#### Listar Eventos
```http
GET /api/eventos/
```

#### Criar Evento
```http
POST /api/eventos/
Content-Type: application/json

{
  "titulo": "Festa Junina",
  "descricao": "Festa junina da escola com apresentações...",
  "data_inicio": "2024-06-15T14:00:00",
  "data_fim": "2024-06-15T18:00:00",
  "local": "Quadra da escola",
  "organizador": 1,
  "turmas": [1, 2, 3],
  "publico": true
}
```

## Permissões por Endpoint

### Administrador
- ✓ Acesso total a todos os endpoints
- ✓ Criar, editar e deletar qualquer recurso

### Secretaria
- ✓ Gerenciar usuários (exceto admin)
- ✓ Gerenciar alunos e matrículas
- ✓ Gerenciar turmas
- ✓ Visualizar relatórios
- ✗ Lançar notas e frequências

### Coordenador
- ✓ Gerenciar professores
- ✓ Gerenciar disciplinas
- ✓ Editar notas e frequências
- ✓ Criar comunicados e eventos
- ✗ Gerenciar usuários admin

### Professor
- ✓ Lançar notas e frequências (suas turmas)
- ✓ Visualizar alunos (suas turmas)
- ✓ Criar comunicados (suas turmas)
- ✗ Editar turmas
- ✗ Gerenciar usuários

### Aluno
- ✓ Visualizar próprias notas
- ✓ Visualizar própria frequência
- ✓ Visualizar comunicados
- ✓ Visualizar eventos
- ✗ Editar qualquer dado

### Responsável
- ✓ Visualizar dados dos alunos vinculados
- ✓ Visualizar comunicados
- ✓ Visualizar eventos
- ✗ Editar dados

## Códigos de Status HTTP

- `200 OK` - Requisição bem-sucedida
- `201 Created` - Recurso criado com sucesso
- `204 No Content` - Recurso deletado com sucesso
- `400 Bad Request` - Dados inválidos
- `401 Unauthorized` - Não autenticado
- `403 Forbidden` - Sem permissão
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erro no servidor

## Paginação

A API retorna resultados paginados por padrão (20 itens por página).

```http
GET /api/alunos/?page=2
```

Resposta:
```json
{
  "count": 45,
  "next": "http://localhost:8000/api/alunos/?page=3",
  "previous": "http://localhost:8000/api/alunos/?page=1",
  "results": [...]
}
```

## Exemplos de Uso

### Exemplo 1: Lançar Notas de uma Turma

```javascript
// Lançar nota para vários alunos
const notas = [
  { aluno: 1, turma_disciplina: 1, bimestre: 1, nota: 8.5 },
  { aluno: 2, turma_disciplina: 1, bimestre: 1, nota: 9.0 },
  { aluno: 3, turma_disciplina: 1, bimestre: 1, nota: 7.5 }
];

for (const nota of notas) {
  await fetch('http://localhost:8000/api/notas/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nota)
  });
}
```

### Exemplo 2: Registrar Frequência Diária

```javascript
// Registrar presença de todos os alunos
const alunos = [1, 2, 3, 4, 5];
const data = '2024-03-15';
const turmaDisciplina = 1;

for (const alunoId of alunos) {
  await fetch('http://localhost:8000/api/frequencias/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      aluno: alunoId,
      turma_disciplina: turmaDisciplina,
      data: data,
      presente: true
    })
  });
}
```

### Exemplo 3: Buscar Boletim Completo

```javascript
// Buscar boletim de um aluno
const alunoId = 1;
const response = await fetch(`http://localhost:8000/api/alunos/${alunoId}/boletim/`);
const boletim = await response.json();

console.log('Boletim:', boletim);
// Exibir médias por disciplina
for (const [disciplina, dados] of Object.entries(boletim)) {
  console.log(`${disciplina}: Média ${dados.media}`);
}
```

## Testando a API

### Com cURL

```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  -c cookies.txt

# Listar alunos (usando cookies)
curl http://localhost:8000/api/alunos/ -b cookies.txt

# Criar disciplina
curl -X POST http://localhost:8000/api/disciplinas/ \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"nome":"Química","codigo":"QUI","carga_horaria":60}'
```

### Com Postman

1. Importe a coleção de endpoints
2. Configure autenticação (Session)
3. Faça login primeiro
4. Teste os endpoints

### Com JavaScript (Fetch)

```javascript
// Configurar fetch com credenciais
const fetchAPI = async (url, options = {}) => {
  return fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
};

// Usar
const alunos = await fetchAPI('http://localhost:8000/api/alunos/');
const data = await alunos.json();
```
