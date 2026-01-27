'use client'

interface DeleteConfirmProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading?: boolean
}

export default function DeleteConfirm({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: DeleteConfirmProps) {
  if (!isOpen) return null

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
          max-w-md
          w-full
          mx-4
          p-6
          animate-popup
        "
      >
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Konfirmasi Hapus
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Apakah Anda yakin ingin menghapus data ruang ini?
            <br />
            <span className="text-red-600 font-medium">
              Tindakan ini tidak dapat dibatalkan.
            </span>
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                flex-1
                px-4
                py-2.5
                rounded-lg
                border border-gray-300
                text-gray-700
                hover:bg-gray-100
                transition
                font-medium
                disabled:opacity-50
              "
            >
              Batal
            </button>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="
                flex-1
                px-4
                py-2.5
                rounded-lg
                bg-red-600
                text-white
                hover:bg-red-700
                transition
                font-medium
                disabled:opacity-50
                flex items-center justify-center gap-2
              "
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Menghapus...
                </>
              ) : (
                'Hapus'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
