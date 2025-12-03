'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function StudentForm({ onBack, isEdit = false }: { onBack: () => void; isEdit?: boolean }) {
  const [formData, setFormData] = useState({
    name: isEdit ? 'Ana Silva' : '',
    email: isEdit ? 'ana@email.com' : '',
    phone: isEdit ? '(11) 98765-4321' : '',
    dateOfBirth: isEdit ? '2010-05-15' : '',
    address: isEdit ? 'Rua Principal, 123 - São Paulo, SP' : '',
    class: isEdit ? '9º A' : '',
    guardian: isEdit ? 'Maria Silva' : '',
    guardianPhone: isEdit ? '(11) 99876-5432' : '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    onBack()
  }

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold"
      >
        <ArrowLeft size={20} />
        Cancelar
      </button>

      <Card className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {isEdit ? 'Editar Aluno' : 'Novo Aluno'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-900">Informações Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo *</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="email@exemplo.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(11) 98765-4321"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento *</label>
                <Input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
                <Input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Rua, número - Cidade, Estado"
                />
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-900">Informações Acadêmicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Turma *</label>
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg"
                  required
                >
                  <option value="">Selecione a turma</option>
                  <option value="6º A">6º A</option>
                  <option value="6º B">6º B</option>
                  <option value="7º A">7º A</option>
                  <option value="7º B">7º B</option>
                  <option value="8º A">8º A</option>
                  <option value="8º B">8º B</option>
                  <option value="9º A">9º A</option>
                  <option value="9º B">9º B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-gray-900">Responsável</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável *</label>
                <Input
                  type="text"
                  name="guardian"
                  value={formData.guardian}
                  onChange={handleChange}
                  placeholder="Nome do responsável"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefone do Responsável</label>
                <Input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  placeholder="(11) 99876-5432"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t">
            <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700">
              {isEdit ? 'Salvar Alterações' : 'Criar Aluno'}
            </Button>
            <Button
              type="button"
              onClick={onBack}
              variant="outline"
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
