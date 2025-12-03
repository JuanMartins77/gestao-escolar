'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, BarChart3, PieChartIcon, TrendingUp } from 'lucide-react'

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600 text-sm">Análise detalhada do desempenho escolar</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700 gap-2">
          <Download size={20} />
          Exportar Relatório
        </Button>
      </div>

      {/* Report Selection */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Selecione o Tipo de Relatório</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-teal-200 rounded-lg hover:bg-teal-50 transition-colors">
            <BarChart3 className="text-teal-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900 text-sm">Desempenho Acadêmico</p>
          </button>
          <button className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
            <PieChartIcon className="text-blue-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900 text-sm">Frequência</p>
          </button>
          <button className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors">
            <TrendingUp className="text-purple-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900 text-sm">Tendências</p>
          </button>
          <button className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors">
            <BarChart3 className="text-green-600 mb-2" size={24} />
            <p className="font-semibold text-gray-900 text-sm">Comparativo</p>
          </button>
        </div>
      </Card>

      {/* Performance Report */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Relatório de Desempenho por Turma</h2>
        <div className="space-y-4">
          {[
            { class: '9º A', average: 7.8, students: 28, approved: 26, failed: 2 },
            { class: '9º B', average: 7.5, students: 30, approved: 28, failed: 2 },
            { class: '8º A', average: 7.3, students: 26, approved: 24, failed: 2 },
            { class: '7º B', average: 7.9, students: 24, approved: 23, failed: 1 },
          ].map((item) => (
            <div key={item.class} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">{item.class}</h3>
                <span className="text-sm font-bold text-teal-600">Média: {item.average}</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-sm">
                <div className="p-2 bg-white rounded">
                  <p className="text-gray-600">Total</p>
                  <p className="font-bold text-lg">{item.students}</p>
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <p className="text-gray-600">Aprovados</p>
                  <p className="font-bold text-green-600">{item.approved}</p>
                </div>
                <div className="p-2 bg-red-50 rounded">
                  <p className="text-gray-600">Reprovados</p>
                  <p className="font-bold text-red-600">{item.failed}</p>
                </div>
                <div className="p-2 bg-blue-50 rounded">
                  <p className="text-gray-600">Taxa de Aprovação</p>
                  <p className="font-bold text-blue-600">{Math.round((item.approved / item.students) * 100)}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Attendance Report */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Relatório de Frequência</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <p className="text-gray-700 text-sm">Média de Frequência</p>
            <p className="text-3xl font-bold text-green-600 mt-2">91.5%</p>
            <p className="text-xs text-gray-600 mt-1">Excelente</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <p className="text-gray-700 text-sm">Alunos com Frequência Baixa</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">8</p>
            <p className="text-xs text-gray-600 mt-1">Abaixo de 75%</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
            <p className="text-gray-700 text-sm">Taxa de Evasão</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">1.2%</p>
            <p className="text-xs text-gray-600 mt-1">Muito baixo</p>
          </div>
        </div>
      </Card>

      {/* Monthly Trends */}
      <Card className="p-6">
        <h2 className="text-lg font-bold mb-4">Tendência Mensal</h2>
        <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="text-gray-400 mx-auto mb-2" size={48} />
            <p className="text-gray-600">Gráfico de tendência mensal</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
