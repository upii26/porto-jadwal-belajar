'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { handleLogin } from '../handlers/auth'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    const result = await handleLogin(email, password)
    
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Login gagal')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Floating Icons - Animated */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left - Lock */}
        <div className="absolute top-[15%] left-[12%] text-blue-500 text-4xl animate-float-slow">
          🔒
        </div>
        
        {/* Left - Profile Icon in Circle */}
        <div className="absolute top-[40%] left-[8%] w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center animate-float-medium">
          <svg className="w-10 h-10 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* Bottom Left - Image */}
        <div className="absolute bottom-[15%] left-[10%] text-purple-500 text-3xl animate-float-slow">
          🖼️
        </div>
        
        {/* Top Right - Palette */}
        <div className="absolute top-[20%] right-[15%] text-orange-500 text-4xl animate-float-medium">
          🎨
        </div>
        
        {/* Right - Pencil */}
        <div className="absolute top-[45%] right-[10%] text-gray-500 text-3xl animate-float-slow rotate-45">
          ✏️
        </div>
      </div>

      {/* Main Card Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          
          {/* Left Side - Illustration Area */}
          <div className="md:w-1/2 bg-gradient-to-br from-gray-50 to-white p-12 flex items-center justify-center relative">
            <div className="relative">
              {/* Center Circle with Profile */}
              <div className="w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center animate-pulse-slow">
                <svg className="w-20 h-20 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              
              {/* Orbiting Icons */}
              <div className="absolute -top-8 -left-8 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-orbit-1">
                <span className="text-2xl">🔒</span>
              </div>
              
              <div className="absolute -top-4 -right-10 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center animate-orbit-2">
                <span className="text-xl">✉️</span>
              </div>
              
              <div className="absolute -bottom-6 left-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center animate-orbit-3">
                <span className="text-xl">🎨</span>
              </div>
              
              <div className="absolute -bottom-4 -right-8 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-orbit-4">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="md:w-1/2 p-12 flex flex-col justify-center">
            
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Login · Penjadwalan</h1>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-4">
              
              {/* Email Input */}
              <div>
                <input
                  type="email"
                  placeholder="Enter email account"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gray-800 text-white py-3.5 rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700 transition">
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animations to global CSS */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        
        @keyframes orbit-2 {
          0% { transform: rotate(90deg) translateX(80px) rotate(-90deg); }
          100% { transform: rotate(450deg) translateX(80px) rotate(-450deg); }
        }
        
        @keyframes orbit-3 {
          0% { transform: rotate(180deg) translateX(80px) rotate(-180deg); }
          100% { transform: rotate(540deg) translateX(80px) rotate(-540deg); }
        }
        
        @keyframes orbit-4 {
          0% { transform: rotate(270deg) translateX(80px) rotate(-270deg); }
          100% { transform: rotate(630deg) translateX(80px) rotate(-630deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-orbit-1 {
          animation: orbit-1 20s linear infinite;
        }
        
        .animate-orbit-2 {
          animation: orbit-2 25s linear infinite;
        }
        
        .animate-orbit-3 {
          animation: orbit-3 22s linear infinite;
        }
        
        .animate-orbit-4 {
          animation: orbit-4 18s linear infinite;
        }
      `}</style>
    </div>
  )
}