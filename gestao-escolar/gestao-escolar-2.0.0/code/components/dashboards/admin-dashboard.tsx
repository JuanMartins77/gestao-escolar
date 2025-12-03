'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, ClipboardList, TrendingUp, Award, AlertCircle } from 'lucide-react'
import StudentsPage from '../pages/students-page'
import TeachersPage from '../pages/teachers-page'
import ClassesPage from '../pages/classes-page'
import GradesPage from '../pages/grades-page'
import ReportsPage from '../pages/reports-page'
import SettingsPage from '../pages/settings-page'
import StatChart from '../charts/stat-chart'
import PerformanceChart from '../charts/performance-chart'

export default function AdminDashboard({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string
  setCurrentPage: (page: string) => void
}) {
  if (currentPage === 'students') return <StudentsPage />
  if (currentPage === 'teachers') return <TeachersPage />
  if (currentPage === 'classes') return <ClassesPage />
  if (currentPage === 'grades') return <GradesPage />
  if (currentPage === 'reports') return <ReportsPage />
  if (currentPage === 'settings') return <SettingsPage />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Admin</h1>
        <p className="text-gray-600">Bem-vindo ao painel de administração - Visão geral da escola</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Total de Alunos</p>
              <p className="text-3xl font-bold text-gray-900">342</p>
              <p className="text-xs text-green-600 mt-1">+12 este mês</p>
            </div>
            <Users className="text-teal-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-teal-500" style={{ width: '85%' }}></div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Professores Ativos</p>
              <p className="text-3xl font-bold text-gray-900">28</p>
              <p className="text-xs text-gray-500 mt-1">100% ativos</p>
            </div>
            <Users className="text-blue-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Turmas Ativas</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-gray-500 mt-1">Todas operacionais</p>
            </div>
            <BookOpen className="text-purple-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-purple-500" style={{ width: '100%' }}></div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Média Geral</p>
              <p className="text-3xl font-bold text-gray-900">7.8</p>
              <p className="text-xs text-green-600 mt-1">+0.3 vs mês anterior</p>
            </div>
            <TrendingUp className="text-green-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '78%' }}></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Performance Chart */}
          <Card className="p-6">
            <h2 className="text-lg font-bold mb-4 text-gray-900">Desempenho Acadêmico</h2>
            <PerformanceChart />
          </Card>
        </div>

        {/* Alerts */}
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50">
          <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-600" />
            Alertas Importantes
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded border-l-4 border-orange-500">
              <p className="font-semibold text-sm text-gray-900">Frequência Baixa</p>
              <p className="text-xs text-gray-600">5 alunos com frequência abaixo de 75%</p>
            </div>
            <div className="p-3 bg-white rounded border-l-4 border-red-500">
              <p className="font-semibold text-sm text-gray-900">Notas Pendentes</p>
              <p className="text-xs text-gray-600">3 turmas com notas não lançadas</p>
            </div>
            <div className="p-3 bg-white rounded border-l-4 border-yellow-500">
              <p className="font-semibold text-sm text-gray-900">Manutenção Programada</p>
              <p className="text-xs text-gray-600">Sistema em manutenção segunda 22h</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Enrollment Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Matrícula por Série</h2>
        <StatChart />
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Ações Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button
            onClick={() => setCurrentPage('students')}
            className="bg-teal-600 hover:bg-teal-700 w-full"
          >
            Gerenciar Alunos
          </Button>
          <Button
            onClick={() => setCurrentPage('teachers')}
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            Gerenciar Professores
          </Button>
          <Button
            onClick={() => setCurrentPage('classes')}
            className="bg-purple-600 hover:bg-purple-700 w-full"
          >
            Gerenciar Turmas
          </Button>
          <Button
            onClick={() => setCurrentPage('reports')}
            className="bg-green-600 hover:bg-green-700 w-full"
          >
            Ver Relatórios
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Atividade Recente</h2>
        <div className="space-y-3">
          {[
            { action: 'Nova matrícula', user: 'Pedro Oliveira', time: 'há 2 horas' },
            { action: 'Notas lançadas', user: 'Prof. Maria Santos - Turma 9º A', time: 'há 4 horas' },
            { action: 'Turma criada', user: '10º B - Português', time: 'há 1 dia' },
            { action: 'Professor adicionado', user: 'Carlos Silva', time: 'há 3 dias' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <p className="font-semibold text-sm text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-600">{item.user}</p>
              </div>
              <span className="text-xs text-gray-500">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
