'use server'

import { cookies } from 'next/headers'

export async function handleLogin(email: string, password: string) {
  try {
    if (!email || !password) {
      return { 
        success: false, 
        error: 'Email dan password harus diisi' 
      }
    }

    // Panggil API
    const response = await fetch('https://your-api.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || 'Login gagal' 
      }
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return { 
      success: true, 
      user: data.user 
    }
    
  } catch (error) {
    console.error('Login error:', error)
    return { 
      success: false, 
      error: 'Terjadi kesalahan server' 
    }
  }
}