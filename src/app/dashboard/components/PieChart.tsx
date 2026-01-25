'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts'

const categoriesData = [
  { name: 'Laki - Laki', value: 40 },
  { name: 'Perempuan', value: 30 },
]

const COLORS = ['#1f2937', '#6b7280', '#d1d5db']

export default function PopularPieChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">Popular Gender</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={categoriesData}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            paddingAngle={5}
            dataKey="value"
          >
            {categoriesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}