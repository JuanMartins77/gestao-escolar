'use client'

export default function StatChart() {
  const data = [
    { series: '6º Ano', enrollment: 85 },
    { series: '7º Ano', enrollment: 92 },
    { series: '8º Ano', enrollment: 88 },
    { series: '9º Ano', enrollment: 97 },
  ]

  const maxEnrollment = Math.max(...data.map(d => d.enrollment))

  return (
    <div className="w-full">
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-700">{item.series}</span>
              <span className="text-sm font-bold text-teal-600">{item.enrollment} alunos</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-400 to-cyan-500 h-full rounded-full transition-all"
                style={{ width: `${(item.enrollment / maxEnrollment) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-4">
        {data.map((item, idx) => (
          <div key={idx} className="text-center">
            <div className="text-2xl font-bold text-teal-600">{item.enrollment}</div>
            <div className="text-xs text-gray-600">Alunos</div>
          </div>
        ))}
      </div>
    </div>
  )
}
