from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator, MaxValueValidator


class Usuario(AbstractUser):
    TIPO_CHOICES = [
        ('admin', 'Administrador'),
        ('secretaria', 'Secretaria'),
        ('coordenador', 'Coordenador'),
        ('professor', 'Professor'),
        ('aluno', 'Aluno'),
        ('responsavel', 'Responsável'),
    ]
    
    tipo_usuario = models.CharField(max_length=20, choices=TIPO_CHOICES)
    cpf = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=20, blank=True)
    data_nascimento = models.DateField(null=True, blank=True)
    foto_perfil = models.ImageField(upload_to='perfis/', null=True, blank=True)
    ativo = models.BooleanField(default=True)
    criado_em = models.DateTimeField(auto_now_add=True)
    atualizado_em = models.DateTimeField(auto_now=True)
    
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        related_name='usuario_set',
        related_query_name='usuario',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        related_name='usuario_set',
        related_query_name='usuario',
    )
    
    class Meta:
        db_table = 'usuarios'
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return f"{self.get_full_name()} ({self.get_tipo_usuario_display()})"


class Aluno(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='aluno_perfil')
    matricula = models.CharField(max_length=20, unique=True)
    data_matricula = models.DateField()
    turma_atual = models.ForeignKey('Turma', on_delete=models.SET_NULL, null=True, blank=True, related_name='alunos_atuais')
    responsavel = models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True, related_name='alunos_responsaveis')
    endereco = models.TextField(blank=True)
    observacoes = models.TextField(blank=True)
    
    class Meta:
        db_table = 'alunos'
        verbose_name = 'Aluno'
        verbose_name_plural = 'Alunos'
    
    def __str__(self):
        return f"{self.matricula} - {self.usuario.get_full_name()}"


class Professor(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='professor_perfil')
    registro_profissional = models.CharField(max_length=50, unique=True)
    especialidade = models.CharField(max_length=100)
    data_admissao = models.DateField()
    carga_horaria_semanal = models.IntegerField(validators=[MinValueValidator(1)])
    
    class Meta:
        db_table = 'professores'
        verbose_name = 'Professor'
        verbose_name_plural = 'Professores'
    
    def __str__(self):
        return f"{self.usuario.get_full_name()} - {self.especialidade}"


class Disciplina(models.Model):
    nome = models.CharField(max_length=100)
    codigo = models.CharField(max_length=20, unique=True)
    descricao = models.TextField(blank=True)
    carga_horaria = models.IntegerField(validators=[MinValueValidator(1)])
    ativa = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'disciplinas'
        verbose_name = 'Disciplina'
        verbose_name_plural = 'Disciplinas'
    
    def __str__(self):
        return f"{self.codigo} - {self.nome}"


class Turma(models.Model):
    TURNO_CHOICES = [
        ('matutino', 'Matutino'),
        ('vespertino', 'Vespertino'),
        ('noturno', 'Noturno'),
    ]
    
    nome = models.CharField(max_length=50)
    ano_letivo = models.IntegerField()
    serie = models.CharField(max_length=20)
    turno = models.CharField(max_length=20, choices=TURNO_CHOICES)
    capacidade_maxima = models.IntegerField(validators=[MinValueValidator(1)])
    sala = models.CharField(max_length=20)
    ativa = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'turmas'
        verbose_name = 'Turma'
        verbose_name_plural = 'Turmas'
        unique_together = ['nome', 'ano_letivo']
    
    def __str__(self):
        return f"{self.nome} - {self.ano_letivo} ({self.get_turno_display()})"


class TurmaDisciplina(models.Model):
    turma = models.ForeignKey(Turma, on_delete=models.CASCADE, related_name='disciplinas')
    disciplina = models.ForeignKey(Disciplina, on_delete=models.CASCADE, related_name='turmas')
    professor = models.ForeignKey(Professor, on_delete=models.SET_NULL, null=True, related_name='turmas_disciplinas')
    dia_semana = models.CharField(max_length=20)
    horario_inicio = models.TimeField()
    horario_fim = models.TimeField()
    
    class Meta:
        db_table = 'turmas_disciplinas'
        verbose_name = 'Turma-Disciplina'
        verbose_name_plural = 'Turmas-Disciplinas'
        unique_together = ['turma', 'disciplina']
    
    def __str__(self):
        return f"{self.turma.nome} - {self.disciplina.nome}"


class Nota(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='notas')
    turma_disciplina = models.ForeignKey(TurmaDisciplina, on_delete=models.CASCADE, related_name='notas')
    bimestre = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(4)])
    nota = models.DecimalField(max_digits=4, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(10)])
    data_lancamento = models.DateField(auto_now_add=True)
    observacao = models.TextField(blank=True)
    
    class Meta:
        db_table = 'notas'
        verbose_name = 'Nota'
        verbose_name_plural = 'Notas'
        unique_together = ['aluno', 'turma_disciplina', 'bimestre']
    
    def __str__(self):
        return f"{self.aluno.usuario.get_full_name()} - {self.turma_disciplina.disciplina.nome} - B{self.bimestre}: {self.nota}"


class Frequencia(models.Model):
    aluno = models.ForeignKey(Aluno, on_delete=models.CASCADE, related_name='frequencias')
    turma_disciplina = models.ForeignKey(TurmaDisciplina, on_delete=models.CASCADE, related_name='frequencias')
    data = models.DateField()
    presente = models.BooleanField(default=True)
    justificativa = models.TextField(blank=True)
    
    class Meta:
        db_table = 'frequencias'
        verbose_name = 'Frequência'
        verbose_name_plural = 'Frequências'
        unique_together = ['aluno', 'turma_disciplina', 'data']
    
    def __str__(self):
        status = "Presente" if self.presente else "Ausente"
        return f"{self.aluno.usuario.get_full_name()} - {self.data} - {status}"


class Comunicado(models.Model):
    TIPO_CHOICES = [
        ('geral', 'Geral'),
        ('urgente', 'Urgente'),
        ('evento', 'Evento'),
        ('aviso', 'Aviso'),
    ]
    
    titulo = models.CharField(max_length=200)
    conteudo = models.TextField()
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    autor = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='comunicados')
    turmas = models.ManyToManyField(Turma, blank=True, related_name='comunicados')
    data_publicacao = models.DateTimeField(auto_now_add=True)
    data_expiracao = models.DateField(null=True, blank=True)
    ativo = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'comunicados'
        verbose_name = 'Comunicado'
        verbose_name_plural = 'Comunicados'
        ordering = ['-data_publicacao']
    
    def __str__(self):
        return f"{self.titulo} ({self.get_tipo_display()})"


class Evento(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    data_inicio = models.DateTimeField()
    data_fim = models.DateTimeField()
    local = models.CharField(max_length=200)
    organizador = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='eventos_organizados')
    turmas = models.ManyToManyField(Turma, blank=True, related_name='eventos')
    publico = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'eventos'
        verbose_name = 'Evento'
        verbose_name_plural = 'Eventos'
        ordering = ['data_inicio']
    
    def __str__(self):
        return f"{self.titulo} - {self.data_inicio.strftime('%d/%m/%Y')}"
