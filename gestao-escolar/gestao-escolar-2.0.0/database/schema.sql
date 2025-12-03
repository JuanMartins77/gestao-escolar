-- ==========================================
-- EDUGESTÃO v2.0.0 - SCHEMA DO BANCO DE DADOS
-- Sistema de Gestão Escolar
-- ==========================================

-- Limpar banco (cuidado em produção!)
DROP TABLE IF EXISTS logs_sistema;
DROP TABLE IF EXISTS documentos;
DROP TABLE IF EXISTS materiais;
DROP TABLE IF EXISTS frequencia;
DROP TABLE IF EXISTS notas;
DROP TABLE IF EXISTS matriculas;
DROP TABLE IF EXISTS turma_disciplina_professor;
DROP TABLE IF EXISTS turma_aluno;
DROP TABLE IF EXISTS disciplinas;
DROP TABLE IF EXISTS turmas;
DROP TABLE IF EXISTS alunos;
DROP TABLE IF EXISTS responsaveis;
DROP TABLE IF EXISTS usuarios;

-- ==========================================
-- TABELA: usuarios
-- ==========================================
CREATE TABLE usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    telefone VARCHAR(15),
    telefone_alternativo VARCHAR(15),
    data_nascimento DATE,
    cargo VARCHAR(20) NOT NULL CHECK(cargo IN ('admin', 'coordenador', 'professor', 'secretario', 'responsavel')),
    status VARCHAR(20) DEFAULT 'ativo' CHECK(status IN ('ativo', 'inativo', 'suspenso')),
    foto_perfil TEXT,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso DATETIME,
    criado_por INTEGER,
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);

-- Índices para performance
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_cpf ON usuarios(cpf);
CREATE INDEX idx_usuarios_cargo ON usuarios(cargo);
CREATE INDEX idx_usuarios_status ON usuarios(status);

-- ==========================================
-- TABELA: responsaveis
-- ==========================================
CREATE TABLE responsaveis (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER UNIQUE,
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL,
    rg VARCHAR(20),
    email VARCHAR(150),
    telefone VARCHAR(15) NOT NULL,
    telefone_trabalho VARCHAR(15),
    endereco TEXT,
    cep VARCHAR(10),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    profissao VARCHAR(100),
    local_trabalho VARCHAR(200),
    parentesco VARCHAR(50) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE INDEX idx_responsaveis_cpf ON responsaveis(cpf);
CREATE INDEX idx_responsaveis_usuario ON responsaveis(usuario_id);

-- ==========================================
-- TABELA: alunos
-- ==========================================
CREATE TABLE alunos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(200) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    rg VARCHAR(20),
    data_nascimento DATE NOT NULL,
    sexo VARCHAR(1) CHECK(sexo IN ('M', 'F', 'O')),
    email VARCHAR(150),
    telefone VARCHAR(15),
    endereco TEXT,
    cep VARCHAR(10),
    cidade VARCHAR(100),
    estado VARCHAR(2),
    responsavel1_id INTEGER NOT NULL,
    responsavel2_id INTEGER,
    foto_perfil TEXT,
    necessidades_especiais TEXT,
    tipo_sanguineo VARCHAR(5),
    alergias TEXT,
    medicamentos TEXT,
    observacoes TEXT,
    status VARCHAR(20) DEFAULT 'ativo' CHECK(status IN ('ativo', 'inativo', 'transferido', 'concluido')),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_inativacao DATETIME,
    cadastrado_por INTEGER,
    FOREIGN KEY (responsavel1_id) REFERENCES responsaveis(id),
    FOREIGN KEY (responsavel2_id) REFERENCES responsaveis(id),
    FOREIGN KEY (cadastrado_por) REFERENCES usuarios(id)
);

CREATE INDEX idx_alunos_matricula ON alunos(matricula);
CREATE INDEX idx_alunos_cpf ON alunos(cpf);
CREATE INDEX idx_alunos_status ON alunos(status);
CREATE INDEX idx_alunos_responsavel1 ON alunos(responsavel1_id);

-- ==========================================
-- TABELA: turmas
-- ==========================================
CREATE TABLE turmas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    ano_letivo INTEGER NOT NULL,
    serie VARCHAR(50) NOT NULL,
    turno VARCHAR(20) CHECK(turno IN ('matutino', 'vespertino', 'noturno', 'integral')),
    sala VARCHAR(20),
    capacidade_maxima INTEGER DEFAULT 40,
    vagas_disponiveis INTEGER,
    coordenador_id INTEGER,
    status VARCHAR(20) DEFAULT 'ativa' CHECK(status IN ('ativa', 'inativa', 'encerrada')),
    data_inicio DATE,
    data_fim DATE,
    observacoes TEXT,
    criado_por INTEGER,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coordenador_id) REFERENCES usuarios(id),
    FOREIGN KEY (criado_por) REFERENCES usuarios(id)
);

CREATE INDEX idx_turmas_codigo ON turmas(codigo);
CREATE INDEX idx_turmas_ano_letivo ON turmas(ano_letivo);
CREATE INDEX idx_turmas_status ON turmas(status);

-- ==========================================
-- TABELA: disciplinas
-- ==========================================
CREATE TABLE disciplinas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    carga_horaria INTEGER,
    ementa TEXT,
    status VARCHAR(20) DEFAULT 'ativa' CHECK(status IN ('ativa', 'inativa')),
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_disciplinas_codigo ON disciplinas(codigo);
CREATE INDEX idx_disciplinas_status ON disciplinas(status);

-- ==========================================
-- TABELA: turma_aluno (Matrículas em Turmas)
-- ==========================================
CREATE TABLE turma_aluno (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    turma_id INTEGER NOT NULL,
    aluno_id INTEGER NOT NULL,
    data_matricula DATE NOT NULL,
    data_saida DATE,
    status VARCHAR(20) DEFAULT 'ativo' CHECK(status IN ('ativo', 'transferido', 'concluido', 'cancelado')),
    observacoes TEXT,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    UNIQUE(turma_id, aluno_id)
);

CREATE INDEX idx_turma_aluno_turma ON turma_aluno(turma_id);
CREATE INDEX idx_turma_aluno_aluno ON turma_aluno(aluno_id);
CREATE INDEX idx_turma_aluno_status ON turma_aluno(status);

-- ==========================================
-- TABELA: turma_disciplina_professor
-- ==========================================
CREATE TABLE turma_disciplina_professor (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    turma_id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,
    ano_letivo INTEGER NOT NULL,
    carga_horaria_semanal INTEGER,
    data_inicio DATE,
    data_fim DATE,
    status VARCHAR(20) DEFAULT 'ativo' CHECK(status IN ('ativo', 'inativo')),
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    UNIQUE(turma_id, disciplina_id, professor_id, ano_letivo)
);

CREATE INDEX idx_tdp_turma ON turma_disciplina_professor(turma_id);
CREATE INDEX idx_tdp_disciplina ON turma_disciplina_professor(disciplina_id);
CREATE INDEX idx_tdp_professor ON turma_disciplina_professor(professor_id);

-- ==========================================
-- TABELA: matriculas (Histórico de Matrículas)
-- ==========================================
CREATE TABLE matriculas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    ano_letivo INTEGER NOT NULL,
    serie VARCHAR(50) NOT NULL,
    turma_id INTEGER,
    data_matricula DATE NOT NULL,
    tipo VARCHAR(30) CHECK(tipo IN ('nova', 'renovacao', 'transferencia')),
    status VARCHAR(20) DEFAULT 'ativa' CHECK(status IN ('ativa', 'cancelada', 'concluida')),
    observacoes TEXT,
    responsavel_matricula INTEGER,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id),
    FOREIGN KEY (responsavel_matricula) REFERENCES usuarios(id)
);

CREATE INDEX idx_matriculas_aluno ON matriculas(aluno_id);
CREATE INDEX idx_matriculas_ano ON matriculas(ano_letivo);
CREATE INDEX idx_matriculas_status ON matriculas(status);

-- ==========================================
-- TABELA: notas
-- ==========================================
CREATE TABLE notas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    turma_id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,
    bimestre INTEGER CHECK(bimestre BETWEEN 1 AND 4),
    tipo_avaliacao VARCHAR(50),
    nota DECIMAL(5,2) CHECK(nota >= 0 AND nota <= 10),
    peso DECIMAL(3,2) DEFAULT 1.0,
    data_avaliacao DATE,
    observacoes TEXT,
    lancado_por INTEGER,
    data_lancamento DATETIME DEFAULT CURRENT_TIMESTAMP,
    editado_por INTEGER,
    data_edicao DATETIME,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES usuarios(id),
    FOREIGN KEY (lancado_por) REFERENCES usuarios(id),
    FOREIGN KEY (editado_por) REFERENCES usuarios(id)
);

CREATE INDEX idx_notas_aluno ON notas(aluno_id);
CREATE INDEX idx_notas_turma ON notas(turma_id);
CREATE INDEX idx_notas_disciplina ON notas(disciplina_id);
CREATE INDEX idx_notas_bimestre ON notas(bimestre);

-- ==========================================
-- TABELA: frequencia
-- ==========================================
CREATE TABLE frequencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    turma_id INTEGER NOT NULL,
    disciplina_id INTEGER NOT NULL,
    professor_id INTEGER NOT NULL,
    data_aula DATE NOT NULL,
    presente BOOLEAN DEFAULT 1,
    justificativa TEXT,
    observacoes TEXT,
    registrado_por INTEGER,
    data_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id) ON DELETE CASCADE,
    FOREIGN KEY (professor_id) REFERENCES usuarios(id),
    FOREIGN KEY (registrado_por) REFERENCES usuarios(id),
    UNIQUE(aluno_id, turma_id, disciplina_id, data_aula)
);

CREATE INDEX idx_frequencia_aluno ON frequencia(aluno_id);
CREATE INDEX idx_frequencia_turma ON frequencia(turma_id);
CREATE INDEX idx_frequencia_data ON frequencia(data_aula);

-- ==========================================
-- TABELA: materiais
-- ==========================================
CREATE TABLE materiais (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    tipo VARCHAR(50) CHECK(tipo IN ('apostila', 'exercicio', 'prova', 'trabalho', 'video', 'link', 'outro')),
    arquivo_url TEXT,
    turma_id INTEGER,
    disciplina_id INTEGER,
    professor_id INTEGER NOT NULL,
    data_publicacao DATE,
    data_limite DATE,
    visivel BOOLEAN DEFAULT 1,
    enviado_por INTEGER,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (professor_id) REFERENCES usuarios(id),
    FOREIGN KEY (enviado_por) REFERENCES usuarios(id)
);

CREATE INDEX idx_materiais_turma ON materiais(turma_id);
CREATE INDEX idx_materiais_disciplina ON materiais(disciplina_id);
CREATE INDEX idx_materiais_professor ON materiais(professor_id);

-- ==========================================
-- TABELA: documentos
-- ==========================================
CREATE TABLE documentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    aluno_id INTEGER NOT NULL,
    tipo VARCHAR(50) CHECK(tipo IN ('declaracao', 'historico', 'boletim', 'certificado', 'transferencia', 'outro')),
    titulo VARCHAR(200) NOT NULL,
    descricao TEXT,
    arquivo_url TEXT,
    gerado_por INTEGER,
    data_geracao DATETIME DEFAULT CURRENT_TIMESTAMP,
    validade DATE,
    FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
    FOREIGN KEY (gerado_por) REFERENCES usuarios(id)
);

CREATE INDEX idx_documentos_aluno ON documentos(aluno_id);
CREATE INDEX idx_documentos_tipo ON documentos(tipo);

-- ==========================================
-- TABELA: logs_sistema
-- ==========================================
CREATE TABLE logs_sistema (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    acao VARCHAR(100) NOT NULL,
    tabela VARCHAR(50),
    registro_id INTEGER,
    descricao TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    data_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE INDEX idx_logs_usuario ON logs_sistema(usuario_id);
CREATE INDEX idx_logs_data ON logs_sistema(data_hora);
CREATE INDEX idx_logs_acao ON logs_sistema(acao);

-- ==========================================
-- VIEWS ÚTEIS
-- ==========================================

-- View: Alunos com Responsáveis
CREATE VIEW vw_alunos_completo AS
SELECT 
    a.*,
    r1.nome as responsavel1_nome,
    r1.telefone as responsavel1_telefone,
    r1.email as responsavel1_email,
    r2.nome as responsavel2_nome,
    r2.telefone as responsavel2_telefone,
    r2.email as responsavel2_email
FROM alunos a
LEFT JOIN responsaveis r1 ON a.responsavel1_id = r1.id
LEFT JOIN responsaveis r2 ON a.responsavel2_id = r2.id;

-- View: Turmas com Estatísticas
CREATE VIEW vw_turmas_estatisticas AS
SELECT 
    t.*,
    COUNT(DISTINCT ta.aluno_id) as total_alunos,
    COUNT(DISTINCT tdp.professor_id) as total_professores,
    COUNT(DISTINCT tdp.disciplina_id) as total_disciplinas,
    u.nome as coordenador_nome
FROM turmas t
LEFT JOIN turma_aluno ta ON t.id = ta.turma_id AND ta.status = 'ativo'
LEFT JOIN turma_disciplina_professor tdp ON t.id = tdp.turma_id AND tdp.status = 'ativo'
LEFT JOIN usuarios u ON t.coordenador_id = u.id
GROUP BY t.id;

-- View: Média de Notas por Aluno
CREATE VIEW vw_medias_alunos AS
SELECT 
    a.id as aluno_id,
    a.nome as aluno_nome,
    a.matricula,
    d.id as disciplina_id,
    d.nome as disciplina_nome,
    n.bimestre,
    AVG(n.nota * n.peso) / AVG(n.peso) as media
FROM alunos a
JOIN notas n ON a.id = n.aluno_id
JOIN disciplinas d ON n.disciplina_id = d.id
GROUP BY a.id, d.id, n.bimestre;

-- View: Frequência por Aluno
CREATE VIEW vw_frequencia_alunos AS
SELECT 
    a.id as aluno_id,
    a.nome as aluno_nome,
    a.matricula,
    d.id as disciplina_id,
    d.nome as disciplina_nome,
    COUNT(*) as total_aulas,
    SUM(CASE WHEN f.presente = 1 THEN 1 ELSE 0 END) as presencas,
    SUM(CASE WHEN f.presente = 0 THEN 1 ELSE 0 END) as faltas,
    ROUND(SUM(CASE WHEN f.presente = 1 THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as percentual_presenca
FROM alunos a
JOIN frequencia f ON a.id = f.aluno_id
JOIN disciplinas d ON f.disciplina_id = d.id
GROUP BY a.id, d.id;

-- ==========================================
-- FIM DO SCHEMA
-- ==========================================
