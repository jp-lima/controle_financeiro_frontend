type Row = Record<string, unknown>;

interface ConfirmDeleteModalProps {
  onCancel: () => void;
  deleteTarget: { row: Row; index: number };
  message?: string;
}

export function ConfirmDeleteModal({
  onCancel,
  deleteTarget,
  message = "Tem certeza que deseja deletar este item?",
}: ConfirmDeleteModalProps) {
  const api_url = import.meta.env.VITE_API_URL;

  async function handleConfirm() {
    const id = deleteTarget.row.id as string;
    const res = await fetch(`${api_url}/api/Usuarios/${id}`, { method: "DELETE" });
    if (res.ok) onCancel();
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box modal-danger" onClick={(e) => e.stopPropagation()}>
        <p className="modal-message">{message}</p>
        <div className="modal-actions">
          <button className="btn-modal btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-modal btn-confirm-delete" onClick={handleConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
