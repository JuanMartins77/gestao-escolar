// Sistema de armazenamento offline usando localStorage
class OfflineStorage {
    constructor() {
        this.prefix = 'gestao_escolar_';
        this.initializeData();
    }

    initializeData() {
        // Inicializar dados de exemplo se não existirem
        if (!this.getData('alunos')) {
            this.setData('alunos', [
                { id: 1, nome: 'João Silva', email: 'joao@email.com', cpf: '123.456.789-00', data_nascimento: '2005-03-15', telefone: '(61) 99999-1111', status: 'ativo' },
                { id: 2, nome: 'Maria Santos', email: 'maria@email.com', cpf: '987.654.321-00', data_nascimento: '2006-07-22', telefone: '(61) 99999-2222', status: 'ativo' }
            ]);
        }

        if (!this.getData('professores')) {
            this.setData('professores', [
                { id: 1, nome: 'Prof. Carlos Lima', email: 'carlos@escola.com', cpf: '111.222.333-44', telefone: '(61) 98888-1111', especializacao: 'Matemática', status: 'ativo' },
                { id: 2, nome: 'Profa. Ana Costa', email: 'ana@escola.com', cpf: '555.666.777-88', telefone: '(61) 98888-2222', especializacao: 'Português', status: 'ativo' }
            ]);
        }

        if (!this.getData('turmas')) {
            this.setData('turmas', [
                { id: 1, nome: '1º Ano A', ano: '2024', turno: 'Matutino', sala: '101', capacidade: 30, professor_id: 1, status: 'ativa' },
                { id: 2, nome: '2º Ano B', ano: '2024', turno: 'Vespertino', sala: '202', capacidade: 25, professor_id: 2, status: 'ativa' }
            ]);
        }

        if (!this.getData('usuarios')) {
            this.setData('usuarios', [
                { id: 1, nome: 'Administrador', email: 'admin@escola.com', cpf: '000.000.000-00', cargo: 'admin', senha: 'admin123', status: 'ativo' }
            ]);
        }
    }

    getData(key) {
        try {
            const data = localStorage.getItem(this.prefix + key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Erro ao ler dados:', error);
            return null;
        }
    }

    setData(key, value) {
        try {
            localStorage.setItem(this.prefix + key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Erro ao salvar dados:', error);
            return false;
        }
    }

    // CRUD Genérico
    getAll(entity) {
        return this.getData(entity) || [];
    }

    getById(entity, id) {
        const items = this.getAll(entity);
        return items.find(item => item.id === parseInt(id));
    }

    create(entity, data) {
        const items = this.getAll(entity);
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const newItem = { ...data, id: newId, created_at: new Date().toISOString() };
        items.push(newItem);
        this.setData(entity, items);
        return newItem;
    }

    update(entity, id, data) {
        const items = this.getAll(entity);
        const index = items.findIndex(item => item.id === parseInt(id));
        if (index !== -1) {
            items[index] = { ...items[index], ...data };
            this.setData(entity, items);
            return items[index];
        }
        return null;
    }

    delete(entity, id) {
        const items = this.getAll(entity);
        const filtered = items.filter(item => item.id !== parseInt(id));
        this.setData(entity, filtered);
        return true;
    }

    // Estatísticas
    getStats() {
        const alunos = this.getAll('alunos').filter(a => a.status === 'ativo');
        const professores = this.getAll('professores').filter(p => p.status === 'ativo');
        const turmas = this.getAll('turmas').filter(t => t.status === 'ativa');
        
        return {
            total_alunos: alunos.length,
            total_professores: professores.length,
            total_turmas: turmas.length,
            taxa_aprovacao: 85.5
        };
    }
}

// Instância global
window.offlineStorage = new OfflineStorage();
