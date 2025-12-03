'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Mail, MapPin, Calendar, Award } from 'lucide-react'

interface StudentDetail {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  registration: string
  class: string
  enrollmentDate: string
  guardian: string
  guardianPhone: string
  average: number
  frequency: number
  status: 'active' | 'inactive'
}

export default function StudentDetail({ 
  onBack, 
  studentId 
}: { 
  onBack: () => void
  studentId: string 
}) {
  const student: StudentDetail = {
    id: studentId,
    name: 'Ana Silva',
    email: 'ana@email.com',
    phone: '(11) 98765-4321',
    dateOfBirth: '2010-05-15',
    address: 'Rua Principal, 123 - São Paulo, SP',
    registration: '2024001',
    class: '9º A',
    enrollmentDate: '2024-01-15',
    guardian: 'Maria Silva',
    guardianPhone: '(11) 99876-5432',
    average: 8.5,
    frequency: 95,
    status: 'active',
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
      >
        <ArrowLeft size={20} />
        Voltar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile */}
        <Card className="p-6 md:col-span-1">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl text-white font-bold">
                {student.name.charAt(0)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{student.name}</h1>
            <p className="text-teal-600 font-semibold">{student.registration}</p>
            <div className="mt-4 p-3 bg-teal-50 rounded-lg">
              <p className="text-sm text-gray-600">Média Geral</p>
              <p className="text-3xl font-bold text-teal-600">{student.average}</p>
            </div>
          </div>
        </Card>

        {/* Information */}
        <Card className="p-6 md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wide">Email</p>
              <div className="flex items-center gap-2 mt-1">
                <Mail size={16} className="text-gray-400" />
                <p className="text-gray-900">{student.email}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wide">Telefone</p>
              <div className="flex items-center gap-2 mt-1">
                <Phone size={16} className="text-gray-400" />
                <p className="text-gray-900">{student.phone}</p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wide">Data de Nascimento</p>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={16} className="text-gray-400" />
                <p className="text-gray-900">
                  {new Date(student.dateOfBirth).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div>
              <p className="text-gray-600 text-xs uppercase tracking-wide">Turma</p>
              <div className="flex items-center gap-2 mt-1">
                <Award size={16} className="text-gray-400" />
                <p className="text-gray-900">{student.class}</p>
              </div>
            </div>

            <div className="col-span-2">
              <p className="text-gray-600 text-xs uppercase tracking-wide">Endereço</p>
              <div className="flex items-center gap-2 mt-1">
                <MapPin size={16} className="text-gray-400" />
                <p className="text-gray-900">{student.address}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Academic Performance */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Desempenho Acadêmico</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-gray-700 text-sm">Média Geral</p>
            <p className="text-3xl font-bold text-green-600 mt-2">{student.average}</p>
            <p className="text-xs text-gray-600 mt-1">Excelente desempenho</p>
          </div>

          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-gray-700 text-sm">Frequência</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{student.frequency}%</p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${student.frequency}%` }}></div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-gray-700 text-sm">Status</p>
            <p className="text-lg font-bold text-purple-600 mt-2">Ativo</p>
            <p className="text-xs text-gray-600 mt-1">Desde 15 de Janeiro de 2024</p>
          </div>
        </div>
      </Card>

      {/* Guardian Information */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Responsável</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Nome do Responsável</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{student.guardian}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Telefone</p>
            <p className="text-lg font-semibold text-gray-900 mt-1">{student.guardianPhone}</p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1 bg-teal-600 hover:bg-teal-700">Editar Informações</Button>
        <Button variant="outline" className="flex-1">Gerar Relatório</Button>
        <Button variant="outline" className="flex-1">Contato com Responsável</Button>
      </div>
    </div>
  )
}
