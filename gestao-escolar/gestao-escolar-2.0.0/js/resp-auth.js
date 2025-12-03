async function checkRespAuth() {
    try {
        const userStr = localStorage.getItem('user');
        if (!userStr) {
            window.location.href = 'index.html';
            return null;
        }
        const user = JSON.parse(userStr);
        if (user.tipo_usuario !== 'responsavel') {
            alert('Acesso negado! Esta área é exclusiva para responsáveis.');
            window.location.href = 'dashboard.html';
            return null;
        }
        try {
            await api.getCurrentUser();
        } catch (error) {
            localStorage.removeItem('user');
            window.location.href = 'index.html';
            return null;
        }
        return user;
    } catch (error) {
        window.location.href = 'index.html';
        return null;
    }
}
function showSuccess(message) {
    const alert = document.createElement('div');
    alert.style.cssText = 'position: fixed; top: 2rem; right: 2rem; background: #10b981; color: white; padding: 1rem 2rem; border-radius: 12px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); z-index: 9999;';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}
function showError(message) {
    const alert = document.createElement('div');
    alert.style.cssText = 'position: fixed; top: 2rem; right: 2rem; background: #ef4444; color: white; padding: 1rem 2rem; border-radius: 12px; box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); z-index: 9999;';
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => alert.remove(), 3000);
}
