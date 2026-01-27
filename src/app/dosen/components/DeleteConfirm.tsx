'use client'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export default function DeleteConfirm({ isOpen, onClose, onConfirm, loading }: Props) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-popup text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Konfirmasi Hapus
        </h3>

        <p className="text-gray-800 mb-6">
          Data ini akan dihapus dan tidak bisa dikembalikan.
        </p>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border rounded-lg py-2">
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 bg-red-600 text-white rounded-lg py-2"
          >
            {loading ? 'Menghapus...' : 'Hapus'}
          </button>
        </div>
      </div>
    </div>
  )
}
