'use client'

export default function PerformanceChart() {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  const grades = [7.2, 7.4, 7.6, 7.5, 7.8, 7.8]
  const maxGrade = 10

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-48">
        {grades.map((grade, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-200 rounded-t-lg overflow-hidden flex items-end justify-center">
              <div
                className="w-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all"
                style={{ height: `${(grade / maxGrade) * 100}%`, minHeight: '4px' }}
              ></div>
            </div>
            <span className="text-xs font-semibold text-blue-600">{grade}</span>
            <span className="text-xs text-gray-600">{months[idx]}</span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-bold text-blue-600">Tendência:</span> As notas têm apresentado uma melhora consistente,
          com incremento de 0.6 pontos nos últimos 6 meses.
        </p>
      </div>
    </div>
  )
}
