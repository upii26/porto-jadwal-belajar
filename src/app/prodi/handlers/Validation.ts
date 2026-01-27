/* =========================
    BASIC VALIDATIONS
========================= */

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0
}

/* =========================
    FAKULTAS
========================= */

export const validateFakultas = (fakultas: string): boolean => {
    // minimal 3 karakter, tidak boleh cuma spasi
    return fakultas.trim().length >= 3
}

/* =========================
    PRODI
========================= */

export const validateProdi = (prodi: string): boolean => {
    // minimal 3 karakter
    return prodi.trim().length >= 3
}

/* =========================
    OPTIONAL: DUPLICATE CHECK
    (dipakai di frontend)
========================= */

export const isDuplicateProdi = (
    prodi: string,
    data: { prodi: string }[]
): boolean => {
    return data.some(
        item => item.prodi.toLowerCase() === prodi.toLowerCase()
    )
}
