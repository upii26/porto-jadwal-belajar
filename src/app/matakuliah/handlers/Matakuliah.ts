import { MatakuliahData } from "@/app/types/Matakuliah";

// Base URL API
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Helper response handler (KONSISTEN dengan Dosen)
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response
            .json()
            .catch(() => ({ message: "Network error" }));
        throw new Error(error.message || "Something went wrong");
    }
    return response.json();
};

/* =========================
    CRUD MATA KULIAH
========================= */

// GET - Ambil semua mata kuliah
export const getAllMatakuliah = async (): Promise<MatakuliahData[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/matakuliah`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error fetching matakuliah:", error);
        throw error;
    }
};

// GET - Ambil mata kuliah by ID
export const getMatakuliahById = async (
    id: number,
): Promise<MatakuliahData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/matakuliah/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error fetching matakuliah by ID:", error);
        throw error;
    }
};

// POST - Tambah mata kuliah
export const createMatakuliah = async (
    data: MatakuliahData,
): Promise<MatakuliahData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/matakuliah`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error creating matakuliah:", error);
        throw error;
    }
};

// PUT - Update mata kuliah
export const updateMatakuliah = async (
    id: number,
    data: MatakuliahData,
): Promise<MatakuliahData> => {
    try {
        const response = await fetch(`${API_BASE_URL}/matakuliah/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error updating matakuliah:", error);
        throw error;
    }
};

// DELETE - Hapus mata kuliah
export const deleteMatakuliah = async (id: number): Promise<void> => {
    try {
        const response = await fetch(`${API_BASE_URL}/matakuliah/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        return handleResponse(response);
    } catch (error) {
        console.error("Error deleting matakuliah:", error);
        throw error;
    }
};
