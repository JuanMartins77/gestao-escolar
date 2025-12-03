# 🚀 Como Iniciar o Sistema

## Método 1: Arquivo BAT (Mais Fácil - Windows)

### Clique duas vezes em:
```
INICIAR_SISTEMA.bat
```

✅ **Isso vai:**
1. Verificar se Python está instalado
2. Criar o banco de dados (se necessário)
3. Iniciar o servidor Django
4. Abrir o navegador automaticamente com:
   - API REST (http://127.0.0.1:8000/api/)
   - Frontend (index.html)

---

## Método 2: PowerShell Script (Windows)

### Clique com botão direito em:
```
INICIAR_SISTEMA.ps1
```

### Selecione:
```
"Executar com PowerShell"
```

✅ **Faz a mesma coisa que o .bat**

---

## Método 3: Python Script (Multiplataforma)

### No terminal:
```bash
python start.py
```

✅ **Funciona em Windows, Linux e Mac**

---

## Método 4: Manual (Tradicional)

### 1. Abrir terminal na pasta backend:
```bash
cd backend
```

### 2. Iniciar servidor:
```bash
python manage.py runserver
```

### 3. Abrir navegador:
- API: http://127.0.0.1:8000/api/
- Frontend: Abrir `index.html` no navegador

---

## 🔑 Credenciais de Acesso

Após iniciar, faça login com:

```
Usuário: admin
Senha: admin123
```

---

## ⚠️ Requisitos

- Python 3.10 ou superior
- Dependências instaladas (requirements.txt)

### Instalar dependências:
```bash
cd backend
pip install -r requirements.txt
```

---

## 🛑 Como Parar o Servidor

### Se usou .bat ou .ps1:
- Feche a janela do servidor Django

### Se usou terminal manual:
- Pressione `Ctrl + C`

---

## 🐛 Problemas?

### "Python não encontrado"
- Instale Python: https://www.python.org/downloads/
- Marque a opção "Add Python to PATH" durante instalação

### "Porta 8000 já está em uso"
- Feche outros servidores rodando na porta 8000
- Ou use: `python manage.py runserver 8080`

### "Módulo não encontrado"
```bash
cd backend
pip install -r requirements.txt
```

### Banco de dados corrompido
```bash
cd backend
del db.sqlite3
python manage.py migrate
python setup.py
python popular_banco.py
```

---

## 📚 Documentação Completa

- `ACESSO_RAPIDO.txt` - Credenciais e acesso rápido
- `INTEGRACAO_COMPLETA.md` - Guia completo
- `STATUS_SISTEMA.md` - Status do sistema
- `API_REFERENCE.md` - Referência da API

---

## 🎉 Pronto!

Escolha um dos métodos acima e comece a usar o sistema!

**Recomendado**: Use o `INICIAR_SISTEMA.bat` (mais fácil)
