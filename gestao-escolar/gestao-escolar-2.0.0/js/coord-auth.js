/**
 * Autenticação para Coordenador
 */

async function checkCoordAuth() {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            window.location.href = 'index.html';
            return null;
        }

        const user = JSON.parse(userStr);

        if (user.tipo_usuario !== 'coordenador') {
            alert('Acesso negado! Esta área é exclusiva para coordenadores.');
            window.location.href = 'dashboard.html';
            return null;
        }

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

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

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
