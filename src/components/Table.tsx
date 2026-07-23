import { useState, type ReactNode } from "react";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { TransacaoFormModal } from "./TransacoesFormModal";

type Row = Record<string, unknown>;

interface TableProps<T extends Row> {
  headers: string[];
  data: T[];
  showActions?: boolean;
  onAdd?: (newRow: T) => void;
  renderAddForm?: (props: {
    onSubmit: (data: T) => void;
    onCancel: () => void;
  }) => ReactNode;
}

export function Table<T extends Row>({
  headers,
  data,
  showActions = false,
  onAdd,
  renderAddForm,
}: TableProps<T>) {
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ row: T; index: number } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTransictionModal, setShowTransictionModal] = useState(false);
  const [userTarget, setUserTarget] = useState<{ row: T } | null>(null);

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      String(row[header] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  function handleAddSubmit(formData: T) {
    onAdd?.(formData);
    setShowAddForm(false);
  }

  return (
    <div>
      <div className="table-toolbar">
        <input
          type="text"
          className="table-search"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {onAdd && renderAddForm && (
          <button className="btn-add" onClick={() => setShowAddForm(true)}>Adicionar</button>
        )}
      </div>

      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
            {showActions && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, index) => (
            <tr key={index}>
              {headers.map((header) => (
                <td key={header}>{String(row[header] ?? "")}</td>
              ))}
              {showActions && (
                <td className="actions-cell">
                  <button className="btn-icon btn-delete" onClick={() => setDeleteTarget({ row, index })}>
                    Deletar
                  </button>
                  <button
                    className="btn-icon btn-transacao"
                    onClick={() => { setShowTransictionModal(true); setUserTarget({ row }); }}
                  >
                    Add Transação
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {deleteTarget && (
        <ConfirmDeleteModal
          onCancel={() => setDeleteTarget(null)}
          deleteTarget={deleteTarget}
        />
      )}

      {showTransictionModal && userTarget && (
        <TransacaoFormModal
          onCancel={() => setShowTransictionModal(false)}
          userTarget={userTarget}
        />
      )}

      {showAddForm &&
        renderAddForm &&
        renderAddForm({
          onSubmit: handleAddSubmit,
          onCancel: () => setShowAddForm(false),
        })}
    </div>
  );
}
