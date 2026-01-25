interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  isDark?: boolean
}

export default function StatCard({ title, value, change, icon, isDark = false }: StatCardProps) {
  const isPositive = change.startsWith('+')
  
  return (
    <div className={`rounded-2xl p-6 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md`}>
      <div className="flex items-start justify-between mb-4">
        <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className={`text-3xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
          {value}
        </p>
        <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      </div>
    </div>
  )
}