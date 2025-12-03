@echo off
chcp 65001 >nul
title Sistema de Gestão Escolar 2.0

echo.
echo ========================================
echo   🎓 SISTEMA DE GESTÃO ESCOLAR 2.0
echo ========================================
echo.
echo 🚀 Iniciando sistema...
echo.

cd /d "%~dp0"

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ✗ Python não encontrado!
    echo.
    echo 📥 Por favor, instale o Python 3.10 ou superior
    echo    Download: https://www.python.org/downloads/
    echo.
    pause
    exit /b 1
)

echo ✓ Python encontrado
echo.

REM Verificar se o banco existe
if not exist "backend\db.sqlite3" (
    echo ⚠️  Banco de dados não encontrado!
    echo 📊 Criando banco de dados...
    echo.
    
    cd backend
    
    echo 🔧 Executando migrações...
    python manage.py migrate
    
    echo.
    echo 🔧 Configurando dados iniciais...
    python setup.py
    
    echo.
    echo 📝 Populando banco de dados...
    python popular_banco.py
    
    cd ..
    echo.
    echo ✓ Banco de dados criado!
    echo.
) else (
    echo ✓ Banco de dados encontrado
    echo.
)

REM Iniciar servidor Django em nova janela
echo 🌐 Iniciando servidor Django (Backend)...
start "Django Backend - Gestão Escolar" cmd /k "cd backend && python manage.py runserver"

REM Aguardar servidor Django iniciar
echo ⏳ Aguardando backend iniciar...
timeout /t 5 /nobreak >nul

REM Iniciar servidor Frontend em nova janela
echo 🌐 Iniciando servidor Frontend...
start "Frontend Server - Gestão Escolar" cmd /k "python servidor_frontend.py"

REM Aguardar servidor frontend iniciar
echo ⏳ Aguardando frontend iniciar...
timeout /t 3 /nobreak >nul

echo 🔗 Abrindo sistema no navegador...
REM O servidor_frontend.py já abre o navegador automaticamente

echo.
echo ========================================
echo   ✅ SISTEMA INICIADO COM SUCESSO!
echo ========================================
echo.
echo 🌐 URLs de Acesso:
echo    • API REST:     http://127.0.0.1:8000/api/
echo    • Admin Panel:  http://127.0.0.1:8000/admin/
echo    • Frontend:     index.html (já aberto)
echo.
echo 🔑 Credenciais:
echo    • Usuário: admin
echo    • Senha:   admin123
echo.
echo 📚 Documentação:
echo    • ACESSO_RAPIDO.txt
echo    • INTEGRACAO_COMPLETA.md
echo.
echo ⚠️  Para parar o servidor:
echo    • Feche a janela "Django Server"
echo.
echo ========================================
echo   🎉 Bom trabalho!
echo ========================================
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause >nul
