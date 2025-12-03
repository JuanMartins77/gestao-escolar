#!/usr/bin/env python
"""
Script de configuração inicial do sistema
"""
import os
import sys
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from escola.models import Disciplina, Turma

Usuario = get_user_model()


def criar_admin():
    """Criar usuário administrador padrão"""
    if not Usuario.objects.filter(username='admin').exists():
        admin = Usuario.objects.create_superuser(
            username='admin',
            email='admin@escola.com',
            password='admin123',
            first_name='Administrador',
            last_name='Sistema',
            tipo_usuario='admin',
            cpf='000.000.000-00'
        )
        print('✓ Usuário admin criado (username: admin, senha: admin123)')
    else:
        print('✓ Usuário admin já existe')


def criar_disciplinas_basicas():
    """Criar disciplinas básicas"""
    disciplinas = [
        {'nome': 'Matemática', 'codigo': 'MAT', 'carga_horaria': 80},
        {'nome': 'Português', 'codigo': 'PORT', 'carga_horaria': 80},
        {'nome': 'História', 'codigo': 'HIST', 'carga_horaria': 60},
        {'nome': 'Geografia', 'codigo': 'GEO', 'carga_horaria': 60},
        {'nome': 'Ciências', 'codigo': 'CIEN', 'carga_horaria': 60},
        {'nome': 'Inglês', 'codigo': 'ING', 'carga_horaria': 40},
        {'nome': 'Educação Física', 'codigo': 'EDF', 'carga_horaria': 40},
        {'nome': 'Artes', 'codigo': 'ART', 'carga_horaria': 40},
    ]
    
    for disc in disciplinas:
        Disciplina.objects.get_or_create(
            codigo=disc['codigo'],
            defaults={
                'nome': disc['nome'],
                'carga_horaria': disc['carga_horaria'],
                'descricao': f'Disciplina de {disc["nome"]}'
            }
        )
    
    print(f'✓ {len(disciplinas)} disciplinas básicas criadas')


def criar_turma_exemplo():
    """Criar turma de exemplo"""
    if not Turma.objects.filter(nome='6º A').exists():
        Turma.objects.create(
            nome='6º A',
            ano_letivo=2024,
            serie='6º Ano',
            turno='matutino',
            capacidade_maxima=30,
            sala='101'
        )
        print('✓ Turma de exemplo criada (6º A)')
    else:
        print('✓ Turma de exemplo já existe')


def main():
    print('\n=== Configuração Inicial do Sistema ===\n')
    
    try:
        criar_admin()
        criar_disciplinas_basicas()
        criar_turma_exemplo()
        
        print('\n✓ Configuração concluída com sucesso!')
        print('\nAcesse o sistema:')
        print('  - Admin: http://localhost:8000/admin')
        print('  - API: http://localhost:8000/api')
        print('\nCredenciais padrão:')
        print('  - Usuário: admin')
        print('  - Senha: admin123')
        print('\n⚠️  IMPORTANTE: Altere a senha padrão em produção!\n')
        
    except Exception as e:
        print(f'\n✗ Erro durante a configuração: {e}')
        sys.exit(1)


if __name__ == '__main__':
    main()
