'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, Edit2, Trash2, Search, Eye } from 'lucide-react'
import { useState } from 'react'

interface Teacher {
  id: string
  name: string
  email: string
  specialization: string
  department: string
  classes: number
  status: 'active' | 'inactive'
  phone: string
}

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: '1',
      name: 'João Silva',
      email: 'joao@escola.com',
      specialization: 'Licenciado em Matemática',
      department: 'Matemática',
      classes: 4,
      status: 'active',
      phone: '(11) 98765-4321',
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@escola.com',
      specialization: 'Licenciada em Português',
      department: 'Língua Portuguesa',
      classes: 3,
      status: 'active',
      phone: '(11) 98765-4322',
    },
    {
      id: '3',
      name: 'Carlos Oliveira',
      email: 'carlos@escola.com',
      specialization: 'Licenciado em Ciências',
      department: 'Ciências',
      classes: 5,
      status: 'active',
      phone: '(11) 98765-4323',
    },
  ])

  const [searchTerm, setSearchTerm] = useState('')

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Professores</h1>
          <p className="text-gray-600 text-sm">Total: {filteredTeachers.length} professores</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
          <Plus size={20} />
          Novo Professor
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <Search size={20} className="text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por nome ou departamento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card key={teacher.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900">{teacher.name}</h3>
                <p className="text-sm text-blue-600 font-semibold">{teacher.department}</p>
              </div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">
                Ativo
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Email:</span> {teacher.email}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Telefone:</span> {teacher.phone}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Especialização:</span> {teacher.specialization}
              </p>
              <p className="flex items-center gap-2">
                <span className="font-semibold">Turmas:</span> {teacher.classes}
              </p>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <Eye size={16} />
                Detalhes
              </Button>
              <Button size="sm" variant="outline" className="flex-1 gap-1">
                <Edit2 size={16} />
                Editar
              </Button>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="p-2 hover:bg-red-50 rounded border border-red-200 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card className="p-12 text-center">
          <p className="text-gray-500 mb-4">Nenhum professor encontrado</p>
          <Button className="bg-blue-600 hover:bg-blue-700">Adicionar Professor</Button>
        </Card>
      )}
    </div>
  )
}
