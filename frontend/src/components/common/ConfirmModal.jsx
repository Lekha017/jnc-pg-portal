function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        <h2 className="text-2xl font-bold text-[#2D2A70]">
          {title}
        </h2>

        <p className="text-gray-600 mt-4 leading-7">
          {message}
        </p>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onCancel}
            className="px-5 py-2 border rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmModal;