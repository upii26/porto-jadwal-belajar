// DashboardPage.tsx
'use client'

import { useState } from 'react'
import Sidebar from "../header/components/Sidebar";
import Header from "../header/components/Header";
import StatCard from "./components/StatCard";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import ListMahasiswa from "./components/ListSiswa";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div 
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-32'
        }`}
      >
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Mata Pelajaran"
              value="50"
              change="+2 031"
              isDark={true}
              icon={
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 6c-2.21 0-4 1.79-4 4v10c0-.55.45-1 1-1h6c.55 0 1 .45 1 1V10c0-2.21-1.79-4-4-4z" />
                  <path d="M4 4h6v2H4v14h6v2H4a2 2 0 01-2-2V6a2 2 0 012-2zM20 4h-6v2h6v14h-6v2h6a2 2 0 002-2V6a2 2 0 00-2-2z" />
                </svg>
              }
            />

            <StatCard
              title="Total Mahasiswa"
              value="800"
              change="-$2,201"
              icon={
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12a5 5 0 100-10 5 5 0 000 10z" />
                  <path d="M4 20a8 8 0 0116 0v1H4v-1z" />
                </svg>
              }
            />

            <StatCard
              title="Total Mahasiswi"
              value="703"
              change="+3 392"
              icon={
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              }
            />

            <StatCard
              title="Total Siswa"
              value="1000"
              change="-1.22%"
              icon={
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                  <path d="M5 13v4c0 1.66 3.13 3 7 3s7-1.34 7-3v-4l-7 4-7-4z" />
                </svg>
              }
            />
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2">
              <LineChart />
            </div>
            <div>
              <PieChart />
            </div>
          </div>

          {/* Recent Customers */}
          <ListMahasiswa />
        </div>
      </div>
    </div>
  );
}