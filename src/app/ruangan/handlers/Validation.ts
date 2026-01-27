export const validateKodeRuang = (kode: string): boolean => {
    // Kode ruang: huruf + angka (R101, LAB01, AUD01)
    const kodeRegex = /^[A-Z]+[0-9]+$/;
    return kodeRegex.test(kode);
};
export const validateRequired = (value: string): boolean => {
    return value.trim().length > 0;
};
export const validateTimeRange = (
    jamAwal: string,
    jamAkhir: string,
): boolean => {
    const [jamAwalHour, jamAwalMin] = jamAwal.split(":").map(Number);
    const [jamAkhirHour, jamAkhirMin] = jamAkhir.split(":").map(Number);
    const awal = jamAwalHour * 60 + jamAwalMin;
    const akhir = jamAkhirHour * 60 + jamAkhirMin;
    return akhir > awal;
};
