import { useState } from "react";
import "../assets/CSS/Modal.css"

type TipoTransacao = "Receita" | "Despesa";
type Row = Record<string, unknown>;

interface TransacaoFormModalProps {
  onCancel: () => void;
  userTarget: { row: Row };
}

export function TransacaoFormModal({ onCancel, userTarget }: TransacaoFormModalProps) {
  const [tipo, setTipo] = useState<TipoTransacao>("Receita");
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");

  async function handleSubmit() {
    if (!descricao || !valor) return;
    const api_url = import.meta.env.VITE_API_URL;
    try {
      const res = await fetch(`${api_url}/api/Transacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: userTarget.row.id,
          tipo,
          descricao,
          valor: Number(valor),
        }),
      });
      if (res.ok) onCancel();
    } catch (err) {
      console.error("[TransacaoFormModal]", err);
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Adicionar transação</h3>

        <div className="form-field">
          <label>Tipo</label>
          <select
            className={`select-tipo ${tipo === "Receita" ? "tipo-receita" : "tipo-despesa"}`}
            value={tipo}
            onChange={(e) => setTipo(e.target.value as TipoTransacao)}
          >
            <option value="Receita">Receita</option>
            <option value="Despesa">Despesa</option>
          </select>
        </div>

        <div className="form-field">
          <label>Descrição</label>
          <input type="text" className="form-input" value={descricao} onChange={(e) => setDescricao(e.target.value)} />
        </div>

        <div className="form-field">
          <label>Valor</label>
          <div className="valor-wrapper">
            <span className="valor-prefix">R$</span>
            <input type="number" step="0.01" className="form-input valor-input" value={valor} onChange={(e) => setValor(e.target.value)} />
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn-modal btn-cancel" onClick={onCancel}>Cancelar</button>
          <button className="btn-modal btn-confirm-save" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  );
}
