import { useState } from "react";
import "../assets/CSS/Modal.css"

interface UserFormModalProps {
  onCancel: () => void;
}

export function UserFormModal({ onCancel }: UserFormModalProps) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [isLoading, setIsLoading] = useState(false); 

  async function handleSubmit() {
    if (!nome || !idade) return;
    setIsLoading(true)
    const api_url = import.meta.env.VITE_API_URL; 
    try
    {
      await fetch(`${api_url}/api/Usuarios`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        }, 
        body:JSON.stringify({nome, idade})
      }).then(res => res.ok && onCancel() )

    } catch(err)
    {
      console.error("[UserFormModal]", err)
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Adicionar usuário</h3>

        <div className="form-field" >
          <label>Nome</label>
          <input
            type="text"
            className="form-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="form-field" >
          <label>Idade</label>
          <input
            type="number"
            className="form-input"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>

        <div className="modal-actions">
        {!isLoading &&
          <button className="btn-modal btn-cancel" onClick={onCancel}>Cancelar</button>
        }
         <button 
           className="btn-modal btn-confirm-save" 
           disabled={isLoading} 
           onClick={handleSubmit}>
           {isLoading ? "Carregando..." : "Salvar"} 
           </button>
        </div>
      </div>
    </div>
  );
}

