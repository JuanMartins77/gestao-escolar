#!/usr/bin/env python
"""
Script para popular o banco de dados com dados de exemplo
"""
import os
import sys
import django
from datetime import date, datetime, timedelta
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from escola.models import (
    Usuario, Aluno, Professor, Disciplina, Turma,
    TurmaDisciplina, Nota, Frequencia, Comunicado, Evento
)

def criar_usuarios_exemplo():
    """Criar usuários de exemplo de cada tipo"""
    print("\n📝 Criando usuários de exemplo...")
    
    usuarios = []
    
    # Secretária
    if not Usuario.objects.filter(username='secretaria').exists():
        sec = Usuario.objects.create_user(
            username='secretaria',
            email='secretaria@escola.com',
            password='senha123',
            first_name='Ana',
            last_name='Silva',
            tipo_usuario='secretaria',
            cpf='111.111.111-11'
        )
        usuarios.append(sec)
        print('✓ Secretária criada')
    
    # Coordenador
    if not Usuario.objects.filter(username='coordenador').exists():
        coord = Usuario.objects.create_user(
            username='coordenador',
            email='coordenador@escola.com',
            password='senha123',
            first_name='Carlos',
            last_name='Santos',
            tipo_usuario='coordenador',
            cpf='222.222.222-22'
        )
        usuarios.append(coord)
        print('✓ Coordenador criado')
    
    # Professores
    professores_data = [
        ('prof.maria', 'Maria', 'Oliveira', 'maria@escola.com', '333.333.333-33', 'Matemática', 'REG001'),
        ('prof.joao', 'João', 'Costa', 'joao@escola.com', '444.444.444-44', 'Português', 'REG002'),
        ('prof.ana', 'Ana', 'Ferreira', 'ana@escola.com', '555.555.555-55', 'História', 'REG003'),
    ]
    
    for username, first, last, email, cpf, espec, reg in professores_data:
        if not Usuario.objects.filter(username=username).exists():
            user = Usuario.objects.create_user(
                username=username,
                email=email,
                password='senha123',
                first_name=first,
                last_name=last,
                tipo_usuario='professor',
                cpf=cpf
            )
            
            Professor.objects.create(
                usuario=user,
                registro_profissional=reg,
                especialidade=espec,
                data_admissao=date(2024, 1, 15),
                carga_horaria_semanal=40
            )
            usuarios.append(user)
            print(f'✓ Professor {first} {last} criado')
    
    # Responsáveis
    responsaveis_data = [
        ('resp.jose', 'José', 'Almeida', 'jose@email.com', '666.666.666-66'),
        ('resp.lucia', 'Lúcia', 'Rodrigues', 'lucia@email.com', '777.777.777-77'),
    ]
    
    for username, first, last, email, cpf in responsaveis_data:
        if not Usuario.objects.filter(username=username).exists():
            user = Usuario.objects.create_user(
                username=username,
                email=email,
                password='senha123',
                first_name=first,
                last_name=last,
                tipo_usuario='responsavel',
                cpf=cpf
            )
            usuarios.append(user)
            print(f'✓ Responsável {first} {last} criado')
    
    # Alunos
    alunos_data = [
        ('aluno.pedro', 'Pedro', 'Almeida', 'pedro@email.com', '888.888.888-88', '2024001', 'resp.jose'),
        ('aluno.julia', 'Julia', 'Rodrigues', 'julia@email.com', '999.999.999-99', '2024002', 'resp.lucia'),
        ('aluno.lucas', 'Lucas', 'Martins', 'lucas@email.com', '101.101.101-01', '2024003', 'resp.jose'),
        ('aluno.maria', 'Maria', 'Santos', 'maria.aluna@email.com', '202.202.202-02', '2024004', 'resp.lucia'),
    ]
    
    turma = Turma.objects.first()
    
    for username, first, last, email, cpf, matricula, resp_username in alunos_data:
        if not Usuario.objects.filter(username=username).exists():
            user = Usuario.objects.create_user(
                username=username,
                email=email,
                password='senha123',
                first_name=first,
                last_name=last,
                tipo_usuario='aluno',
                cpf=cpf,
                data_nascimento=date(2012, 5, 15)
            )
            
            responsavel = Usuario.objects.get(username=resp_username)
            
            Aluno.objects.create(
                usuario=user,
                matricula=matricula,
                data_matricula=date(2024, 2, 1),
                turma_atual=turma,
                responsavel=responsavel,
                endereco='Rua Exemplo, 123'
            )
            usuarios.append(user)
            print(f'✓ Aluno {first} {last} criado')
    
    return usuarios


def criar_turmas_disciplinas():
    """Associar disciplinas às turmas com professores"""
    print("\n📚 Associando disciplinas às turmas...")
    
    turma = Turma.objects.first()
    if not turma:
        print('✗ Nenhuma turma encontrada')
        return
    
    # Pegar disciplinas e professores
    matematica = Disciplina.objects.filter(codigo='MAT').first()
    portugues = Disciplina.objects.filter(codigo='PORT').first()
    historia = Disciplina.objects.filter(codigo='HIST').first()
    
    prof_mat = Professor.objects.filter(especialidade='Matemática').first()
    prof_port = Professor.objects.filter(especialidade='Português').first()
    prof_hist = Professor.objects.filter(especialidade='História').first()
    
    associacoes = [
        (matematica, prof_mat, 'Segunda-feira', '08:00', '09:00'),
        (portugues, prof_port, 'Terça-feira', '08:00', '09:00'),
        (historia, prof_hist, 'Quarta-feira', '08:00', '09:00'),
    ]
    
    for disc, prof, dia, inicio, fim in associacoes:
        if disc and prof:
            td, created = TurmaDisciplina.objects.get_or_create(
                turma=turma,
                disciplina=disc,
                defaults={
                    'professor': prof,
                    'dia_semana': dia,
                    'horario_inicio': inicio,
                    'horario_fim': fim
                }
            )
            if created:
                print(f'✓ {disc.nome} associada à {turma.nome} com {prof.usuario.first_name}')


def lancar_notas_exemplo():
    """Lançar notas de exemplo para os alunos"""
    print("\n📊 Lançando notas de exemplo...")
    
    alunos = Aluno.objects.all()
    turmas_disciplinas = TurmaDisciplina.objects.all()
    
    if not alunos.exists() or not turmas_disciplinas.exists():
        print('✗ Sem alunos ou disciplinas para lançar notas')
        return
    
    notas_lancadas = 0
    for aluno in alunos:
        for td in turmas_disciplinas:
            for bimestre in [1, 2]:
                # Gerar nota aleatória entre 6.0 e 10.0
                import random
                nota_valor = Decimal(str(round(random.uniform(6.0, 10.0), 1)))
                
                nota, created = Nota.objects.get_or_create(
                    aluno=aluno,
                    turma_disciplina=td,
                    bimestre=bimestre,
                    defaults={
                        'nota': nota_valor,
                        'observacao': 'Nota de exemplo'
                    }
                )
                if created:
                    notas_lancadas += 1
    
    print(f'✓ {notas_lancadas} notas lançadas')


def registrar_frequencias_exemplo():
    """Registrar frequências de exemplo"""
    print("\n📅 Registrando frequências de exemplo...")
    
    alunos = Aluno.objects.all()
    turmas_disciplinas = TurmaDisciplina.objects.all()
    
    if not alunos.exists() or not turmas_disciplinas.exists():
        print('✗ Sem alunos ou disciplinas para registrar frequência')
        return
    
    # Últimos 30 dias
    hoje = date.today()
    frequencias_registradas = 0
    
    for i in range(30):
        data = hoje - timedelta(days=i)
        
        for aluno in alunos:
            for td in turmas_disciplinas:
                # 90% de presença
                import random
                presente = random.random() > 0.1
                
                freq, created = Frequencia.objects.get_or_create(
                    aluno=aluno,
                    turma_disciplina=td,
                    data=data,
                    defaults={
                        'presente': presente,
                        'justificativa': '' if presente else 'Falta não justificada'
                    }
                )
                if created:
                    frequencias_registradas += 1
    
    print(f'✓ {frequencias_registradas} frequências registradas')


def criar_comunicados_exemplo():
    """Criar comunicados de exemplo"""
    print("\n📢 Criando comunicados de exemplo...")
    
    admin = Usuario.objects.filter(tipo_usuario='admin').first()
    turma = Turma.objects.first()
    
    if not admin or not turma:
        print('✗ Sem admin ou turma para criar comunicados')
        return
    
    comunicados_data = [
        ('Reunião de Pais', 'Informamos que haverá reunião de pais no dia 15/12 às 19h.', 'aviso'),
        ('Festa Junina', 'Convidamos todos para nossa festa junina no dia 20/06!', 'evento'),
        ('Recesso Escolar', 'Haverá recesso escolar de 20/12 a 05/01.', 'geral'),
    ]
    
    for titulo, conteudo, tipo in comunicados_data:
        if not Comunicado.objects.filter(titulo=titulo).exists():
            com = Comunicado.objects.create(
                titulo=titulo,
                conteudo=conteudo,
                tipo=tipo,
                autor=admin,
                data_expiracao=date.today() + timedelta(days=30)
            )
            com.turmas.add(turma)
            print(f'✓ Comunicado "{titulo}" criado')


def criar_eventos_exemplo():
    """Criar eventos de exemplo"""
    print("\n🎉 Criando eventos de exemplo...")
    
    admin = Usuario.objects.filter(tipo_usuario='admin').first()
    turma = Turma.objects.first()
    
    if not admin or not turma:
        print('✗ Sem admin ou turma para criar eventos')
        return
    
    eventos_data = [
        ('Feira de Ciências', 'Apresentação dos projetos científicos dos alunos', '2024-11-30 14:00', '2024-11-30 18:00', 'Ginásio', True),
        ('Olimpíada de Matemática', 'Competição de matemática entre as turmas', '2024-12-05 09:00', '2024-12-05 12:00', 'Auditório', False),
    ]
    
    for titulo, desc, inicio, fim, local, publico in eventos_data:
        if not Evento.objects.filter(titulo=titulo).exists():
            evento = Evento.objects.create(
                titulo=titulo,
                descricao=desc,
                data_inicio=datetime.strptime(inicio, '%Y-%m-%d %H:%M'),
                data_fim=datetime.strptime(fim, '%Y-%m-%d %H:%M'),
                local=local,
                organizador=admin,
                publico=publico
            )
            evento.turmas.add(turma)
            print(f'✓ Evento "{titulo}" criado')


def main():
    print('\n' + '='*60)
    print('🎓 POPULANDO BANCO DE DADOS - GESTÃO ESCOLAR 2.0')
    print('='*60)
    
    try:
        criar_usuarios_exemplo()
        criar_turmas_disciplinas()
        lancar_notas_exemplo()
        registrar_frequencias_exemplo()
        criar_comunicados_exemplo()
        criar_eventos_exemplo()
        
        print('\n' + '='*60)
        print('✅ BANCO DE DADOS POPULADO COM SUCESSO!')
        print('='*60)
        
        # Resumo
        print('\n📊 RESUMO DOS DADOS:')
        print(f'   Usuários: {Usuario.objects.count()}')
        print(f'   Alunos: {Aluno.objects.count()}')
        print(f'   Professores: {Professor.objects.count()}')
        print(f'   Disciplinas: {Disciplina.objects.count()}')
        print(f'   Turmas: {Turma.objects.count()}')
        print(f'   Notas: {Nota.objects.count()}')
        print(f'   Frequências: {Frequencia.objects.count()}')
        print(f'   Comunicados: {Comunicado.objects.count()}')
        print(f'   Eventos: {Evento.objects.count()}')
        
        print('\n🔑 CREDENCIAIS DE ACESSO:')
        print('   Admin: admin / admin123')
        print('   Secretária: secretaria / senha123')
        print('   Coordenador: coordenador / senha123')
        print('   Professor: prof.maria / senha123')
        print('   Aluno: aluno.pedro / senha123')
        print('   Responsável: resp.jose / senha123')
        print('\n')
        
    except Exception as e:
        print(f'\n✗ Erro ao popular banco: {e}')
        import traceback
        traceback.print_exc()
        sys.exit(1)


if __name__ == '__main__':
    main()
