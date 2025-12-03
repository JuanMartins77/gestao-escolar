#!/usr/bin/env python
"""
Servidor HTTP simples para servir os arquivos HTML do frontend
"""
import http.server
import socketserver
import webbrowser
import time
from pathlib import Path

PORT = 3000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Mudar para o diretório do script
    import os
    os.chdir(Path(__file__).parent)
    
    print("\n" + "="*70)
    print("  🌐 SERVIDOR FRONTEND - GESTÃO ESCOLAR 2.0")
    print("="*70)
    print(f"\n🚀 Iniciando servidor em: http://localhost:{PORT}")
    print(f"📁 Servindo arquivos de: {Path.cwd()}\n")
    
    Handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"✅ Servidor rodando!")
        print(f"\n🌐 Acesse: http://localhost:{PORT}/index.html")
        print(f"\n⚠️  Certifique-se que o backend Django está rodando em http://127.0.0.1:8000")
        print(f"\n💡 Pressione Ctrl+C para parar o servidor\n")
        print("="*70 + "\n")
        
        # Abrir navegador após 2 segundos
        time.sleep(2)
        webbrowser.open(f'http://localhost:{PORT}/index.html')
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Encerrando servidor frontend...")
            print("✓ Servidor encerrado\n")

if __name__ == '__main__':
    main()
