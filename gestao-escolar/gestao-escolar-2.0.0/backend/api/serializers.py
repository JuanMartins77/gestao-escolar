from rest_framework import serializers
from escola.models import (
    Usuario, Aluno, Professor, Disciplina, Turma,
    TurmaDisciplina, Nota, Frequencia, Comunicado, Evento
)


class UsuarioSerializer(serializers.ModelSerializer):
    nome_completo = serializers.SerializerMethodField()
    
    class Meta:
        model = Usuario
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'nome_completo',
                  'tipo_usuario', 'cpf', 'telefone', 'data_nascimento', 'foto_perfil', 'ativo']
        read_only_fields = ['id']
    
    def get_nome_completo(self, obj):
        return obj.get_full_name()


class AlunoSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    turma_nome = serializers.CharField(source='turma_atual.nome', read_only=True)
    
    class Meta:
        model = Aluno
        fields = '__all__'


class ProfessorSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer(read_only=True)
    
    class Meta:
        model = Professor
        fields = '__all__'


class DisciplinaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disciplina
        fields = '__all__'


class TurmaSerializer(serializers.ModelSerializer):
    total_alunos = serializers.SerializerMethodField()
    
    class Meta:
        model = Turma
        fields = '__all__'
    
    def get_total_alunos(self, obj):
        return obj.alunos_atuais.count()


class TurmaDisciplinaSerializer(serializers.ModelSerializer):
    turma_nome = serializers.CharField(source='turma.nome', read_only=True)
    disciplina_nome = serializers.CharField(source='disciplina.nome', read_only=True)
    professor_nome = serializers.SerializerMethodField()
    
    class Meta:
        model = TurmaDisciplina
        fields = '__all__'
    
    def get_professor_nome(self, obj):
        return obj.professor.usuario.get_full_name() if obj.professor else None


class NotaSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.SerializerMethodField()
    disciplina_nome = serializers.CharField(source='turma_disciplina.disciplina.nome', read_only=True)
    
    class Meta:
        model = Nota
        fields = '__all__'
    
    def get_aluno_nome(self, obj):
        return obj.aluno.usuario.get_full_name()


class FrequenciaSerializer(serializers.ModelSerializer):
    aluno_nome = serializers.SerializerMethodField()
    disciplina_nome = serializers.CharField(source='turma_disciplina.disciplina.nome', read_only=True)
    
    class Meta:
        model = Frequencia
        fields = '__all__'
    
    def get_aluno_nome(self, obj):
        return obj.aluno.usuario.get_full_name()


class ComunicadoSerializer(serializers.ModelSerializer):
    autor_nome = serializers.SerializerMethodField()
    turmas_nomes = serializers.SerializerMethodField()
    
    class Meta:
        model = Comunicado
        fields = '__all__'
    
    def get_autor_nome(self, obj):
        return obj.autor.get_full_name()
    
    def get_turmas_nomes(self, obj):
        return [turma.nome for turma in obj.turmas.all()]


class EventoSerializer(serializers.ModelSerializer):
    organizador_nome = serializers.SerializerMethodField()
    turmas_nomes = serializers.SerializerMethodField()
    
    class Meta:
        model = Evento
        fields = '__all__'
    
    def get_organizador_nome(self, obj):
        return obj.organizador.get_full_name()
    
    def get_turmas_nomes(self, obj):
        return [turma.nome for turma in obj.turmas.all()]
