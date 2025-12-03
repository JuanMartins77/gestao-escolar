/**
 * Configurações de Dashboard por Tipo de Usuário - ATUALIZADO
 * Define o que cada cargo pode ver e acessar
 */

function getDashboardConfig(userType) {
    const configs = {
        // 🔷 ADMINISTRADOR - Acesso Total
        'admin': {
            stats: [
                {
                    icon: '👥',
                    label: 'Total de Usuários',
                    apiCall: () => api.getUsuarios()
                },
                {
                    icon: '👨‍🎓',
                    label: 'Total de Alunos',
                    apiCall: () => api.getAlunos()
                },
                {
                    icon: '🏫',
                    label: 'Turmas',
                    apiCall: () => api.getTurmas()
                },
                {
                    icon: '📊',
                    label: 'Relatórios',
                    apiCall: () => ({ count: 8 })
                }
            ],
            menu: [
                {
                    icon: '👥',
                    title: 'Gestão de Usuários',
                    description: 'Gerenciar todos os usuários do sistema',
                    onClick: () => window.location.href = 'admin-usuarios.html'
                },
                {
                    icon: '👨‍🎓',
                    title: 'Gestão de Alunos',
                    description: 'Cadastrar e gerenciar alunos',
                    onClick: () => window.location.href = 'admin-alunos.html'
                },
                {
                    icon: '🏫',
                    title: 'Gestão de Turmas',
                    description: 'Criar e gerenciar turmas',
                    onClick: () => window.location.href = 'admin-turmas.html'
                },
                {
                    icon: '📊',
                    title: 'Relatórios Gerenciais',
                    description: 'Visualizar relatórios e estatísticas',
                    onClick: () => window.location.href = 'admin-relatorios.html'
                },
                {
                    icon: '⚙️',
                    title: 'Configurações',
                    description: 'Configurar parâmetros do sistema',
                    onClick: () => alert('Configurações - Em desenvolvimento')
                },
                {
                    icon: '📢',
                    title: 'Comunicados',
                    description: 'Enviar comunicados gerais',
                    onClick: () => alert('Comunicados - Em desenvolvimento')
                }
            ]
        },

        // 🟩 COORDENADOR
        'coordenador': {
            stats: [
                {
                    icon: '🏫',
                    label: 'Minhas Turmas',
                    apiCall: () => api.getTurmas()
                },
                {
                    icon: '👨‍🎓',
                    label: 'Total de Alunos',
                    apiCall: () => api.getAlunos()
                },
                {
                    icon: '👨‍🏫',
                    label: 'Professores',
                    apiCall: () => ({ count: 0 })
                },
                {
                    icon: '📊',
                    label: 'Média Geral',
                    apiCall: () => ({ count: '7.5' })
                }
            ],
            menu: [
                {
                    icon: '🏫',
                    title: 'Minhas Turmas',
                    description: 'Gerenciar turmas sob coordenação',
                    onClick: () => window.location.href = 'coord-turmas.html'
                },
                {
                    icon: '📊',
                    title: 'Desempenho dos Alunos',
                    description: 'Análise de desempenho acadêmico',
                    onClick: () => window.location.href = 'coord-desempenho.html'
                },
                {
                    icon: '📚',
                    title: 'Disciplinas',
                    description: 'Gerenciar disciplinas',
                    onClick: () => alert('Disciplinas - Em desenvolvimento')
                },
                {
                    icon: '👨‍🏫',
                    title: 'Professores',
                    description: 'Acompanhar professores',
                    onClick: () => alert('Professores - Em desenvolvimento')
                },
                {
                    icon: '📋',
                    title: 'Relatórios',
                    description: 'Relatórios pedagógicos',
                    onClick: () => alert('Relatórios - Em desenvolvimento')
                },
                {
                    icon: '📢',
                    title: 'Comunicados',
                    description: 'Enviar comunicados',
                    onClick: () => alert('Comunicados - Em desenvolvimento')
                }
            ]
        },

        // 🟦 PROFESSOR
        'professor': {
            stats: [
                {
                    icon: '🏫',
                    label: 'Minhas Turmas',
                    apiCall: () => api.getTurmas()
                },
                {
                    icon: '👨‍🎓',
                    label: 'Total de Alunos',
                    apiCall: () => api.getAlunos()
                },
                {
                    icon: '📝',
                    label: 'Notas Lançadas',
                    apiCall: () => ({ count: 0 })
                },
                {
                    icon: '📚',
                    label: 'Materiais',
                    apiCall: () => ({ count: 0 })
                }
            ],
            menu: [
                {
                    icon: '🏫',
                    title: 'Minhas Turmas',
                    description: 'Ver turmas que leciono',
                    onClick: () => window.location.href = 'professor-turmas.html'
                },
                {
                    icon: '👨‍🎓',
                    title: 'Meus Alunos',
                    description: 'Visualizar lista de alunos',
                    onClick: () => window.location.href = 'professor-alunos.html'
                },
                {
                    icon: '📝',
                    title: 'Lançar Notas',
                    description: 'Registrar notas dos alunos',
                    onClick: () => window.location.href = 'professor-notas.html'
                },
                {
                    icon: '📅',
                    title: 'Lançar Faltas',
                    description: 'Registrar frequência',
                    onClick: () => window.location.href = 'professor-faltas.html'
                },
                {
                    icon: '📚',
                    title: 'Materiais Didáticos',
                    description: 'Compartilhar materiais',
                    onClick: () => window.location.href = 'professor-materiais.html'
                },
                {
                    icon: '📊',
                    title: 'Desempenho',
                    description: 'Análise de desempenho',
                    onClick: () => window.location.href = 'professor-desempenho.html'
                }
            ]
        },

        // 🟧 SECRETÁRIA
        'secretaria': {
            stats: [
                {
                    icon: '👨‍🎓',
                    label: 'Alunos Cadastrados',
                    apiCall: () => api.getAlunos()
                },
                {
                    icon: '📝',
                    label: 'Matrículas Pendentes',
                    apiCall: () => ({ count: 0 })
                },
                {
                    icon: '📄',
                    label: 'Documentos',
                    apiCall: () => ({ count: 0 })
                },
                {
                    icon: '✅',
                    label: 'Cadastros Hoje',
                    apiCall: () => ({ count: 0 })
                }
            ],
            menu: [
                {
                    icon: '👨‍🎓',
                    title: 'Cadastro de Alunos',
                    description: 'Cadastrar e gerenciar alunos',
                    onClick: () => window.location.href = 'secret-alunos.html'
                },
                {
                    icon: '📝',
                    title: 'Matrículas',
                    description: 'Gerenciar matrículas',
                    onClick: () => alert('Matrículas - Em desenvolvimento')
                },
                {
                    icon: '📄',
                    title: 'Documentos',
                    description: 'Gerenciar documentos',
                    onClick: () => alert('Documentos - Em desenvolvimento')
                },
                {
                    icon: '✏️',
                    title: 'Atualizar Dados',
                    description: 'Atualizar informações',
                    onClick: () => alert('Atualizar Dados - Em desenvolvimento')
                },
                {
                    icon: '🏫',
                    title: 'Consultar Turmas',
                    description: 'Visualizar turmas',
                    onClick: () => alert('Turmas - Em desenvolvimento')
                },
                {
                    icon: '📊',
                    title: 'Relatórios',
                    description: 'Gerar relatórios',
                    onClick: () => alert('Relatórios - Em desenvolvimento')
                }
            ]
        },

        // 🟪 RESPONSÁVEL
        'responsavel': {
            stats: [
                {
                    icon: '👨‍🎓',
                    label: 'Filhos',
                    apiCall: () => ({ count: 0 })
                },
                {
                    icon: '📝',
                    label: 'Média Geral',
                    apiCall: () => ({ count: '0.0' })
                },
                {
                    icon: '📅',
                    label: 'Frequência',
                    apiCall: () => ({ count: '0%' })
                },
                {
                    icon: '📢',
                    label: 'Comunicados',
                    apiCall: () => ({ count: 0 })
                }
            ],
            menu: [
                {
                    icon: '📋',
                    title: 'Boletim',
                    description: 'Ver boletim dos filhos',
                    onClick: () => window.location.href = 'resp-boletim.html'
                },
                {
                    icon: '📅',
                    title: 'Faltas',
                    description: 'Acompanhar frequência',
                    onClick: () => alert('Faltas - Em desenvolvimento')
                },
                {
                    icon: '📢',
                    title: 'Comunicados',
                    description: 'Ver comunicados',
                    onClick: () => alert('Comunicados - Em desenvolvimento')
                },
                {
                    icon: '📞',
                    title: 'Contatos',
                    description: 'Contatos da escola',
                    onClick: () => alert('Contatos - Em desenvolvimento')
                },
                {
                    icon: '📆',
                    title: 'Calendário',
                    description: 'Calendário escolar',
                    onClick: () => alert('Calendário - Em desenvolvimento')
                }
            ]
        },

        // 🟨 ALUNO
        'aluno': {
            stats: [
                {
                    icon: '📝',
                    label: 'Média Geral',
                    apiCall: () => ({ count: '0.0' })
                },
                {
                    icon: '📚',
                    label: 'Disciplinas',
                    apiCall: () => ({ count: 0 })
                },
                {
                    icon: '📅',
                    label: 'Frequência',
                    apiCall: () => ({ count: '0%' })
                },
                {
                    icon: '📋',
                    label: 'Atividades',
                    apiCall: () => ({ count: 0 })
                }
            ],
            menu: [
                {
                    icon: '📝',
                    title: 'Minhas Notas',
                    description: 'Visualizar boletim',
                    onClick: () => window.location.href = 'aluno-notas.html'
                },
                {
                    icon: '📅',
                    title: 'Minhas Faltas',
                    description: 'Acompanhar frequência',
                    onClick: () => alert('Faltas - Em desenvolvimento')
                },
                {
                    icon: '📋',
                    title: 'Atividades',
                    description: 'Ver atividades',
                    onClick: () => alert('Atividades - Em desenvolvimento')
                },
                {
                    icon: '📚',
                    title: 'Materiais',
                    description: 'Acessar materiais',
                    onClick: () => alert('Materiais - Em desenvolvimento')
                },
                {
                    icon: '📢',
                    title: 'Comunicados',
                    description: 'Ver comunicados',
                    onClick: () => alert('Comunicados - Em desenvolvimento')
                },
                {
                    icon: '📆',
                    title: 'Calendário',
                    description: 'Calendário escolar',
                    onClick: () => alert('Calendário - Em desenvolvimento')
                }
            ]
        }
    };

    return configs[userType] || configs['aluno'];
}
