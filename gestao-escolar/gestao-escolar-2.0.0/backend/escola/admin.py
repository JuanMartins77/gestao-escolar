from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import (
    Usuario, Aluno, Professor, Disciplina, Turma,
    TurmaDisciplina, Nota, Frequencia, Comunicado, Evento
)


@admin.register(Usuario)
class UsuarioAdmin(UserAdmin):
    list_display = ['username', 'email', 'tipo_usuario', 'cpf', 'ativo']
    list_filter = ['tipo_usuario', 'ativo', 'is_staff']
    search_fields = ['username', 'email', 'cpf', 'first_name', 'last_name']
    
    fieldsets = UserAdmin.fieldsets + (
        ('Informações Adicionais', {
            'fields': ('tipo_usuario', 'cpf', 'telefone', 'data_nascimento', 'foto_perfil', 'ativo')
        }),
    )


@admin.register(Aluno)
class AlunoAdmin(admin.ModelAdmin):
    list_display = ['matricula', 'get_nome', 'turma_atual', 'data_matricula']
    list_filter = ['turma_atual', 'data_matricula']
    search_fields = ['matricula', 'usuario__first_name', 'usuario__last_name']
    
    def get_nome(self, obj):
        return obj.usuario.get_full_name()
    get_nome.short_description = 'Nome'


@admin.register(Professor)
class ProfessorAdmin(admin.ModelAdmin):
    list_display = ['get_nome', 'registro_profissional', 'especialidade', 'data_admissao']
    list_filter = ['especialidade', 'data_admissao']
    search_fields = ['registro_profissional', 'usuario__first_name', 'usuario__last_name']
    
    def get_nome(self, obj):
        return obj.usuario.get_full_name()
    get_nome.short_description = 'Nome'


@admin.register(Disciplina)
class DisciplinaAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'nome', 'carga_horaria', 'ativa']
    list_filter = ['ativa']
    search_fields = ['codigo', 'nome']


@admin.register(Turma)
class TurmaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'ano_letivo', 'serie', 'turno', 'capacidade_maxima', 'ativa']
    list_filter = ['ano_letivo', 'serie', 'turno', 'ativa']
    search_fields = ['nome', 'sala']


@admin.register(TurmaDisciplina)
class TurmaDisciplinaAdmin(admin.ModelAdmin):
    list_display = ['turma', 'disciplina', 'professor', 'dia_semana', 'horario_inicio']
    list_filter = ['turma', 'disciplina', 'dia_semana']
    search_fields = ['turma__nome', 'disciplina__nome']


@admin.register(Nota)
class NotaAdmin(admin.ModelAdmin):
    list_display = ['get_aluno', 'get_disciplina', 'bimestre', 'nota', 'data_lancamento']
    list_filter = ['bimestre', 'data_lancamento']
    search_fields = ['aluno__usuario__first_name', 'aluno__usuario__last_name']
    
    def get_aluno(self, obj):
        return obj.aluno.usuario.get_full_name()
    get_aluno.short_description = 'Aluno'
    
    def get_disciplina(self, obj):
        return obj.turma_disciplina.disciplina.nome
    get_disciplina.short_description = 'Disciplina'


@admin.register(Frequencia)
class FrequenciaAdmin(admin.ModelAdmin):
    list_display = ['get_aluno', 'get_disciplina', 'data', 'presente']
    list_filter = ['presente', 'data']
    search_fields = ['aluno__usuario__first_name', 'aluno__usuario__last_name']
    
    def get_aluno(self, obj):
        return obj.aluno.usuario.get_full_name()
    get_aluno.short_description = 'Aluno'
    
    def get_disciplina(self, obj):
        return obj.turma_disciplina.disciplina.nome
    get_disciplina.short_description = 'Disciplina'


@admin.register(Comunicado)
class ComunicadoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'tipo', 'autor', 'data_publicacao', 'ativo']
    list_filter = ['tipo', 'ativo', 'data_publicacao']
    search_fields = ['titulo', 'conteudo']
    filter_horizontal = ['turmas']


@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'data_inicio', 'data_fim', 'local', 'publico']
    list_filter = ['publico', 'data_inicio']
    search_fields = ['titulo', 'descricao', 'local']
    filter_horizontal = ['turmas']
