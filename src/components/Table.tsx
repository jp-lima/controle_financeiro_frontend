// components/Table.tsx
import { useState, ReactNodeuse } from "react";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";
import { TransacaoFormModal } from "./TransacoesFormModal";
import "../assets/CSS/Table.css"

type Row = Record<string, string | number>;

interface TableProps {
  headers: string[];
  data: Row[];
  showActions?: boolean;
  onDelete?: (row: Row, index: number) => void;
  onAdd?: (newRow: Row) => void;
  renderAddForm?: (props: {
    onSubmit: (data: Row) => void;
    onCancel: () => void;
  }) => ReactNode;
}

export function Table({
  headers,
  data,
  showActions = false,
  onDelete,
  onAdd,
  renderAddForm,
}: TableProps) {
  const [search, setSearch] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ row: Row; index: number } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showTransictionModal, setShowTransictionModal] = useState(false);
  const [userTarget, setUserTarget] = useState({}); 

  const filteredData = data.filter((row) =>
    headers.some((header) =>
      String(row[header] ?? "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );

  function handleAddSubmit(data: Row) {
    onAdd?.(data);
    setShowAddForm(false);
  }

  return (
    <div>
      <div className="table-toolbar" >
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
                <td key={header}>{row[header]}</td>
              ))}
              {showActions&& (
                <td className="actions-cell" >
                  <button className="btn-icon btn-delete" onClick={() => setDeleteTarget({ row, index })}>
                    Deletar
                  </button>
                  <button className="btn-icon btn-transacao" onClick={() => {setShowTransictionModal(true); setUserTarget({row}) } }>
                    Add Transacao 
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

      {showTransictionModal && (
        <TransacaoFormModal onCancel={() => setShowTransictionModal(false)} userTarget={userTarget}/>
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
