// Configuração da API
const API_CONFIG = {
    // Quando o Render estiver pronto, substitua pela URL do Render
    // Exemplo: 'https://gestao-escolar-api.onrender.com/api'
    BASE_URL: 'https://gestao-escolar-api.onrender.com/api',
    
    // Fallback para modo offline (localStorage)
    USE_OFFLINE_MODE: true,
    
    // Timeout para requisições
    TIMEOUT: 10000
};

// Função para verificar se a API está online
async function checkAPIStatus() {
    try {
        const response = await fetch(`${API_CONFIG.BASE_URL}/stats`, {
            method: 'GET',
            signal: AbortSignal.timeout(5000)
        });
        return response.ok;
    } catch (error) {
        console.warn('API offline, usando modo local');
        return false;
    }
}

// Exportar configuração
window.API_CONFIG = API_CONFIG;
window.checkAPIStatus = checkAPIStatus;
