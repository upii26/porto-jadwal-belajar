import { JadwalData } from '@/app/types/Jadwal'

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: 'Network error',
    }))
    throw new Error(error.message || 'Something went wrong')
  }
  return response.json()
}

// GET ALL
export const getAllJadwal = async (): Promise<JadwalData[]> => {
  const res = await fetch(`${API_BASE_URL}/jadwal`)
  return handleResponse(res)
}

// GET BY ID
export const getJadwalById = async (id: number): Promise<JadwalData> => {
  const res = await fetch(`${API_BASE_URL}/jadwal/${id}`)
  return handleResponse(res)
}

// CREATE
export const createJadwal = async (
  data: JadwalData
): Promise<JadwalData> => {
  const res = await fetch(`${API_BASE_URL}/jadwal`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

// UPDATE
export const updateJadwal = async (
  id: number,
  data: JadwalData
): Promise<JadwalData> => {
  const res = await fetch(`${API_BASE_URL}/jadwal/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(res)
}

// DELETE
export const deleteJadwal = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/jadwal/${id}`, {
    method: 'DELETE',
  })
  return handleResponse(res)
}
