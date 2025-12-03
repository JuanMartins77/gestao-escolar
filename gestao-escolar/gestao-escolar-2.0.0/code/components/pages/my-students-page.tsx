'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Search, Eye, Download } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Student {
  id: string
  name: string
  class: string
  average: number
  attendance: number
  status: 'good' | 'warning' | 'alert'
}

export default function MyStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [students] = useState<Student[]>([
    { id: '1', name: 'Ana Silva', class: '9º A', average: 8.5, attendance: 95, status: 'good' },
    { id: '2', name: 'Bruno Santos', class: '9º A', average: 6.5, attendance: 80, status: 'alert' },
    { id: '3', name: 'Carlos Oliveira', class: '9º A', average: 9.0, attendance: 98, status: 'good' },
    { id: '4', name: 'Diana Costa', class: '9º A', average: 7.2, attendance: 85, status: 'warning' },
    { id: '5', name: 'Eduardo Santos', class: '9º B', average: 7.8, attendance: 92, status: 'good' },
    { id: '6', name: 'Fernanda Lima', class: '9º B', average: 6.2, attendance: 75, status: 'alert' },
  ])

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'alert':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'good':
        return 'Bom'
      case 'warning':
        return 'Atenção'
      case 'alert':
        return 'Crítico'
      default:
        return 'Desconhecido'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meus Alunos</h1>
          <p className="text-gray-600 text-sm">Total: {filteredStudents.length} alunos</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
          <Download size={20} />
          Exportar Lista
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar aluno por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{student.name}</h3>
                <p className="text-sm text-gray-600">{student.class}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(student.status)}`}>
                {getStatusLabel(student.status)}
              </span>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Média Geral</span>
                  <span className="text-sm font-bold text-teal-600">{student.average}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full"
                    style={{ width: `${(student.average / 10) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">Frequência</span>
                  <span className="text-sm font-bold text-blue-600">{student.attendance}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${student.attendance}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full gap-2">
              <Eye size={18} />
              Ver Detalhes
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
