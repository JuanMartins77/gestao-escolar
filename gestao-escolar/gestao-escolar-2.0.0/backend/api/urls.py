from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, AlunoViewSet, ProfessorViewSet,
    DisciplinaViewSet, TurmaViewSet, TurmaDisciplinaViewSet,
    NotaViewSet, FrequenciaViewSet, ComunicadoViewSet, EventoViewSet,
    login_view, logout_view, register_view
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'alunos', AlunoViewSet)
router.register(r'professores', ProfessorViewSet)
router.register(r'disciplinas', DisciplinaViewSet)
router.register(r'turmas', TurmaViewSet)
router.register(r'turmas-disciplinas', TurmaDisciplinaViewSet)
router.register(r'notas', NotaViewSet)
router.register(r'frequencias', FrequenciaViewSet)
router.register(r'comunicados', ComunicadoViewSet)
router.register(r'eventos', EventoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', login_view, name='api-login'),
    path('auth/logout/', logout_view, name='api-logout'),
    path('auth/register/', register_view, name='api-register'),
]
