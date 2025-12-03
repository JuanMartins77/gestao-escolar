from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse
from django.views.generic import RedirectView

def api_root(request):
    """View raiz da API com informações do sistema"""
    return JsonResponse({
        'message': 'Sistema de Gestão Escolar - API',
        'version': '2.0.0',
        'status': 'online',
        'endpoints': {
            'admin': '/admin/',
            'api': '/api/',
            'docs': {
                'usuarios': '/api/usuarios/',
                'alunos': '/api/alunos/',
                'professores': '/api/professores/',
                'disciplinas': '/api/disciplinas/',
                'turmas': '/api/turmas/',
                'notas': '/api/notas/',
                'frequencias': '/api/frequencias/',
                'comunicados': '/api/comunicados/',
                'eventos': '/api/eventos/',
            }
        },
        'authentication': {
            'login': '/api/auth/login/',
            'logout': '/api/auth/logout/',
            'current_user': '/api/usuarios/me/'
        }
    })

urlpatterns = [
    path('', api_root, name='api-root'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
