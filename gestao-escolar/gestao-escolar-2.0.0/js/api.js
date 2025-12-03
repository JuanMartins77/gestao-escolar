/**
 * API Client para Sistema de Gestão Escolar
 * Gerencia todas as chamadas à API Django
 */

const API_BASE_URL = 'http://localhost:8000/api';

class APIClient {
    constructor() {
        this.baseURL = API_BASE_URL;
        this.currentUser = null;
    }

    /**
     * Método genérico para fazer requisições
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.detail || `Erro ${response.status}`);
            }

            // Retornar null para 204 No Content
            if (response.status === 204) {
                return null;
            }

            return await response.json();
        } catch (error) {
            console.error('Erro na requisição:', error);
            throw error;
        }
    }

    // ==================== AUTENTICAÇÃO ====================

    async login(username, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Usuário ou senha incorretos');
            }
            
            const data = await response.json();
            this.currentUser = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    }
    
    async register(userData) {
        try {
            const response = await fetch(`${this.baseURL}/auth/register/`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'Erro ao cadastrar usuário');
            }
            
            const data = await response.json();
            this.currentUser = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } catch (error) {
            console.error('Erro no cadastro:', error);
            throw error;
        }
    }

    async logout() {
        await this.request('/auth/logout/', { method: 'POST' });
        this.currentUser = null;
        localStorage.removeItem('user');
    }

    async getCurrentUser() {
        try {
            this.currentUser = await this.request('/usuarios/me/');
            localStorage.setItem('user', JSON.stringify(this.currentUser));
            return this.currentUser;
        } catch (error) {
            this.currentUser = null;
            localStorage.removeItem('user');
            throw error;
        }
    }

    // ==================== USUÁRIOS ====================

    async getUsuarios(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/usuarios/${query ? '?' + query : ''}`);
    }

    async getUsuario(id) {
        return this.request(`/usuarios/${id}/`);
    }

    async createUsuario(data) {
        return this.request('/usuarios/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateUsuario(id, data) {
        return this.request(`/usuarios/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteUsuario(id) {
        return this.request(`/usuarios/${id}/`, { method: 'DELETE' });
    }

    async getUsuariosPorTipo(tipo) {
        return this.request(`/usuarios/por_tipo/?tipo=${tipo}`);
    }

    // ==================== ALUNOS ====================

    async getAlunos(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/alunos/${query ? '?' + query : ''}`);
    }

    async getAluno(id) {
        return this.request(`/alunos/${id}/`);
    }

    async createAluno(data) {
        return this.request('/alunos/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async getBoletim(alunoId) {
        return this.request(`/alunos/${alunoId}/boletim/`);
    }

    async getFrequenciaResumo(alunoId) {
        return this.request(`/alunos/${alunoId}/frequencia_resumo/`);
    }

    // ==================== PROFESSORES ====================

    async getProfessores() {
        return this.request('/professores/');
    }

    async getProfessor(id) {
        return this.request(`/professores/${id}/`);
    }

    async getTurmasProfessor(professorId) {
        return this.request(`/professores/${professorId}/turmas/`);
    }

    // ==================== DISCIPLINAS ====================

    async getDisciplinas() {
        return this.request('/disciplinas/');
    }

    async getDisciplina(id) {
        return this.request(`/disciplinas/${id}/`);
    }

    async createDisciplina(data) {
        return this.request('/disciplinas/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // ==================== TURMAS ====================

    async getTurmas() {
        return this.request('/turmas/');
    }

    async getTurma(id) {
        return this.request(`/turmas/${id}/`);
    }

    async createTurma(data) {
        return this.request('/turmas/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async getAlunosTurma(turmaId) {
        return this.request(`/turmas/${turmaId}/alunos/`);
    }

    async getDisciplinasTurma(turmaId) {
        return this.request(`/turmas/${turmaId}/disciplinas/`);
    }

    // ==================== NOTAS ====================

    async getNotas(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/notas/${query ? '?' + query : ''}`);
    }

    async createNota(data) {
        return this.request('/notas/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateNota(id, data) {
        return this.request(`/notas/${id}/`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // ==================== FREQUÊNCIAS ====================

    async getFrequencias(params = {}) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/frequencias/${query ? '?' + query : ''}`);
    }

    async createFrequencia(data) {
        return this.request('/frequencias/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async registrarFrequenciaLote(frequencias) {
        const promises = frequencias.map(freq => this.createFrequencia(freq));
        return Promise.all(promises);
    }

    // ==================== COMUNICADOS ====================

    async getComunicados() {
        return this.request('/comunicados/');
    }

    async getComunicado(id) {
        return this.request(`/comunicados/${id}/`);
    }

    async createComunicado(data) {
        return this.request('/comunicados/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    // ==================== EVENTOS ====================

    async getEventos() {
        return this.request('/eventos/');
    }

    async getEvento(id) {
        return this.request(`/eventos/${id}/`);
    }

    async createEvento(data) {
        return this.request('/eventos/', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

// Instância global da API
const api = new APIClient();

// Verificar se usuário está logado ao carregar
document.addEventListener('DOMContentLoaded', async () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            api.currentUser = JSON.parse(userStr);
            // Validar sessão
            await api.getCurrentUser();
        } catch (error) {
            console.log('Sessão expirada');
            localStorage.removeItem('user');
            // Redirecionar para login se não estiver na página de login
            if (!window.location.pathname.includes('index.html')) {
                window.location.href = 'index.html';
            }
        }
    }
});

// Exportar para uso global
window.api = api;
