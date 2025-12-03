'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, Search, Eye } from 'lucide-react'

interface Student {
  id: string
  name: string
  email: string
  registration: string
  class: string
  status: 'active' | 'inactive'
  average: number
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Ana Silva',
      email: 'ana@email.com',
      registration: '2024001',
      class: '9º A',
      status: 'active',
      average: 8.5,
    },
    {
      id: '2',
      name: 'Bruno Santos',
      email: 'bruno@email.com',
      registration: '2024002',
      class: '9º B',
      status: 'active',
      average: 7.8,
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos@email.com',
      registration: '2024003',
      class: '8º A',
      status: 'active',
      average: 9.0,
    },
    {
      id: '4',
      name: 'Diana Costa',
      email: 'diana@email.com',
      registration: '2024004',
      class: '9º A',
      status: 'active',
      average: 7.2,
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterClass, setFilterClass] = useState('')

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = filterClass ? student.class === filterClass : true
    return matchesSearch && matchesClass
  })

  const classes = [...new Set(students.map(s => s.class))]

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Alunos</h1>
          <p className="text-gray-600 text-sm">Total: {filteredStudents.length} alunos</p>
        </div>
        <Button className="bg-teal-600 hover:bg-teal-700 gap-2">
          <Plus size={20} />
          Novo Aluno
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="">Todas as turmas</option>
            {classes.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      </Card>

      {/* Students Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nome</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Matrícula</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Turma</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Média</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.registration}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{student.class}</td>
                  <td className="px-6 py-4 text-sm font-bold">
                    <span className={student.average >= 7 ? 'text-green-600' : 'text-orange-600'}>
                      {student.average}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded text-blue-600" title="Visualizar">
                      <Eye size={18} />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded text-blue-600" title="Editar">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(student.id)}
                      className="p-2 hover:bg-gray-100 rounded text-red-600" title="Deletar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
