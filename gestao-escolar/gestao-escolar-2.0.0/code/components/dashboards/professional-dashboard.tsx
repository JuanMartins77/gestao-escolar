'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, ClipboardList, AlertCircle, BarChart3, Mail } from 'lucide-react'
import MyStudentsPage from '../pages/my-students-page'
import MyClassesPage from '../pages/my-classes-page'
import EnterGradesPage from '../pages/enter-grades-page'
import SettingsPage from '../pages/settings-page'

export default function ProfessionalDashboard({
  currentPage,
  setCurrentPage,
}: {
  currentPage: string
  setCurrentPage: (page: string) => void
}) {
  if (currentPage === 'my-students') return <MyStudentsPage />
  if (currentPage === 'my-classes') return <MyClassesPage />
  if (currentPage === 'enter-grades') return <EnterGradesPage />
  if (currentPage === 'settings') return <SettingsPage />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo, Professor João</h1>
        <p className="text-gray-600">Aqui você encontra todas as ferramentas para gerenciar suas aulas e alunos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Meus Alunos</p>
              <p className="text-3xl font-bold text-gray-900">87</p>
              <p className="text-xs text-gray-500 mt-1">em 4 turmas</p>
            </div>
            <Users className="text-teal-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-teal-500" style={{ width: '100%' }}></div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Minhas Turmas</p>
              <p className="text-3xl font-bold text-gray-900">4</p>
              <p className="text-xs text-gray-500 mt-1">todas ativas</p>
            </div>
            <BookOpen className="text-blue-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-blue-500" style={{ width: '100%' }}></div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-600 text-sm">Notas Pendentes</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-orange-600 mt-1">para lançar</p>
            </div>
            <ClipboardList className="text-orange-500" size={40} />
          </div>
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="h-full bg-orange-500" style={{ width: '40%' }}></div>
          </div>
        </Card>
      </div>

      {/* Alerts and Important Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alerts */}
        <Card className="p-6 lg:col-span-2 bg-gradient-to-br from-orange-50 to-red-50">
          <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
            <AlertCircle size={20} className="text-orange-600" />
            Alertas
          </h2>
          <div className="space-y-3">
            <div className="p-3 bg-white rounded border-l-4 border-orange-500">
              <p className="font-semibold text-sm text-gray-900">Notas Pendentes</p>
              <p className="text-xs text-gray-600">Você tem 12 notas para lançar da prova de Matemática</p>
            </div>
            <div className="p-3 bg-white rounded border-l-4 border-yellow-500">
              <p className="font-semibold text-sm text-gray-900">Aula Amanhã</p>
              <p className="text-xs text-gray-600">9º A às 08:00 - Sala 101</p>
            </div>
            <div className="p-3 bg-white rounded border-l-4 border-blue-500">
              <p className="font-semibold text-sm text-gray-900">Frequência Baixa</p>
              <p className="text-xs text-gray-600">Bruno Santos tem faltado frequentemente</p>
            </div>
          </div>
        </Card>

        {/* Quick Statistics */}
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Esta Semana</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Aulas Ministradas</span>
              <span className="font-bold text-teal-600">16</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Média de Presença</span>
              <span className="font-bold text-teal-600">92%</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Avaliações Aplicadas</span>
              <span className="font-bold text-teal-600">2</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white rounded">
              <span className="text-sm text-gray-700">Trabalhos Pendentes</span>
              <span className="font-bold text-orange-600">5</span>
            </div>
          </div>
        </Card>
      </div>

      {/* My Classes Schedule */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
          <BookOpen size={20} />
          Minhas Aulas (Esta Semana)
        </h2>
        <div className="space-y-2">
          {[
            { day: 'Segunda', time: '08:00-09:00', class: '9º A - Sala 101' },
            { day: 'Segunda', time: '09:00-10:00', class: '9º B - Sala 102' },
            { day: 'Terça', time: '08:00-09:00', class: '8º A - Sala 103' },
            { day: 'Quarta', time: '14:00-15:00', class: '7º B - Sala 104' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
              <div>
                <p className="font-semibold text-gray-900">{item.day}</p>
                <p className="text-xs text-gray-600">{item.time}</p>
              </div>
              <span className="text-sm text-teal-600 font-semibold">{item.class}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Student Performance Overview */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900 flex items-center gap-2">
          <BarChart3 size={20} />
          Desempenho dos Alunos por Turma
        </h2>
        <div className="space-y-4">
          {[
            { class: '9º A', average: 7.8, students: 28 },
            { class: '9º B', average: 7.5, students: 30 },
            { class: '8º A', average: 7.3, students: 26 },
            { class: '7º B', average: 7.9, students: 24 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-700">{item.class} ({item.students} alunos)</span>
                <span className="text-sm font-bold text-teal-600">Média: {item.average}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 h-2 rounded-full"
                  style={{ width: `${(item.average / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          <Button
            onClick={() => setCurrentPage('my-students')}
            className="bg-teal-600 hover:bg-teal-700 w-full"
          >
            Ver Meus Alunos
          </Button>
          <Button
            onClick={() => setCurrentPage('enter-grades')}
            className="bg-orange-600 hover:bg-orange-700 w-full"
          >
            Lançar Notas
          </Button>
          <Button
            onClick={() => setCurrentPage('my-classes')}
            className="bg-blue-600 hover:bg-blue-700 w-full"
          >
            Minhas Turmas
          </Button>
          <Button
            variant="outline"
            className="w-full gap-2"
          >
            <Mail size={18} />
            Comunicado
          </Button>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900">Atividade Recente</h2>
        <div className="space-y-3">
          {[
            { action: 'Nota lançada', description: 'Prova de Matemática - 9º A', time: 'há 2 horas' },
            { action: 'Frequência registrada', description: 'Turma 9º B - 28/30 alunos', time: 'há 4 horas' },
            { action: 'Comunicado enviado', description: 'Pais de Ana Silva', time: 'ontem' },
            { action: 'Trabalho recebido', description: 'Carlos Oliveira - Projeto Ciências', time: '2 dias atrás' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <p className="font-semibold text-sm text-gray-900">{item.action}</p>
                <p className="text-xs text-gray-600">{item.description}</p>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{item.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
