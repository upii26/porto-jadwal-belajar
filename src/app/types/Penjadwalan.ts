// app/types/Jadwal.ts
export interface JadwalData {
  id: number
  hari: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'
  jamMulai: number // contoh: 8 (jam 08.00)
  jamAkhir: number // contoh: 10
  matkul: string
  dosen: string
  ruang: string
  prodi: string
}
