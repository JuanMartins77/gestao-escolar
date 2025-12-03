# 🔐 Sistema de Permissões - EduGestão v2.0.0

## Hierarquia de Cargos

### 1. 👔 Administrador Geral
**Nível:** Total (100%)

**Descrição:** Responsável máximo pelo sistema. Possui acesso completo a todos os módulos.

**Permissões:**
- ✅ Criar, editar, visualizar e excluir alunos
- ✅ Criar, editar, visualizar e excluir professores
- ✅ Criar, editar, visualizar e excluir turmas
- ✅ Criar, editar, visualizar e excluir disciplinas
- ✅ Criar, editar, visualizar e excluir usuários
- ✅ Criar, editar, visualizar e excluir cursos
- ✅ Gerenciar permissões dos demais cargos
- ✅ Acessar e gerar todos os relatórios
- ✅ Configurar parâmetros do sistema (tema, backup, logs)
- ✅ Restaurar ou limpar o banco de dados
- ✅ Acessar logs do sistema
- ✅ Gerenciar acessibilidade global

**Módulos Acessíveis:**
- Dashboard completo
- Gestão de Alunos (CRUD completo)
- Gestão de Professores (CRUD completo)
- Gestão de Turmas (CRUD completo)
- Gestão de Usuários (CRUD completo)
- Notas e Avaliações (CRUD completo)
- Frequência (CRUD completo)
- Relatórios (todos)
- Configurações (todas)
- Logs do Sistema

---

### 2. 📋 Coordenador / Supervisor Escolar
**Nível:** Alto (80%)

**Descrição:** Responsável pela organização escolar, turmas e professores.

**Permissões:**
- ✅ Criar, editar e visualizar alunos
- ❌ **NÃO pode excluir alunos** (somente administrador)
- ✅ Criar, editar e excluir turmas
- ✅ Criar, editar e excluir disciplinas
- ✅ Atribuir professores às turmas
- ✅ Visualizar notas, faltas e desempenho
- ✅ Acessar relatórios pedagógicos
- ✅ Consultar cadastros de usuários (somente leitura)
- ✅ Gerar relatórios de desempenho
- ✅ Visualizar histórico escolar

**Módulos Acessíveis:**
- Dashboard pedagógico
- Gestão de Alunos (criar, editar, visualizar)
- Gestão de Professores (visualizar, atribuir)
- Gestão de Turmas (CRUD completo)
- Notas e Avaliações (visualizar, editar)
- Frequência (visualizar, editar)
- Relatórios Pedagógicos
- Calendário Escolar

**Restrições:**
- ❌ Não pode excluir alunos
- ❌ Não pode criar/editar usuários do sistema
- ❌ Não pode acessar configurações gerais
- ❌ Não pode acessar logs do sistema
- ❌ Não pode restaurar banco de dados

---

### 3. 👨‍🏫 Professor
**Nível:** Restrito ao Pedagógico (50%)

**Descrição:** Usuário que registra atividades pedagógicas e acompanha os alunos.

**Permissões:**
- ✅ Visualizar dados do aluno (informações básicas, contatos, histórico)
- ✅ Registrar notas das suas disciplinas
- ✅ Registrar faltas das suas turmas
- ✅ Adicionar observações do aluno
- ✅ Visualizar turmas e disciplinas atribuídas
- ✅ Baixar materiais e listas de chamada
- ✅ Enviar atividades ou arquivos para a turma
- ✅ Gerar relatórios das suas turmas
- ✅ Visualizar calendário escolar

**Módulos Acessíveis:**
- Dashboard do professor
- Minhas Turmas (visualizar)
- Alunos das minhas turmas (visualizar)
- Notas (registrar apenas das suas disciplinas)
- Frequência (registrar apenas das suas turmas)
- Materiais (upload/download)
- Relatórios (apenas das suas turmas)

**Restrições:**
- ❌ **NÃO pode editar dados cadastrais de alunos**
- ❌ **NÃO pode excluir alunos**
- ❌ **NÃO pode criar, editar ou excluir turmas**
- ❌ **NÃO pode criar ou editar usuários do sistema**
- ❌ **NÃO pode alterar configurações gerais**
- ❌ **NÃO pode acessar dados de outras turmas**
- ❌ **NÃO pode visualizar notas de outras disciplinas**
- ❌ **NÃO pode acessar relatórios gerais da escola**

---

### 4. 📝 Secretário(a) Escolar
**Nível:** Administrativo Médio (70%)

**Descrição:** Responsável por cadastros e documentação.

**Permissões:**
- ✅ Cadastrar alunos (CRUD completo de dados cadastrais)
- ✅ Editar informações do aluno
- ✅ Gerar documentos (declarações, históricos, comprovantes)
- ✅ Registrar matrícula, rematrícula e transferências
- ✅ Visualizar relatórios administrativos
- ✅ Atualizar dados de contato/responsáveis
- ✅ Gerenciar documentação escolar
- ✅ Emitir certificados e diplomas
- ✅ Controlar arquivo morto

**Módulos Acessíveis:**
- Dashboard administrativo
- Gestão de Alunos (criar, editar, visualizar)
- Documentos (gerar, imprimir)
- Matrículas (registrar, renovar)
- Transferências (processar)
- Relatórios Administrativos
- Arquivo de Documentos

**Restrições:**
- ❌ **NÃO pode excluir alunos**
- ❌ **NÃO pode alterar notas ou faltas**
- ❌ **NÃO pode acessar configurações gerais**
- ❌ **NÃO pode excluir turmas ou usuários**
- ❌ **NÃO pode criar/editar professores**
- ❌ **NÃO pode atribuir professores às turmas**

---

### 5. 👨‍👩‍👧 Responsável Legal
**Nível:** Somente Consulta (20%)

**Descrição:** Pai, mãe ou responsável pelo estudante.

**Permissões:**
- ✅ Visualizar notas e boletins do(s) filho(s)
- ✅ Visualizar faltas
- ✅ Ver materiais da turma
- ✅ Visualizar calendário escolar
- ✅ Visualizar comunicados da escola
- ✅ Atualizar informações de contato (com aprovação da secretaria)
- ✅ Solicitar documentos
- ✅ Visualizar histórico escolar

**Módulos Acessíveis:**
- Dashboard do responsável
- Boletim do aluno
- Frequência do aluno
- Materiais da turma
- Calendário
- Comunicados
- Solicitações

**Restrições:**
- ❌ **NÃO pode editar dados acadêmicos**
- ❌ **NÃO pode criar ou editar usuários**
- ❌ **NÃO pode editar qualquer dado do aluno** (exceto contato com aprovação)
- ❌ **NÃO pode acessar dados de outros alunos**
- ❌ **NÃO pode alterar notas ou faltas**
- ❌ **NÃO pode acessar área administrativa**

---

## Matriz de Permissões

| Funcionalidade | Admin | Coordenador | Professor | Secretário | Responsável |
|----------------|-------|-------------|-----------|------------|-------------|
| **ALUNOS** |
| Criar | ✅ | ✅ | ❌ | ✅ | ❌ |
| Visualizar | ✅ | ✅ | ✅* | ✅ | ✅** |
| Editar | ✅ | ✅ | ❌ | ✅ | ❌ |
| Excluir | ✅ | ❌ | ❌ | ❌ | ❌ |
| **PROFESSORES** |
| Criar | ✅ | ❌ | ❌ | ❌ | ❌ |
| Visualizar | ✅ | ✅ | ✅* | ❌ | ❌ |
| Editar | ✅ | ❌ | ❌ | ❌ | ❌ |
| Excluir | ✅ | ❌ | ❌ | ❌ | ❌ |
| **TURMAS** |
| Criar | ✅ | ✅ | ❌ | ❌ | ❌ |
| Visualizar | ✅ | ✅ | ✅* | ✅ | ✅** |
| Editar | ✅ | ✅ | ❌ | ❌ | ❌ |
| Excluir | ✅ | ✅ | ❌ | ❌ | ❌ |
| **NOTAS** |
| Lançar | ✅ | ✅ | ✅* | ❌ | ❌ |
| Visualizar | ✅ | ✅ | ✅* | ❌ | ✅** |
| Editar | ✅ | ✅ | ✅* | ❌ | ❌ |
| Excluir | ✅ | ❌ | ❌ | ❌ | ❌ |
| **FREQUÊNCIA** |
| Registrar | ✅ | ✅ | ✅* | ❌ | ❌ |
| Visualizar | ✅ | ✅ | ✅* | ✅ | ✅** |
| Editar | ✅ | ✅ | ✅* | ❌ | ❌ |
| **RELATÓRIOS** |
| Geral | ✅ | ✅ | ❌ | ✅ | ❌ |
| Pedagógico | ✅ | ✅ | ✅* | ❌ | ❌ |
| Administrativo | ✅ | ❌ | ❌ | ✅ | ❌ |
| Individual | ✅ | ✅ | ✅* | ✅ | ✅** |
| **CONFIGURAÇÕES** |
| Sistema | ✅ | ❌ | ❌ | ❌ | ❌ |
| Perfil | ✅ | ✅ | ✅ | ✅ | ✅ |
| Acessibilidade | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legenda:**
- ✅ = Permitido
- ❌ = Negado
- ✅* = Permitido apenas para suas turmas/disciplinas
- ✅** = Permitido apenas para seus filhos

---

## Implementação Técnica

### Estrutura de Dados do Usuário

```javascript
{
  id: "uuid",
  nome: "Nome Completo",
  email: "email@escola.com",
  cargo: "admin|coordenador|professor|secretario|responsavel",
  permissoes: {
    alunos: { criar: true, visualizar: true, editar: true, excluir: true },
    professores: { criar: true, visualizar: true, editar: true, excluir: true },
    turmas: { criar: true, visualizar: true, editar: true, excluir: true },
    notas: { lancar: true, visualizar: true, editar: true, excluir: true },
    frequencia: { registrar: true, visualizar: true, editar: true },
    relatorios: { geral: true, pedagogico: true, administrativo: true },
    configuracoes: { sistema: true, perfil: true }
  },
  turmasAtribuidas: [], // Para professores
  alunosVinculados: []  // Para responsáveis
}
```

### Verificação de Permissões

```javascript
function hasPermission(user, module, action) {
  if (user.cargo === 'admin') return true;
  
  return user.permissoes[module]?.[action] === true;
}

function canAccessStudent(user, studentId) {
  if (user.cargo === 'admin' || user.cargo === 'coordenador' || user.cargo === 'secretario') {
    return true;
  }
  
  if (user.cargo === 'professor') {
    // Verificar se o aluno está em alguma turma do professor
    return checkStudentInTeacherClasses(user.id, studentId);
  }
  
  if (user.cargo === 'responsavel') {
    // Verificar se é responsável pelo aluno
    return user.alunosVinculados.includes(studentId);
  }
  
  return false;
}
```

---

## Regras de Negócio

### 1. Exclusão de Alunos
- Apenas o **Administrador** pode excluir alunos
- Exclusão deve gerar log no sistema
- Exclusão deve ser lógica (soft delete) mantendo histórico

### 2. Alteração de Notas
- **Professor**: Pode alterar apenas notas das suas disciplinas
- **Coordenador**: Pode alterar notas de todas as disciplinas
- **Admin**: Pode alterar todas as notas
- Alterações devem gerar log com data, hora e usuário

### 3. Criação de Usuários
- Apenas **Administrador** pode criar usuários
- Novos usuários recebem email de ativação
- Senha inicial deve ser alterada no primeiro acesso

### 4. Atribuição de Turmas
- **Coordenador** e **Admin** podem atribuir professores às turmas
- Professor não pode se auto-atribuir a turmas

### 5. Acesso a Relatórios
- **Professor**: Apenas relatórios das suas turmas
- **Secretário**: Apenas relatórios administrativos
- **Coordenador**: Relatórios pedagógicos gerais
- **Admin**: Todos os relatórios

---

## Segurança

### Autenticação
- Login com email e senha
- Sessão expira após 2 horas de inatividade
- Logout automático ao fechar navegador (opcional)

### Autorização
- Verificação de permissões em cada requisição
- Token JWT com informações do cargo
- Middleware de verificação no backend

### Auditoria
- Log de todas as ações críticas
- Registro de acessos ao sistema
- Histórico de alterações em dados sensíveis

---

## Mensagens de Erro

```javascript
const PERMISSION_ERRORS = {
  NO_ACCESS: "Você não tem permissão para acessar este recurso",
  NO_CREATE: "Você não tem permissão para criar este item",
  NO_EDIT: "Você não tem permissão para editar este item",
  NO_DELETE: "Você não tem permissão para excluir este item",
  NO_VIEW: "Você não tem permissão para visualizar este item",
  RESTRICTED_AREA: "Esta área é restrita ao seu cargo"
};
```

---

## Próximos Passos

1. ✅ Documentação completa de permissões
2. ⏳ Implementar middleware de autenticação
3. ⏳ Criar sistema de verificação de permissões
4. ⏳ Implementar logs de auditoria
5. ⏳ Criar telas específicas por cargo
6. ⏳ Implementar controle de acesso no frontend
7. ⏳ Testes de segurança

---

**Versão:** 2.0.0  
**Última Atualização:** Novembro 2025  
**Status:** Em Implementação
