/* =========================
    BASIC VALIDATIONS
========================= */

export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0
}

/* =========================
    KODE MATA KULIAH
    Contoh: IF101, SI202, TK301
========================= */

export const validateKodeMatkul = (kode: string): boolean => {
    const regex = /^[A-Z]{2,3}[0-9]{3}$/
    return regex.test(kode)
}

/* =========================
    JAM
========================= */

export const validateJamFormat = (jam: string): boolean => {
    // format HH:mm
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/
    return regex.test(jam)
}

export const validateJamRange = (
    jamMulai: string,
    jamAkhir: string
): boolean => {
    if (!jamMulai || !jamAkhir) return false

    const [mH, mM] = jamMulai.split(':').map(Number)
    const [aH, aM] = jamAkhir.split(':').map(Number)

    const mulai = mH * 60 + mM
    const akhir = aH * 60 + aM

    return akhir > mulai
}

/* =========================
    DROPDOWN VALIDATION
========================= */

export const validateSelectId = (id: number | string): boolean => {
    return id !== '' && Number(id) > 0
}
