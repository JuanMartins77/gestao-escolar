# Sistema de Gestão Escolar 2.0 - Script de Inicialização
# PowerShell Script

$Host.UI.RawUI.WindowTitle = "Sistema de Gestão Escolar 2.0"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  🎓 SISTEMA DE GESTÃO ESCOLAR 2.0" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "🚀 Iniciando sistema...`n" -ForegroundColor Yellow

# Mudar para o diretório do script
Set-Location $PSScriptRoot

# Verificar se Python está instalado
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✓ Python encontrado: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Python não encontrado!" -ForegroundColor Red
    Write-Host "`n📥 Por favor, instale o Python 3.10 ou superior" -ForegroundColor Yellow
    Write-Host "   Download: https://www.python.org/downloads/`n"
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""

# Verificar se o banco existe
if (-not (Test-Path "backend\db.sqlite3")) {
    Write-Host "⚠️  Banco de dados não encontrado!" -ForegroundColor Yellow
    Write-Host "📊 Criando banco de dados...`n" -ForegroundColor Yellow
    
    Set-Location backend
    
    Write-Host "🔧 Executando migrações..." -ForegroundColor Cyan
    python manage.py migrate
    
    Write-Host "`n🔧 Configurando dados iniciais..." -ForegroundColor Cyan
    python setup.py
    
    Write-Host "`n📝 Populando banco de dados..." -ForegroundColor Cyan
    python popular_banco.py
    
    Set-Location ..
    Write-Host "`n✓ Banco de dados criado!`n" -ForegroundColor Green
} else {
    Write-Host "✓ Banco de dados encontrado`n" -ForegroundColor Green
}

# Iniciar servidor Django em nova janela
Write-Host "🌐 Iniciando servidor Django..." -ForegroundColor Cyan
$serverJob = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; python manage.py runserver" -PassThru -WindowStyle Normal

# Aguardar servidor iniciar
Write-Host "⏳ Aguardando servidor iniciar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Verificar se servidor está rodando
$serverRunning = $false
for ($i = 0; $i -lt 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:8000" -TimeoutSec 1 -ErrorAction SilentlyContinue
        $serverRunning = $true
        break
    } catch {
        Start-Sleep -Seconds 1
    }
}

if ($serverRunning) {
    Write-Host "✓ Servidor está rodando!`n" -ForegroundColor Green
    
    # Abrir navegador com a API
    Write-Host "🔗 Abrindo API no navegador..." -ForegroundColor Cyan
    Start-Process "http://127.0.0.1:8000/api/"
    
    Start-Sleep -Seconds 2
    
    # Abrir index.html
    Write-Host "🔗 Abrindo Frontend (Login)...`n" -ForegroundColor Cyan
    $indexPath = Join-Path $PSScriptRoot "index.html"
    Start-Process $indexPath
    
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ SISTEMA INICIADO COM SUCESSO!" -ForegroundColor Green
    Write-Host "========================================`n" -ForegroundColor Green
    
    Write-Host "🌐 URLs de Acesso:" -ForegroundColor Yellow
    Write-Host "   • API REST:     http://127.0.0.1:8000/api/"
    Write-Host "   • Admin Panel:  http://127.0.0.1:8000/admin/"
    Write-Host "   • Frontend:     index.html (já aberto)`n"
    
    Write-Host "🔑 Credenciais:" -ForegroundColor Yellow
    Write-Host "   • Usuário: admin"
    Write-Host "   • Senha:   admin123`n"
    
    Write-Host "📚 Documentação:" -ForegroundColor Yellow
    Write-Host "   • ACESSO_RAPIDO.txt"
    Write-Host "   • INTEGRACAO_COMPLETA.md`n"
    
    Write-Host "⚠️  Para parar o servidor:" -ForegroundColor Yellow
    Write-Host "   • Feche a janela do PowerShell do servidor`n"
    
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "  🎉 Bom trabalho!" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
} else {
    Write-Host "✗ Servidor não iniciou corretamente" -ForegroundColor Red
    Write-Host "   Verifique se a porta 8000 está disponível`n"
}

Write-Host "Pressione qualquer tecla para fechar esta janela..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
