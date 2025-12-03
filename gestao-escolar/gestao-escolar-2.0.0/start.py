#!/usr/bin/env python
"""
Script para iniciar o servidor Django e abrir o navegador automaticamente
"""
import os
import sys
import time
import webbrowser
import subprocess
from pathlib import Path

def print_banner():
    """Exibir banner de inicialização"""
    print("\n" + "="*70)
    print("  🎓 SISTEMA DE GESTÃO ESCOLAR 2.0")
    print("="*70)
    print("\n🚀 Iniciando servidor Django...\n")

def check_dependencies():
    """Verificar se as dependências estão instaladas"""
    try:
        import django
        print("✓ Django instalado")
        return True
    except ImportError:
        print("✗ Django não encontrado!")
        print("\n📦 Instalando dependências...")
        backend_dir = Path(__file__).parent / 'backend'
        subprocess.run([sys.executable, '-m', 'pip', 'install', '-r', 
                       str(backend_dir / 'requirements.txt')], check=True)
        return True

def check_database():
    """Verificar se o banco de dados existe"""
    backend_dir = Path(__file__).parent / 'backend'
    db_file = backend_dir / 'db.sqlite3'
    
    if not db_file.exists():
        print("\n⚠️  Banco de dados não encontrado!")
        print("📊 Criando banco de dados...\n")
        
        os.chdir(backend_dir)
        
        # Executar migrações
        subprocess.run([sys.executable, 'manage.py', 'migrate'], check=True)
        
        # Executar setup inicial
        print("\n🔧 Configurando dados iniciais...\n")
        subprocess.run([sys.executable, 'setup.py'], check=True)
        
        # Popular banco
        print("\n📝 Populando banco de dados...\n")
        subprocess.run([sys.executable, 'popular_banco.py'], check=True)
        
        print("\n✓ Banco de dados criado e populado!")
    else:
        print("✓ Banco de dados encontrado")

def start_server():
    """Iniciar o servidor Django em background"""
    backend_dir = Path(__file__).parent / 'backend'
    os.chdir(backend_dir)
    
    # Iniciar servidor
    print("\n🌐 Iniciando servidor em http://127.0.0.1:8000")
    print("⏳ Aguarde alguns segundos...\n")
    
    # Criar processo do servidor
    if sys.platform == 'win32':
        # Windows
        server_process = subprocess.Popen(
            [sys.executable, 'manage.py', 'runserver'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            creationflags=subprocess.CREATE_NEW_CONSOLE
        )
    else:
        # Linux/Mac
        server_process = subprocess.Popen(
            [sys.executable, 'manage.py', 'runserver'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE
        )
    
    return server_process

def wait_for_server(max_attempts=30):
    """Aguardar o servidor estar pronto"""
    import socket
    
    for i in range(max_attempts):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            result = sock.connect_ex(('127.0.0.1', 8000))
            sock.close()
            
            if result == 0:
                print("✓ Servidor está pronto!\n")
                return True
            
            time.sleep(0.5)
            print(f"⏳ Aguardando servidor... ({i+1}/{max_attempts})", end='\r')
        except:
            time.sleep(0.5)
    
    return False

def open_browser():
    """Abrir navegador com as URLs do sistema"""
    print("="*70)
    print("  🌐 ABRINDO NAVEGADOR")
    print("="*70)
    
    # URLs para abrir
    urls = [
        ('http://127.0.0.1:8000/api/', 'API REST'),
    ]
    
    # Abrir primeira URL
    print(f"\n🔗 Abrindo: {urls[0][1]}")
    webbrowser.open(urls[0][0])
    
    time.sleep(2)
    
    # Abrir index.html
    index_path = Path(__file__).parent / 'index.html'
    if index_path.exists():
        print(f"🔗 Abrindo: Frontend (Login)")
        webbrowser.open(f'file:///{index_path.absolute()}')

def print_info():
    """Exibir informações de acesso"""
    print("\n" + "="*70)
    print("  ✅ SISTEMA INICIADO COM SUCESSO!")
    print("="*70)
    
    print("\n🌐 URLs de Acesso:")
    print("   • API REST:     http://127.0.0.1:8000/api/")
    print("   • Admin Panel:  http://127.0.0.1:8000/admin/")
    print("   • Frontend:     index.html (já aberto)")
    
    print("\n🔑 Credenciais de Acesso:")
    print("   • Usuário: admin")
    print("   • Senha:   admin123")
    
    print("\n📚 Documentação:")
    print("   • ACESSO_RAPIDO.txt")
    print("   • INTEGRACAO_COMPLETA.md")
    print("   • STATUS_SISTEMA.md")
    
    print("\n⚠️  Para parar o servidor:")
    print("   • Feche a janela do console do servidor")
    print("   • Ou pressione Ctrl+C no terminal\n")
    
    print("="*70)
    print("  🎉 Bom trabalho!")
    print("="*70 + "\n")

def main():
    """Função principal"""
    try:
        # Banner
        print_banner()
        
        # Verificar dependências
        if not check_dependencies():
            print("\n✗ Erro ao verificar dependências")
            sys.exit(1)
        
        # Verificar banco de dados
        check_database()
        
        # Iniciar servidor
        server_process = start_server()
        
        # Aguardar servidor estar pronto
        if not wait_for_server():
            print("\n✗ Servidor não iniciou corretamente")
            server_process.terminate()
            sys.exit(1)
        
        # Abrir navegador
        open_browser()
        
        # Exibir informações
        print_info()
        
        # Manter script rodando
        print("💡 Pressione Ctrl+C para sair...\n")
        try:
            server_process.wait()
        except KeyboardInterrupt:
            print("\n\n🛑 Encerrando servidor...")
            server_process.terminate()
            print("✓ Servidor encerrado\n")
        
    except Exception as e:
        print(f"\n✗ Erro: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    main()
