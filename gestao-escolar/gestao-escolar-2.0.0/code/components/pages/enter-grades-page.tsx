'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { Save, AlertCircle } from 'lucide-react'

interface GradeEntry {
  studentId: string
  student: string
  grade: string
}

export default function EnterGradesPage() {
  const [grades, setGrades] = useState<GradeEntry[]>([
    { studentId: '1', student: 'Ana Silva', grade: '8.5' },
    { studentId: '2', student: 'Bruno Santos', grade: '7.8' },
    { studentId: '3', student: 'Carlos Oliveira', grade: '' },
    { studentId: '4', student: 'Diana Costa', grade: '' },
  ])

  const [selectedClass, setSelectedClass] = useState('9º A')
  const [selectedAssessment, setSelectedAssessment] = useState('prova-1')
  const [selectedSubject, setSelectedSubject] = useState('matematica')

  const handleGradeChange = (id: string, value: string) => {
    setGrades(grades.map((g) =>
      g.studentId === id
        ? { ...g, grade: value.replace(/[^0-9.]/g, '').slice(0, 5) }
        : g
    ))
  }

  const handleSave = () => {
    console.log('Saving grades:', grades)
    alert('Notas salvas com sucesso!')
  }

  const pendingCount = grades.filter(g => !g.grade).length
  const filledCount = grades.filter(g => g.grade).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Lançar Notas</h1>
        <p className="text-gray-600 text-sm">Insira as notas dos alunos para a avaliação</p>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Informações da Avaliação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Disciplina</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="matematica">Matemática</option>
              <option value="portugues">Português</option>
              <option value="ciencias">Ciências</option>
              <option value="historia">História</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação</label>
            <select
              value={selectedAssessment}
              onChange={(e) => setSelectedAssessment(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="prova-1">Prova 1</option>
              <option value="prova-2">Prova 2</option>
              <option value="trabalho">Trabalho</option>
              <option value="participacao">Participação</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Progress */}
      <Card className="p-4 bg-blue-50 border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-900 font-semibold">Progresso de Lançamento</p>
            <p className="text-xs text-blue-700">{filledCount} de {grades.length} notas inseridas</p>
          </div>
          <div className="flex-1 mx-4 bg-blue-200 rounded-full h-2 ml-4">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(filledCount / grades.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold text-blue-900">{Math.round((filledCount / grades.length) * 100)}%</span>
        </div>
      </Card>

      {/* Warning if any grades pending */}
      {pendingCount > 0 && (
        <Card className="p-4 bg-yellow-50 border border-yellow-200 flex items-start gap-3">
          <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-yellow-900">Atenção</p>
            <p className="text-xs text-yellow-700">Ainda existem {pendingCount} aluno(s) sem nota lançada</p>
          </div>
        </Card>
      )}

      {/* Grade Entry Form */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Aluno</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nota (0-10)</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((item) => {
                const gradeNum = item.grade ? parseFloat(item.grade) : null
                let status = ''
                if (gradeNum !== null) {
                  status = gradeNum >= 7 ? 'Aprovado' : 'Reprovado'
                }

                return (
                  <tr key={item.studentId} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.student}</td>
                    <td className="px-6 py-4">
                      <Input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={item.grade}
                        onChange={(e) => handleGradeChange(item.studentId, e.target.value)}
                        placeholder="Digite a nota"
                        className="w-32"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {status && (
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          status === 'Aprovado'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {status}
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700 gap-2">
          <Save size={20} />
          Salvar Notas
        </Button>
        <Button variant="outline" className="flex-1">Cancelar</Button>
      </div>
    </div>
  )
}
