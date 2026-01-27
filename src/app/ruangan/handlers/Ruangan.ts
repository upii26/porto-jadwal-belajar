import { RuangData } from "@/app/types/Ruangan";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Network error' }))
    throw new Error(error.message || 'Something went wrong')
  }
  return response.json()
}

export const getAllRuang = async (): Promise<RuangData[]> => {
  const response = await fetch(`${API_BASE_URL}/ruang`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return handleResponse(response)
}

export const getRuangById = async (id: number): Promise<RuangData> => {
  const response = await fetch(`${API_BASE_URL}/ruang/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return handleResponse(response)
}

export const createRuang = async (data: RuangData): Promise<RuangData> => {
  const response = await fetch(`${API_BASE_URL}/ruang`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export const updateRuang = async (id: number, data: RuangData): Promise<RuangData> => {
  const response = await fetch(`${API_BASE_URL}/ruang/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export const deleteRuang = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/ruang/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return handleResponse(response)
}

export const searchRuang = async (keyword: string): Promise<RuangData[]> => {
  const response = await fetch(`${API_BASE_URL}/ruang/search?q=${keyword}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return handleResponse(response)
}