'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Edit2, Download, TrendingUp } from 'lucide-react'

interface GradeRecord {
  id: string
  student: string
  portuguese: number
  math: number
  science: number
  history: number
  pe: number
  average: number
  status: 'approved' | 'warning' | 'failed'
}

export default function GradesPage() {
  const [grades, setGrades] = useState<GradeRecord[]>([
    {
      id: '1',
      student: 'Ana Silva',
      portuguese: 8.5,
      math: 8.0,
      science: 8.5,
      history: 9.0,
      pe: 9.5,
      average: 8.7,
      status: 'approved',
    },
    {
      id: '2',
      student: 'Bruno Santos',
      portuguese: 6.5,
      math: 6.0,
      science: 6.5,
      history: 7.0,
      pe: 8.0,
      average: 6.8,
      status: 'warning',
    },
    {
      id: '3',
      student: 'Carlos Oliveira',
      portuguese: 9.0,
      math: 8.5,
      science: 9.0,
      history: 8.5,
      pe: 9.5,
      average: 8.9,
      status: 'approved',
    },
    {
      id: '4',
      student: 'Diana Costa',
      portuguese: 5.0,
      math: 4.5,
      science: 5.0,
      history: 5.5,
      pe: 6.0,
      average: 5.2,
      status: 'failed',
    },
  ])

  const [selectedClass, setSelectedClass] = useState('9º A')
  const [editingGrade, setEditingGrade] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovado'
      case 'warning':
        return 'Atenção'
      case 'failed':
        return 'Reprovado'
      default:
        return 'Desconhecido'
    }
  }

  const getAverageColor = (average: number) => {
    if (average >= 7) return 'text-green-600'
    if (average >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Notas</h1>
          <p className="text-gray-600 text-sm">Acompanhe o desempenho acadêmico dos alunos</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <Download size={20} />
          Exportar Relatório
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Turma</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="9º A">9º A</option>
              <option value="9º B">9º B</option>
              <option value="8º A">8º A</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Status</label>
            <select className="w-full p-2 border rounded-lg">
              <option value="">Todos</option>
              <option value="approved">Aprovados</option>
              <option value="warning">Atenção</option>
              <option value="failed">Reprovados</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <p className="text-gray-700 text-sm">Aprovados</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {grades.filter(g => g.status === 'approved').length}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <p className="text-gray-700 text-sm">Atenção</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {grades.filter(g => g.status === 'warning').length}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100">
          <p className="text-gray-700 text-sm">Reprovados</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {grades.filter(g => g.status === 'failed').length}
          </p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <p className="text-gray-700 text-sm">Média da Turma</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {(grades.reduce((acc, g) => acc + g.average, 0) / grades.length).toFixed(1)}
          </p>
        </Card>
      </div>

      {/* Grades Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aluno</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Português</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Matemática</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Ciências</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">História</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Educação Física</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Média</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((record) => (
                <tr key={record.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{record.student}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{record.portuguese}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{record.math}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{record.science}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{record.history}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-600">{record.pe}</td>
                  <td className={`px-6 py-4 text-center text-sm font-bold ${getAverageColor(record.average)}`}>
                    {record.average.toFixed(1)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                      {getStatusLabel(record.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 hover:bg-gray-100 rounded inline-flex">
                      <Edit2 size={18} className="text-blue-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Performance Indicators */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={20} />
          Análise de Desempenho por Disciplina
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { subject: 'Português', average: 7.5, color: 'blue' },
            { subject: 'Matemática', average: 6.8, color: 'purple' },
            { subject: 'Ciências', average: 7.3, color: 'green' },
          ].map((item) => (
            <div key={item.subject}>
              <p className="font-semibold text-gray-900 mb-2">{item.subject}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <div className={`text-2xl font-bold text-${item.color}-600`}>{item.average}</div>
                  <p className="text-xs text-gray-600">Média da turma</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
