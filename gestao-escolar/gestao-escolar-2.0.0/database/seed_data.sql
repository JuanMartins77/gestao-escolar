-- ==========================================
-- EDUGESTÃO v2.0.0 - DADOS INICIAIS
-- Dados de exemplo para começar
-- ==========================================

-- ==========================================
-- USUÁRIOS INICIAIS
-- Senha padrão para todos: 123456 (hash MD5 simples para demo)
-- ==========================================

-- Admin
INSERT INTO usuarios (nome, email, senha, cpf, telefone, cargo, status) VALUES
('Administrador Sistema', 'admin@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '111.111.111-11', '(61) 99999-0001', 'admin', 'ativo');

-- Coordenadores
INSERT INTO usuarios (nome, email, senha, cpf, telefone, cargo, status, criado_por) VALUES
('Maria Coordenadora', 'maria.coord@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '222.222.222-22', '(61) 99999-0002', 'coordenador', 'ativo', 1),
('João Supervisor', 'joao.super@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '333.333.333-33', '(61) 99999-0003', 'coordenador', 'ativo', 1);

-- Professores
INSERT INTO usuarios (nome, email, senha, cpf, telefone, cargo, status, criado_por) VALUES
('Ana Silva', 'ana.silva@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '444.444.444-44', '(61) 99999-0004', 'professor', 'ativo', 1),
('Carlos Santos', 'carlos.santos@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '555.555.555-55', '(61) 99999-0005', 'professor', 'ativo', 1),
('Beatriz Oliveira', 'beatriz.oliveira@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '666.666.666-66', '(61) 99999-0006', 'professor', 'ativo', 1),
('Daniel Costa', 'daniel.costa@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '777.777.777-77', '(61) 99999-0007', 'professor', 'ativo', 1);

-- Secretários
INSERT INTO usuarios (nome, email, senha, cpf, telefone, cargo, status, criado_por) VALUES
('Paula Secretária', 'paula.sec@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '888.888.888-88', '(61) 99999-0008', 'secretario', 'ativo', 1),
('Roberto Administrativo', 'roberto.adm@escola.com', 'e10adc3949ba59abbe56e057f20f883e', '999.999.999-99', '(61) 99999-0009', 'secretario', 'ativo', 1);

-- ==========================================
-- RESPONSÁVEIS
-- ==========================================
INSERT INTO responsaveis (nome, cpf, rg, email, telefone, endereco, cidade, estado, profissao, parentesco) VALUES
('José da Silva', '100.100.100-10', '1234567', 'jose.silva@email.com', '(61) 98888-0001', 'QNN 01 Conjunto A Casa 10', 'Brasília', 'DF', 'Engenheiro', 'Pai'),
('Maria da Silva', '100.100.100-11', '1234568', 'maria.silva@email.com', '(61) 98888-0002', 'QNN 01 Conjunto A Casa 10', 'Brasília', 'DF', 'Professora', 'Mãe'),
('Pedro Santos', '200.200.200-20', '2234567', 'pedro.santos@email.com', '(61) 98888-0003', 'QNN 02 Conjunto B Casa 20', 'Brasília', 'DF', 'Médico', 'Pai'),
('Ana Santos', '200.200.200-21', '2234568', 'ana.santos@email.com', '(61) 98888-0004', 'QNN 02 Conjunto B Casa 20', 'Brasília', 'DF', 'Advogada', 'Mãe'),
('Carlos Oliveira', '300.300.300-30', '3234567', 'carlos.oliveira@email.com', '(61) 98888-0005', 'QNN 03 Conjunto C Casa 30', 'Brasília', 'DF', 'Empresário', 'Pai'),
('Juliana Oliveira', '300.300.300-31', '3234568', 'juliana.oliveira@email.com', '(61) 98888-0006', 'QNN 03 Conjunto C Casa 30', 'Brasília', 'DF', 'Dentista', 'Mãe');

-- ==========================================
-- ALUNOS
-- ==========================================
INSERT INTO alunos (matricula, nome, cpf, data_nascimento, sexo, email, telefone, endereco, cidade, estado, responsavel1_id, responsavel2_id, status, cadastrado_por) VALUES
('2025001', 'Lucas da Silva', '400.400.400-40', '2010-03-15', 'M', 'lucas.silva@email.com', '(61) 98888-1001', 'QNN 01 Conjunto A Casa 10', 'Brasília', 'DF', 1, 2, 'ativo', 8),
('2025002', 'Mariana Santos', '400.400.400-41', '2010-07-22', 'F', 'mariana.santos@email.com', '(61) 98888-1002', 'QNN 02 Conjunto B Casa 20', 'Brasília', 'DF', 3, 4, 'ativo', 8),
('2025003', 'Gabriel Oliveira', '400.400.400-42', '2011-01-10', 'M', 'gabriel.oliveira@email.com', '(61) 98888-1003', 'QNN 03 Conjunto C Casa 30', 'Brasília', 'DF', 5, 6, 'ativo', 8),
('2025004', 'Isabela Costa', '400.400.400-43', '2010-05-18', 'F', 'isabela.costa@email.com', '(61) 98888-1004', 'QNN 04 Conjunto D Casa 40', 'Brasília', 'DF', 1, 2, 'ativo', 8),
('2025005', 'Rafael Souza', '400.400.400-44', '2011-09-25', 'M', 'rafael.souza@email.com', '(61) 98888-1005', 'QNN 05 Conjunto E Casa 50', 'Brasília', 'DF', 3, 4, 'ativo', 8),
('2025006', 'Júlia Alves', '400.400.400-45', '2010-11-30', 'F', 'julia.alves@email.com', '(61) 98888-1006', 'QNN 06 Conjunto F Casa 60', 'Brasília', 'DF', 5, 6, 'ativo', 8),
('2025007', 'Pedro Henrique', '400.400.400-46', '2011-04-12', 'M', 'pedro.henrique@email.com', '(61) 98888-1007', 'QNN 07 Conjunto G Casa 70', 'Brasília', 'DF', 1, 2, 'ativo', 8),
('2025008', 'Larissa Martins', '400.400.400-47', '2010-08-20', 'F', 'larissa.martins@email.com', '(61) 98888-1008', 'QNN 08 Conjunto H Casa 80', 'Brasília', 'DF', 3, 4, 'ativo', 8),
('2025009', 'Thiago Lima', '400.400.400-48', '2011-02-14', 'M', 'thiago.lima@email.com', '(61) 98888-1009', 'QNN 09 Conjunto I Casa 90', 'Brasília', 'DF', 5, 6, 'ativo', 8),
('2025010', 'Camila Rocha', '400.400.400-49', '2010-12-05', 'F', 'camila.rocha@email.com', '(61) 98888-1010', 'QNN 10 Conjunto J Casa 100', 'Brasília', 'DF', 1, 2, 'ativo', 8);

-- ==========================================
-- DISCIPLINAS
-- ==========================================
INSERT INTO disciplinas (codigo, nome, descricao, carga_horaria, status) VALUES
('MAT', 'Matemática', 'Disciplina de Matemática', 200, 'ativa'),
('PORT', 'Português', 'Língua Portuguesa', 200, 'ativa'),
('HIST', 'História', 'História Geral e do Brasil', 120, 'ativa'),
('GEO', 'Geografia', 'Geografia Geral e do Brasil', 120, 'ativa'),
('CIEN', 'Ciências', 'Ciências Naturais', 160, 'ativa'),
('INGL', 'Inglês', 'Língua Inglesa', 80, 'ativa'),
('EDFIS', 'Educação Física', 'Educação Física', 80, 'ativa'),
('ARTE', 'Artes', 'Artes e Cultura', 80, 'ativa');

-- ==========================================
-- TURMAS
-- ==========================================
INSERT INTO turmas (codigo, nome, ano_letivo, serie, turno, sala, capacidade_maxima, vagas_disponiveis, coordenador_id, status, data_inicio, data_fim, criado_por) VALUES
('9A-2025', '9º Ano A', 2025, '9º Ano', 'matutino', 'Sala 101', 35, 25, 2, 'ativa', '2025-02-01', '2025-12-20', 1),
('9B-2025', '9º Ano B', 2025, '9º Ano', 'matutino', 'Sala 102', 35, 30, 2, 'ativa', '2025-02-01', '2025-12-20', 1),
('8A-2025', '8º Ano A', 2025, '8º Ano', 'vespertino', 'Sala 201', 35, 28, 3, 'ativa', '2025-02-01', '2025-12-20', 1),
('8B-2025', '8º Ano B', 2025, '8º Ano', 'vespertino', 'Sala 202', 35, 32, 3, 'ativa', '2025-02-01', '2025-12-20', 1);

-- ==========================================
-- MATRÍCULAS EM TURMAS
-- ==========================================
INSERT INTO turma_aluno (turma_id, aluno_id, data_matricula, status) VALUES
(1, 1, '2025-01-15', 'ativo'),
(1, 2, '2025-01-15', 'ativo'),
(1, 3, '2025-01-15', 'ativo'),
(2, 4, '2025-01-15', 'ativo'),
(2, 5, '2025-01-15', 'ativo'),
(3, 6, '2025-01-15', 'ativo'),
(3, 7, '2025-01-15', 'ativo'),
(4, 8, '2025-01-15', 'ativo'),
(4, 9, '2025-01-15', 'ativo'),
(4, 10, '2025-01-15', 'ativo');

-- ==========================================
-- ATRIBUIÇÃO DE PROFESSORES
-- ==========================================
INSERT INTO turma_disciplina_professor (turma_id, disciplina_id, professor_id, ano_letivo, carga_horaria_semanal, data_inicio, status) VALUES
-- 9º Ano A
(1, 1, 4, 2025, 5, '2025-02-01', 'ativo'), -- Ana Silva - Matemática
(1, 2, 5, 2025, 5, '2025-02-01', 'ativo'), -- Carlos Santos - Português
(1, 3, 6, 2025, 3, '2025-02-01', 'ativo'), -- Beatriz Oliveira - História
(1, 4, 7, 2025, 3, '2025-02-01', 'ativo'), -- Daniel Costa - Geografia
-- 9º Ano B
(2, 1, 4, 2025, 5, '2025-02-01', 'ativo'),
(2, 2, 5, 2025, 5, '2025-02-01', 'ativo'),
(2, 5, 6, 2025, 4, '2025-02-01', 'ativo'), -- Ciências
-- 8º Ano A
(3, 1, 4, 2025, 5, '2025-02-01', 'ativo'),
(3, 2, 5, 2025, 5, '2025-02-01', 'ativo'),
(3, 5, 7, 2025, 4, '2025-02-01', 'ativo'),
-- 8º Ano B
(4, 1, 4, 2025, 5, '2025-02-01', 'ativo'),
(4, 2, 5, 2025, 5, '2025-02-01', 'ativo');

-- ==========================================
-- NOTAS DE EXEMPLO (1º Bimestre)
-- ==========================================
INSERT INTO notas (aluno_id, turma_id, disciplina_id, professor_id, bimestre, tipo_avaliacao, nota, data_avaliacao, lancado_por) VALUES
-- Lucas da Silva (9º A)
(1, 1, 1, 4, 1, 'Prova', 8.5, '2025-03-15', 4),
(1, 1, 2, 5, 1, 'Prova', 7.8, '2025-03-16', 5),
(1, 1, 3, 6, 1, 'Trabalho', 9.0, '2025-03-17', 6),
-- Mariana Santos (9º A)
(2, 1, 1, 4, 1, 'Prova', 9.2, '2025-03-15', 4),
(2, 1, 2, 5, 1, 'Prova', 8.5, '2025-03-16', 5),
(2, 1, 3, 6, 1, 'Trabalho', 9.5, '2025-03-17', 6),
-- Gabriel Oliveira (9º A)
(3, 1, 1, 4, 1, 'Prova', 7.5, '2025-03-15', 4),
(3, 1, 2, 5, 1, 'Prova', 8.0, '2025-03-16', 5),
(3, 1, 3, 6, 1, 'Trabalho', 8.5, '2025-03-17', 6);

-- ==========================================
-- FREQUÊNCIA DE EXEMPLO
-- ==========================================
INSERT INTO frequencia (aluno_id, turma_id, disciplina_id, professor_id, data_aula, presente, registrado_por) VALUES
-- Semana 1 - Matemática
(1, 1, 1, 4, '2025-02-03', 1, 4),
(2, 1, 1, 4, '2025-02-03', 1, 4),
(3, 1, 1, 4, '2025-02-03', 1, 4),
(1, 1, 1, 4, '2025-02-04', 1, 4),
(2, 1, 1, 4, '2025-02-04', 1, 4),
(3, 1, 1, 4, '2025-02-04', 0, 4), -- Gabriel faltou
-- Semana 1 - Português
(1, 1, 2, 5, '2025-02-05', 1, 5),
(2, 1, 2, 5, '2025-02-05', 1, 5),
(3, 1, 2, 5, '2025-02-05', 1, 5);

-- ==========================================
-- MATERIAIS DE EXEMPLO
-- ==========================================
INSERT INTO materiais (titulo, descricao, tipo, turma_id, disciplina_id, professor_id, data_publicacao, visivel, enviado_por) VALUES
('Apostila de Matemática - Equações', 'Material sobre equações do 2º grau', 'apostila', 1, 1, 4, '2025-02-01', 1, 4),
('Lista de Exercícios - Português', 'Exercícios de interpretação de texto', 'exercicio', 1, 2, 5, '2025-02-02', 1, 5),
('Trabalho de História', 'Pesquisa sobre Brasil Colonial', 'trabalho', 1, 3, 6, '2025-02-03', 1, 6);

-- ==========================================
-- LOGS INICIAIS
-- ==========================================
INSERT INTO logs_sistema (usuario_id, acao, tabela, descricao) VALUES
(1, 'LOGIN', NULL, 'Administrador fez login no sistema'),
(8, 'CRIAR_ALUNO', 'alunos', 'Secretária cadastrou 10 novos alunos'),
(2, 'CRIAR_TURMA', 'turmas', 'Coordenadora criou turmas do ano letivo 2025'),
(4, 'LANCAR_NOTA', 'notas', 'Professora Ana lançou notas do 1º bimestre');

-- ==========================================
-- FIM DOS DADOS INICIAIS
-- ==========================================
