export default function Header() {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      {/* Company Name */}
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold text-gray-800">Jadwal Management</h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
       
        {/* User Profile */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-800">Renee McKelvey</p>
            <p className="text-xs text-gray-500">Admin Guru</p>
          </div>
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}