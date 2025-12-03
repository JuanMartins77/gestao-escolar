'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, Edit2, Trash2, Users } from 'lucide-react'
import { useState } from 'react'

interface Class {
  id: string
  name: string
  teacher: string
  students: number
  schedule: string
  room: string
  capacity: number
  status: 'active' | 'inactive'
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([
    {
      id: '1',
      name: '9º A',
      teacher: 'João Silva',
      students: 28,
      schedule: 'Seg-Sex 08:00-09:00',
      room: 'Sala 101',
      capacity: 30,
      status: 'active',
    },
    {
      id: '2',
      name: '9º B',
      teacher: 'Maria Santos',
      students: 30,
      schedule: 'Seg-Sex 09:00-10:00',
      room: 'Sala 102',
      capacity: 30,
      status: 'active',
    },
    {
      id: '3',
      name: '8º A',
      teacher: 'Carlos Oliveira',
      students: 26,
      schedule: 'Seg-Sex 10:00-11:00',
      room: 'Sala 103',
      capacity: 30,
      status: 'active',
    },
    {
      id: '4',
      name: '7º B',
      teacher: 'João Silva',
      students: 24,
      schedule: 'Seg-Sex 14:00-15:00',
      room: 'Sala 104',
      capacity: 30,
      status: 'active',
    },
  ])

  const handleDelete = (id: string) => {
    setClasses(classes.filter(c => c.id !== id))
  }

  const getOccupancyColor = (current: number, capacity: number) => {
    const percentage = (current / capacity) * 100
    if (percentage >= 90) return 'text-red-600'
    if (percentage >= 70) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Turmas</h1>
          <p className="text-gray-600 text-sm">Total: {classes.length} turmas ativas</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
          <Plus size={20} />
          Nova Turma
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{classItem.name}</h3>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded font-semibold">
                  {classItem.status === 'active' ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <p className="text-sm text-gray-600">Prof. {classItem.teacher}</p>
            </div>

            <div className="space-y-2 text-sm mb-4">
              <p className="text-gray-700">
                <span className="font-semibold">Horário:</span> {classItem.schedule}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Sala:</span> {classItem.room}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Users size={16} className="text-gray-400" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold">{classItem.students}/{classItem.capacity} Alunos</span>
                    <span className={getOccupancyColor(classItem.students, classItem.capacity)}>
                      {Math.round((classItem.students / classItem.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: `${(classItem.students / classItem.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" variant="outline" className="flex-1">
                <Edit2 size={16} />
              </Button>
              <button
                onClick={() => handleDelete(classItem.id)}
                className="p-2 hover:bg-red-50 rounded border border-red-200 text-red-600"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
