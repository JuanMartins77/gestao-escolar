# 🔐 Sistema de Permissões - Dashboard

## ✅ Dashboard Personalizado por Cargo

Cada usuário vê apenas o que tem permissão para acessar!

---

## 🔷 ADMINISTRADOR

### Acesso: **TOTAL**

### Estatísticas Visíveis:
- 👥 Total de Alunos
- 👨‍🏫 Professores
- 📚 Turmas
- 📊 Disciplinas

### Funcionalidades:
✅ **Gestão de Alunos** - Cadastrar, editar, visualizar  
✅ **Gestão de Professores** - Gerenciar professores  
✅ **Gestão de Turmas** - Criar e gerenciar turmas  
✅ **Gestão de Usuários** - Todos os usuários do sistema  
✅ **Configurações** - Configurações gerais  
✅ **Relatórios Gerais** - Relatórios completos  
✅ **Backup e Manutenção** - Backup do sistema  
✅ **Comunicados** - Enviar para toda escola  

### ❌ Restrições:
- Nenhuma (acesso total)

---

## 🟩 COORDENADOR

### Acesso: **PEDAGÓGICO**

### Estatísticas Visíveis:
- 📚 Turmas
- 📖 Disciplinas
- 👨‍🏫 Professores
- 👥 Alunos

### Funcionalidades:
✅ **Turmas** - Visualizar e gerenciar  
✅ **Disciplinas** - Gerenciar disciplinas  
✅ **Professores** - Visualizar professores  
✅ **Desempenho dos Alunos** - Acompanhar  
✅ **Relatórios Pedagógicos** - Desempenho e frequência  
✅ **Comunicados** - Enviar comunicados pedagógicos  

### ❌ Restrições:
- ❌ Não pode gerenciar usuários
- ❌ Não pode fazer backup
- ❌ Não pode acessar configurações do sistema

---

## 🟦 PROFESSOR

### Acesso: **MINHAS TURMAS**

### Estatísticas Visíveis:
- 📚 Minhas Turmas
- 👥 Meus Alunos
- 📝 Notas Lançadas
- 📅 Frequências

### Funcionalidades:
✅ **Minhas Turmas** - Turmas que leciono  
✅ **Lançar Notas** - Lançar e editar notas  
✅ **Lançar Faltas** - Registrar presença  
✅ **Materiais e Atividades** - Gerenciar materiais  
✅ **Desempenho da Turma** - Estatísticas das minhas turmas  

### ❌ Restrições:
- ❌ Não vê cadastros
- ❌ Não vê alunos de outras turmas
- ❌ Não vê turmas globais
- ❌ Não pode gerenciar usuários
- ❌ Não acessa configurações

---

## 🟧 SECRETÁRIA

### Acesso: **ADMINISTRATIVO**

### Estatísticas Visíveis:
- 👥 Alunos
- 📋 Matrículas
- 📄 Documentos
- 📚 Turmas

### Funcionalidades:
✅ **Cadastro de Alunos** - Cadastrar novos alunos  
✅ **Matrícula / Rematrícula** - Gerenciar matrículas  
✅ **Documentos** - Histórico, declarações, certificados  
✅ **Atualizar Informações** - Atualizar dados dos alunos  
✅ **Consultar Turmas** - Visualizar turmas e vagas  
✅ **Relatórios** - Relatórios de matrículas  

### ❌ Restrições:
- ❌ Não pode lançar notas
- ❌ Não pode lançar faltas
- ❌ Não pode gerenciar usuários
- ❌ Não acessa configurações

---

## 🟪 RESPONSÁVEL

### Acesso: **ACOMPANHAMENTO**

### Estatísticas Visíveis:
- 👨‍👩‍👧 Meus Filhos
- 📊 Média Geral
- 📅 Frequência
- 📢 Comunicados

### Funcionalidades:
✅ **Boletim** - Ver notas e desempenho  
✅ **Faltas** - Acompanhar frequência  
✅ **Comunicados** - Ver comunicados da escola  
✅ **Contatos da Escola** - Telefones e emails  
✅ **Calendário** - Eventos e atividades  

### ❌ Restrições:
- ❌ Não vê nada administrativo
- ❌ Não pode editar nada
- ❌ Apenas visualização dos filhos

---

## 🟨 ALUNO

### Acesso: **PESSOAL**

### Estatísticas Visíveis:
- 📊 Minha Média
- 📅 Frequência
- 📝 Atividades
- 📚 Disciplinas

### Funcionalidades:
✅ **Minhas Notas** - Ver boletim  
✅ **Minhas Faltas** - Acompanhar frequência  
✅ **Atividades** - Ver atividades e trabalhos  
✅ **Materiais da Turma** - Acessar materiais  
✅ **Comunicados** - Ver avisos  
✅ **Calendário** - Eventos e provas  

### ❌ Restrições:
- ❌ Não vê dados de outros alunos
- ❌ Não pode editar nada
- ❌ Apenas visualização pessoal

---

## 🔒 Como Funciona a Segurança

### 1. Verificação no Frontend
```javascript
// Arquivo: dashboard-permissions.js
// Define o que cada cargo pode ver
```

### 2. Verificação no Backend
```python
# Arquivo: api/permissions.py
# Django valida permissões na API
```

### 3. Dupla Proteção
- ✅ Frontend esconde opções não permitidas
- ✅ Backend bloqueia requisições não autorizadas

---

## 📋 Matriz de Permissões

| Funcionalidade | Admin | Coord | Prof | Secret | Resp | Aluno |
|----------------|-------|-------|------|--------|------|-------|
| Gestão de Alunos | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Gestão de Professores | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Gestão de Turmas | ✅ | ✅ | ❌ | ⚠️ | ❌ | ❌ |
| Gestão de Usuários | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Lançar Notas | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Lançar Faltas | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Ver Notas | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Ver Faltas | ✅ | ✅ | ✅ | ❌ | ✅ | ✅ |
| Matrículas | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| Documentos | ✅ | ❌ | ❌ | ✅ | ⚠️ | ⚠️ |
| Relatórios Gerais | ✅ | ⚠️ | ❌ | ⚠️ | ❌ | ❌ |
| Configurações | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Backup | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Legenda:**
- ✅ Acesso Total
- ⚠️ Acesso Parcial
- ❌ Sem Acesso

---

## 🧪 Testar Permissões

### 1. Login como Admin
```
Usuário: admin
Senha: admin123
```
**Resultado**: Vê TODAS as funcionalidades

### 2. Login como Professor
```
Usuário: prof.maria
Senha: senha123
```
**Resultado**: Vê apenas funcionalidades de professor

### 3. Login como Aluno
```
Usuário: aluno.pedro
Senha: senha123
```
**Resultado**: Vê apenas dados pessoais

---

## 🎨 Interface Personalizada

### Cada cargo vê:

**Admin**: 8 cards de funcionalidades  
**Coordenador**: 6 cards pedagógicos  
**Professor**: 5 cards de aulas  
**Secretária**: 6 cards administrativos  
**Responsável**: 5 cards de acompanhamento  
**Aluno**: 6 cards pessoais  

---

## 🔐 Segurança Implementada

### Frontend (dashboard-permissions.js):
```javascript
// Define menu e estatísticas por cargo
function getDashboardConfig(userType) {
    // Retorna apenas o que o cargo pode ver
}
```

### Backend (api/permissions.py):
```python
# Valida permissões na API
class CanManageUsers(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.tipo_usuario in ['admin', 'secretaria']
```

### Fluxo de Segurança:
```
1. Usuário faz login
   ↓
2. Sistema identifica o cargo
   ↓
3. Frontend carrega dashboard personalizado
   ↓
4. Usuário tenta acessar funcionalidade
   ↓
5. Frontend verifica permissão
   ↓
6. Se permitido, envia requisição à API
   ↓
7. Backend valida permissão novamente
   ↓
8. Se autorizado, executa ação
```

---

## ✅ Benefícios

### Segurança:
- ✅ Cada usuário vê apenas o necessário
- ✅ Dupla validação (frontend + backend)
- ✅ Impossível acessar dados não autorizados

### Usabilidade:
- ✅ Interface limpa e focada
- ✅ Menos confusão para o usuário
- ✅ Experiência personalizada

### Manutenção:
- ✅ Fácil adicionar novas permissões
- ✅ Centralizado em um arquivo
- ✅ Fácil de entender e modificar

---

## 🎉 Sistema Pronto!

O dashboard agora é **totalmente personalizado** baseado no cargo do usuário!

**Teste agora**: http://localhost:3000/index.html

Faça login com diferentes usuários e veja dashboards diferentes! 🚀
