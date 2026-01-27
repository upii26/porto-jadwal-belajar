"use client";

import { useState, useEffect } from "react";
import { RuangData } from "@/app/types/Ruangan";
import { validateKodeRuang } from "../handlers/Validation";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RuangData) => void;
  editData?: RuangData | null;
  loading?: boolean;
}

export default function FormModal({
  isOpen,
  onClose,
  onSubmit,
  editData,
  loading,
}: FormModalProps) {
  const [formData, setFormData] = useState<RuangData>({
    kodeRuang: "",
    hari: "",
    jamAwal: "",
    jamAkhir: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const hariOptions = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        kodeRuang: "",
        hari: "",
        jamAwal: "",
        jamAkhir: "",
      });
    }
  }, [editData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.kodeRuang) {
      newErrors.kodeRuang = "Kode Ruang harus diisi";
    } else if (!validateKodeRuang(formData.kodeRuang)) {
      newErrors.kodeRuang =
        "Format Kode Ruang tidak valid (contoh: R101, LAB01)";
    }

    if (!formData.hari) newErrors.hari = "Hari harus dipilih";
    if (!formData.jamAwal) newErrors.jamAwal = "Jam awal harus diisi";
    if (!formData.jamAkhir) newErrors.jamAkhir = "Jam akhir harus diisi";

    if (formData.jamAwal && formData.jamAkhir) {
      const [aH, aM] = formData.jamAwal.split(":").map(Number);
      const [bH, bM] = formData.jamAkhir.split(":").map(Number);

      if (bH * 60 + bM <= aH * 60 + aM) {
        newErrors.jamAkhir = "Jam akhir harus setelah jam awal";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="
          relative
          bg-white
          rounded-2xl
          shadow-2xl
          max-w-2xl
          w-full
          mx-4
          max-h-[90vh]
          overflow-y-auto
          animate-popup
        "
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              {editData ? "Edit Ruang" : "Tambah Ruang Baru"}
            </h2>
            <button
              onClick={onClose}
              disabled={loading}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              ✕
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            {/* Kode Ruang */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Kode Ruang <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="kodeRuang"
                value={formData.kodeRuang}
                onChange={handleChange}
                disabled={loading}
                placeholder="Contoh: R101, LAB01"
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.kodeRuang ? "border-red-500" : "border-gray-300"}
                `}
              />
              {errors.kodeRuang && (
                <p className="mt-1 text-sm text-red-500">{errors.kodeRuang}</p>
              )}
            </div>

            {/* Hari */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hari <span className="text-red-500">*</span>
              </label>
              <select
                name="hari"
                value={formData.hari}
                onChange={handleChange}
                disabled={loading}
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  text-gray-800
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.hari ? "border-red-500" : "border-gray-300"}
                `}
              >
                <option value="">Pilih Hari</option>
                {hariOptions.map((hari) => (
                  <option key={hari} value={hari}>
                    {hari}
                  </option>
                ))}
              </select>
              {errors.hari && (
                <p className="mt-1 text-sm text-red-500">{errors.hari}</p>
              )}
            </div>

            {/* Jam */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jam Awal <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="jamAwal"
                  value={formData.jamAwal}
                  onChange={handleChange}
                  disabled={loading}
                  className={`
                  w-full px-4 py-2.5 rounded-lg border
                  bg-gray-50
                  text-gray-800
                  appearance-none
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  transition
                  ${errors.jamAwal ? "border-red-500" : "border-gray-300"}
                `}
                />
                {errors.jamAwal && (
                  <p className="mt-1 text-sm text-red-500">{errors.jamAwal}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jam Akhir <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  name="jamAkhir"
                  value={formData.jamAkhir}
                  onChange={handleChange}
                  disabled={loading}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border
                    focus:outline-none focus:ring-2 focus:ring-blue-500  text-gray-800
                    ${errors.jamAkhir ? "border-red-500" : "border-gray-300"}
                  `}
                />
                {errors.jamAkhir && (
                  <p className="mt-1 text-sm text-red-500">{errors.jamAkhir}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6">
              <button
                onClick={onClose}
                disabled={loading}
                className="
                  flex-1 px-4 py-3 rounded-lg
                  border border-gray-300 text-gray-700
                  hover:bg-gray-100 transition
                  disabled:opacity-50
                "
              >
                Batal
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                  flex-1 px-4 py-3 rounded-lg
                  bg-blue-600 text-white
                  hover:bg-blue-700 transition
                  font-medium
                  disabled:opacity-50
                  flex items-center justify-center gap-2
                "
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Menyimpan...
                  </>
                ) : editData ? (
                  "Update"
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
