import { ProdiData } from "@/app/types/Prodi"

// Base URL API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'

// Helper response handler (SAMA PERSIS)
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: 'Network error' }))
        throw new Error(error.message || 'Something went wrong')
    }
    return response.json()
}

/* =========================
    CRUD PRODI
========================= */

// GET - Ambil semua prodi
export const getAllProdi = async (): Promise<ProdiData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/prodi`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return handleResponse(response)
    } catch (error) {
        console.error('Error fetching prodi:', error)
        throw error
    }
}

// GET - Ambil prodi by ID
export const getProdiById = async (id: number): Promise<ProdiData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/prodi/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return handleResponse(response)
    } catch (error) {
        console.error('Error fetching prodi by ID:', error)
        throw error
    }
}

// POST - Tambah prodi
export const createProdi = async (
    data: ProdiData
): Promise<ProdiData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/prodi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return handleResponse(response)
    } catch (error) {
        console.error('Error creating prodi:', error)
        throw error
    }
}

// PUT - Update prodi
export const updateProdi = async (
    id: number,
    data: ProdiData
): Promise<ProdiData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/prodi/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        return handleResponse(response)
    } catch (error) {
        console.error('Error updating prodi:', error)
        throw error
    }
}

// DELETE - Hapus prodi
export const deleteProdi = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/prodi/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return handleResponse(response)
    } catch (error) {
        console.error('Error deleting prodi:', error)
        throw error
    }
}
