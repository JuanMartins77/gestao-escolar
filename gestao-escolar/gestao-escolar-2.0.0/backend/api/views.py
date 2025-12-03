from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate, login, logout
from django.db.models import Avg, Count, Q
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta, date

from escola.models import (
    Usuario, Aluno, Professor, Disciplina, Turma,
    TurmaDisciplina, Nota, Frequencia, Comunicado, Evento
)
from .serializers import (
    UsuarioSerializer, AlunoSerializer, ProfessorSerializer,
    DisciplinaSerializer, TurmaSerializer, TurmaDisciplinaSerializer,
    NotaSerializer, FrequenciaSerializer, ComunicadoSerializer, EventoSerializer
)
from .permissions import (
    CanManageUsers, CanManageGrades, CanManageAttendance,
    IsSecretaria, IsCoordenador, IsProfessor
)


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = [IsAuthenticated, CanManageUsers]
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def por_tipo(self, request):
        tipo = request.query_params.get('tipo')
        if tipo:
            usuarios = self.queryset.filter(tipo_usuario=tipo, ativo=True)
            serializer = self.get_serializer(usuarios, many=True)
            return Response(serializer.data)
        return Response({'error': 'Tipo não especificado'}, status=status.HTTP_400_BAD_REQUEST)


class AlunoViewSet(viewsets.ModelViewSet):
    queryset = Aluno.objects.select_related('usuario', 'turma_atual').all()
    serializer_class = AlunoSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def boletim(self, request, pk=None):
        aluno = self.get_object()
        notas = Nota.objects.filter(aluno=aluno).select_related('turma_disciplina__disciplina')
        
        boletim = {}
        for nota in notas:
            disciplina = nota.turma_disciplina.disciplina.nome
            if disciplina not in boletim:
                boletim[disciplina] = {}
            boletim[disciplina][f'bimestre_{nota.bimestre}'] = float(nota.nota)
        
        # Calcular médias
        for disciplina in boletim:
            notas_disciplina = [v for k, v in boletim[disciplina].items() if k.startswith('bimestre_')]
            if notas_disciplina:
                boletim[disciplina]['media'] = sum(notas_disciplina) / len(notas_disciplina)
        
        return Response(boletim)
    
    @action(detail=True, methods=['get'])
    def frequencia_resumo(self, request, pk=None):
        aluno = self.get_object()
        frequencias = Frequencia.objects.filter(aluno=aluno).select_related('turma_disciplina__disciplina')
        
        resumo = {}
        for freq in frequencias:
            disciplina = freq.turma_disciplina.disciplina.nome
            if disciplina not in resumo:
                resumo[disciplina] = {'presencas': 0, 'faltas': 0, 'total': 0}
            
            resumo[disciplina]['total'] += 1
            if freq.presente:
                resumo[disciplina]['presencas'] += 1
            else:
                resumo[disciplina]['faltas'] += 1
        
        # Calcular percentuais
        for disciplina in resumo:
            total = resumo[disciplina]['total']
            if total > 0:
                resumo[disciplina]['percentual_presenca'] = (resumo[disciplina]['presencas'] / total) * 100
        
        return Response(resumo)


class ProfessorViewSet(viewsets.ModelViewSet):
    queryset = Professor.objects.select_related('usuario').all()
    serializer_class = ProfessorSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def turmas(self, request, pk=None):
        professor = self.get_object()
        turmas_disciplinas = TurmaDisciplina.objects.filter(professor=professor).select_related('turma', 'disciplina')
        serializer = TurmaDisciplinaSerializer(turmas_disciplinas, many=True)
        return Response(serializer.data)


class DisciplinaViewSet(viewsets.ModelViewSet):
    queryset = Disciplina.objects.all()
    serializer_class = DisciplinaSerializer
    permission_classes = [IsAuthenticated]


class TurmaViewSet(viewsets.ModelViewSet):
    queryset = Turma.objects.all()
    serializer_class = TurmaSerializer
    permission_classes = [IsAuthenticated]
    
    @action(detail=True, methods=['get'])
    def alunos(self, request, pk=None):
        turma = self.get_object()
        alunos = Aluno.objects.filter(turma_atual=turma).select_related('usuario')
        serializer = AlunoSerializer(alunos, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def disciplinas(self, request, pk=None):
        turma = self.get_object()
        turmas_disciplinas = TurmaDisciplina.objects.filter(turma=turma).select_related('disciplina', 'professor__usuario')
        serializer = TurmaDisciplinaSerializer(turmas_disciplinas, many=True)
        return Response(serializer.data)


class TurmaDisciplinaViewSet(viewsets.ModelViewSet):
    queryset = TurmaDisciplina.objects.select_related('turma', 'disciplina', 'professor').all()
    serializer_class = TurmaDisciplinaSerializer
    permission_classes = [IsAuthenticated]


class NotaViewSet(viewsets.ModelViewSet):
    queryset = Nota.objects.select_related('aluno__usuario', 'turma_disciplina__disciplina').all()
    serializer_class = NotaSerializer
    permission_classes = [IsAuthenticated, CanManageGrades]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        aluno_id = self.request.query_params.get('aluno')
        turma_id = self.request.query_params.get('turma')
        bimestre = self.request.query_params.get('bimestre')
        
        if aluno_id:
            queryset = queryset.filter(aluno_id=aluno_id)
        if turma_id:
            queryset = queryset.filter(turma_disciplina__turma_id=turma_id)
        if bimestre:
            queryset = queryset.filter(bimestre=bimestre)
        
        return queryset


class FrequenciaViewSet(viewsets.ModelViewSet):
    queryset = Frequencia.objects.select_related('aluno__usuario', 'turma_disciplina__disciplina').all()
    serializer_class = FrequenciaSerializer
    permission_classes = [IsAuthenticated, CanManageAttendance]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        aluno_id = self.request.query_params.get('aluno')
        turma_id = self.request.query_params.get('turma')
        data_inicio = self.request.query_params.get('data_inicio')
        data_fim = self.request.query_params.get('data_fim')
        
        if aluno_id:
            queryset = queryset.filter(aluno_id=aluno_id)
        if turma_id:
            queryset = queryset.filter(turma_disciplina__turma_id=turma_id)
        if data_inicio:
            queryset = queryset.filter(data__gte=data_inicio)
        if data_fim:
            queryset = queryset.filter(data__lte=data_fim)
        
        return queryset


class ComunicadoViewSet(viewsets.ModelViewSet):
    queryset = Comunicado.objects.prefetch_related('turmas').select_related('autor').all()
    serializer_class = ComunicadoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        # Alunos e responsáveis veem apenas comunicados de suas turmas
        if user.tipo_usuario == 'aluno':
            if hasattr(user, 'aluno_perfil') and user.aluno_perfil.turma_atual:
                queryset = queryset.filter(
                    Q(turmas=user.aluno_perfil.turma_atual) | Q(turmas__isnull=True)
                )
        
        return queryset.filter(ativo=True)


class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.prefetch_related('turmas').select_related('organizador').all()
    serializer_class = EventoSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user = self.request.user
        
        # Alunos veem eventos públicos ou de suas turmas
        if user.tipo_usuario == 'aluno':
            if hasattr(user, 'aluno_perfil') and user.aluno_perfil.turma_atual:
                queryset = queryset.filter(
                    Q(publico=True) | Q(turmas=user.aluno_perfil.turma_atual)
                )
            else:
                queryset = queryset.filter(publico=True)
        
        return queryset



# ==================== AUTENTICAÇÃO ====================

@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def login_view(request):
    """View de login customizada"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Usuário e senha são obrigatórios'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        
        # Retornar dados do usuário
        from .serializers import UsuarioSerializer
        serializer = UsuarioSerializer(user)
        
        return Response({
            'message': 'Login realizado com sucesso',
            'user': serializer.data
        })
    else:
        return Response(
            {'error': 'Usuário ou senha incorretos'},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    """View de logout"""
    logout(request)
    return Response({'message': 'Logout realizado com sucesso'})


@api_view(['POST'])
@permission_classes([AllowAny])
@csrf_exempt
def register_view(request):
    """View de registro de novo usuário"""
    from escola.models import Usuario, Professor, Aluno
    
    # Dados obrigatórios
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    tipo_usuario = request.data.get('tipo_usuario')
    cpf = request.data.get('cpf')
    
    # Validações
    if not all([username, email, password, first_name, last_name, tipo_usuario, cpf]):
        return Response(
            {'error': 'Todos os campos obrigatórios devem ser preenchidos'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Verificar se usuário já existe
    if Usuario.objects.filter(username=username).exists():
        return Response(
            {'error': 'Nome de usuário já existe'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if Usuario.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email já cadastrado'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if Usuario.objects.filter(cpf=cpf).exists():
        return Response(
            {'error': 'CPF já cadastrado'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Criar usuário
        user = Usuario.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            tipo_usuario=tipo_usuario,
            cpf=cpf,
            telefone=request.data.get('telefone', ''),
            data_nascimento=request.data.get('data_nascimento')
        )
        
        # Se for professor, criar perfil de professor
        if tipo_usuario == 'professor':
            Professor.objects.create(
                usuario=user,
                registro_profissional=f'REG{user.id:04d}',
                especialidade=request.data.get('especialidade', 'Geral'),
                data_admissao=date.today(),
                carga_horaria_semanal=40
            )
        
        # Fazer login automático
        login(request, user)
        
        from .serializers import UsuarioSerializer
        serializer = UsuarioSerializer(user)
        
        return Response({
            'message': 'Cadastro realizado com sucesso',
            'user': serializer.data
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response(
            {'error': f'Erro ao criar usuário: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
