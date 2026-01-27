import { MahasiswaData } from "@/app/types/Mahasiswa"

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// 🧪 DUMMY DATA (fallback)
const dummyMahasiswa: MahasiswaData[] = [
  {
    id: 1,
    nim: "220001",
    nama: "Budi Santoso",
    prodi: "Informatika",
    gender: "Laki-laki",
    email: "budi@mail.com",
    status: "Aktif",
  },
  {
    id: 2,
    nim: "220002",
    nama: "Siti Aminah",
    prodi: "Sistem Informasi",
    gender: "Perempuan",
    email: "siti@mail.com",
    status: "Aktif",
  },
]

// Helper
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    throw new Error("API error")
  }
  return response.json()
}

// ============================
// GET ALL
// ============================
export const getAllMahasiswa = async (): Promise<MahasiswaData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/mahasiswa`)
    return await handleResponse<MahasiswaData[]>(response)
  } catch (error) {
    console.warn("API gagal, pakai dummy data")
    return dummyMahasiswa
  }
}

// ============================
// GET BY ID
// ============================
export const getMahasiswaById = async (
  id: number
): Promise<MahasiswaData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/mahasiswa/${id}`)
    return await handleResponse<MahasiswaData>(response)
  } catch {
    return dummyMahasiswa.find((m) => m.id === id) || null
  }
}

// ============================
// CREATE
// ============================
export const createMahasiswa = async (
  data: MahasiswaData
): Promise<MahasiswaData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/mahasiswa`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return await handleResponse<MahasiswaData>(response)
  } catch {
    const newData = { ...data, id: Date.now() }
    dummyMahasiswa.push(newData)
    return newData
  }
}

// ============================
// UPDATE
// ============================
export const updateMahasiswa = async (
  id: number,
  data: MahasiswaData
): Promise<MahasiswaData> => {
  try {
    const response = await fetch(`${API_BASE_URL}/mahasiswa/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return await handleResponse<MahasiswaData>(response)
  } catch {
    const index = dummyMahasiswa.findIndex((m) => m.id === id)
    if (index !== -1) dummyMahasiswa[index] = { ...data, id }
    return { ...data, id }
  }
}

// ============================
// DELETE
// ============================
export const deleteMahasiswa = async (id: number): Promise<void> => {
  try {
    await fetch(`${API_BASE_URL}/mahasiswa/${id}`, { method: "DELETE" })
  } catch {
    const index = dummyMahasiswa.findIndex((m) => m.id === id)
    if (index !== -1) dummyMahasiswa.splice(index, 1)
  }
}

// ============================
// SEARCH
// ============================
export const searchMahasiswa = async (
  keyword: string
): Promise<MahasiswaData[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/mahasiswa/search?q=${keyword}`
    )
    return await handleResponse<MahasiswaData[]>(response)
  } catch {
    return dummyMahasiswa.filter(
      (m) =>
        m.nama.toLowerCase().includes(keyword.toLowerCase()) ||
        m.nim.includes(keyword)
    )
  }
}
