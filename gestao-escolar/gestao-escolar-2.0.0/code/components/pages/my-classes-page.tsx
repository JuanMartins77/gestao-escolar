'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, Users, Clock, BookOpen } from 'lucide-react'
import { useState } from 'react'

export default function MyClassesPage() {
  const [classes] = useState([
    {
      id: '1',
      name: '9º A',
      subject: 'Matemática',
      students: 28,
      time: '08:00-09:00',
      room: 'Sala 101',
      schedule: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    },
    {
      id: '2',
      name: '9º B',
      subject: 'Matemática',
      students: 30,
      time: '09:00-10:00',
      room: 'Sala 102',
      schedule: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    },
    {
      id: '3',
      name: '8º A',
      subject: 'Matemática',
      students: 26,
      time: '10:00-11:00',
      room: 'Sala 103',
      schedule: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    },
    {
      id: '4',
      name: '7º B',
      subject: 'Matemática',
      students: 24,
      time: '14:00-15:00',
      room: 'Sala 104',
      schedule: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'],
    },
  ])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Minhas Turmas</h1>
        <p className="text-gray-600 text-sm">Gerencie suas turmas e aulas</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Turmas</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{classes.length}</p>
            </div>
            <BookOpen className="text-teal-500" size={40} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total de Alunos</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {classes.reduce((acc, c) => acc + c.students, 0)}
              </p>
            </div>
            <Users className="text-blue-500" size={40} />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Aulas por Semana</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">20</p>
            </div>
            <Calendar className="text-purple-500" size={40} />
          </div>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{classItem.name}</h3>
                <span className="px-3 py-1 bg-teal-100 text-teal-800 text-xs rounded font-semibold">
                  {classItem.subject}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Users size={18} className="text-gray-400" />
                <span>
                  <span className="font-semibold">{classItem.students}</span> alunos
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <Clock size={18} className="text-gray-400" />
                <span>{classItem.time}</span>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-700">
                <BookOpen size={18} className="text-gray-400" />
                <span>{classItem.room}</span>
              </div>

              <div className="flex items-start gap-3 text-sm">
                <Calendar size={18} className="text-gray-400 mt-0.5" />
                <div className="flex flex-wrap gap-2">
                  {classItem.schedule.map((day) => (
                    <span key={day} className="px-2 py-1 bg-gray-100 rounded text-gray-700 font-medium">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-teal-600 hover:bg-teal-700">
                Ver Detalhes
              </Button>
              <Button size="sm" variant="outline" className="flex-1">
                Editar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
