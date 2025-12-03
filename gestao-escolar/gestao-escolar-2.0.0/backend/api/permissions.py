from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.tipo_usuario == 'admin'


class IsSecretaria(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.tipo_usuario in ['admin', 'secretaria']


class IsCoordenador(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.tipo_usuario in ['admin', 'coordenador']


class IsProfessor(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.tipo_usuario in ['admin', 'coordenador', 'professor']


class IsAlunoOrResponsavel(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.tipo_usuario in ['aluno', 'responsavel']


class CanManageUsers(permissions.BasePermission):
    """Admin e Secretaria podem gerenciar usuários"""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.tipo_usuario in ['admin', 'secretaria']


class CanManageGrades(permissions.BasePermission):
    """Professor pode lançar notas, Coordenador pode editar"""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.tipo_usuario in ['admin', 'coordenador', 'professor', 'aluno', 'responsavel']
        return request.user and request.user.tipo_usuario in ['admin', 'coordenador', 'professor']


class CanManageAttendance(permissions.BasePermission):
    """Professor pode lançar frequência"""
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.tipo_usuario in ['admin', 'coordenador', 'professor', 'aluno', 'responsavel']
        return request.user and request.user.tipo_usuario in ['admin', 'coordenador', 'professor']
