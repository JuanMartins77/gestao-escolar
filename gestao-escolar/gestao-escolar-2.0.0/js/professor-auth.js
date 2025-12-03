/**
 * Autenticação e verificação de permissões para professores
 */

async function checkProfessorAuth() {
    try {
        // Verificar se está logado
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            window.location.href = 'index.html';
            return null;
        }

        const user = JSON.parse(userStr);

        // Verificar se é professor
        if (user.tipo_usuario !== 'professor') {
            alert('Acesso negado! Esta área é exclusiva para professores.');
            window.location.href = 'dashboard.html';
            return null;
        }

        // Validar sessão com backend
        try {
            await api.getCurrentUser();
        } catch (error) {
            console.error('Sessão inválida:', error);
            localStorage.removeItem('user');
            window.location.href = 'index.html';
            return null;
        }

        return user;

    } catch (error) {
        console.error('Erro na autenticação:', error);
        window.location.href = 'index.html';
        return null;
    }
}

// Verificar permissão para acessar dados de uma turma
async function checkTurmaPermission(turmaId) {
    try {
        // Buscar turmas do professor
        const turmas = await api.getTurmas();
        
        // Verificar se o professor tem acesso a esta turma
        const hasAccess = turmas.results?.some(t => t.id === parseInt(turmaId));
        
        if (!hasAccess) {
            alert('Você não tem permissão para acessar esta turma.');
            window.location.href = 'professor-turmas.html';
            return false;
        }

        return true;

    } catch (error) {
        console.error('Erro ao verificar permissão:', error);
        return false;
    }
}

// Formatar data para exibição
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Formatar nota
function formatNota(nota) {
    if (nota === null || nota === undefined) return '-';
    return parseFloat(nota).toFixed(1);
}

// Obter cor da nota
function getNotaColor(nota) {
    if (nota === null || nota === undefined) return '#64748b';
    if (nota >= 7) return '#10b981'; // Verde
    if (nota >= 5) return '#f59e0b'; // Amarelo
    return '#ef4444'; // Vermelho
}

// Calcular média
function calcularMedia(notas) {
    const notasValidas = notas.filter(n => n !== null && n !== undefined);
    if (notasValidas.length === 0) return 0;
    const soma = notasValidas.reduce((acc, n) => acc + parseFloat(n), 0);
    return soma / notasValidas.length;
}

// Calcular percentual de frequência
function calcularFrequencia(presencas, total) {
    if (total === 0) return 0;
    return (presencas / total) * 100;
}

// Obter cor da frequência
function getFrequenciaColor(percentual) {
    if (percentual >= 75) return '#10b981'; // Verde
    if (percentual >= 60) return '#f59e0b'; // Amarelo
    return '#ef4444'; // Vermelho
}

// Mostrar mensagem de sucesso
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Mostrar mensagem de erro
function showError(message) {
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #ef4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    alert.textContent = message;
    document.body.appendChild(alert);

    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alert.remove(), 300);
    }, 3000);
}

// Adicionar animações CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
