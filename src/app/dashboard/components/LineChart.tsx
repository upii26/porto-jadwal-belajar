'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const salesData = [
  { month: 'Jan', LakiLaki: 240, Perempuan: 180 },
  { month: 'Feb', LakiLaki: 300, Perempuan: 250 },
  { month: 'Mar', LakiLaki: 280, Perempuan: 220 },
  { month: 'Apr', LakiLaki: 320, Perempuan: 280 },
  { month: 'May', LakiLaki: 290, Perempuan: 240 },
  { month: 'Jun', LakiLaki: 350, Perempuan: 300 },
]

export default function MahasiswaLineChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Mahasiswa Performance</h2>
        <button className="p-2 hover:bg-gray-100 rounded-lg transition">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="LakiLaki" 
            stroke="#1f2937" 
            strokeWidth={2} 
            dot={{ r: 4 }}
            name="Laki-Laki"
          />
          <Line 
            type="monotone" 
            dataKey="Perempuan" 
            stroke="#ec4899" 
            strokeWidth={2} 
            dot={{ r: 4 }}
            name="Perempuan"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}