import { JadwalData } from '@/app/types/Jadwal'

/**
 * Convert HH:mm → menit
 */
const toMinutes = (time: string) => {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

/**
 * Cek bentrok waktu
 */
const isTimeOverlap = (
  startA: string,
  endA: string,
  startB: string,
  endB: string
) => {
  const aStart = toMinutes(startA)
  const aEnd = toMinutes(endA)
  const bStart = toMinutes(startB)
  const bEnd = toMinutes(endB)

  return aStart < bEnd && bStart < aEnd
}

/**
 * VALIDASI BENTROK DOSEN
 */
export const validateDosenConflict = (
  newData: JadwalData,
  existing: JadwalData[]
): boolean => {
  return existing.some(j =>
    j.id !== newData.id &&
    j.hari === newData.hari &&
    j.dosenId === newData.dosenId &&
    isTimeOverlap(j.jamMulai, j.jamAkhir, newData.jamMulai, newData.jamAkhir)
  )
}

/**
 * VALIDASI BENTROK RUANG
 */
export const validateRuangConflict = (
  newData: JadwalData,
  existing: JadwalData[]
): boolean => {
  return existing.some(j =>
    j.id !== newData.id &&
    j.hari === newData.hari &&
    j.ruangId === newData.ruangId &&
    isTimeOverlap(j.jamMulai, j.jamAkhir, newData.jamMulai, newData.jamAkhir)
  )
}
