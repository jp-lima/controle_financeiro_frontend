import { Table } from "../components/Table"
import { UserFormModal } from "../components/UserFormModal";
import { useEffect,useState } from "react";

type Transacao = {
  id: string;
  descricao: string;
  tipo:string; 
  valor: number;
}

type Usuarios = {
 id:string;  
 nome:string
 idade:number; 
 transacoes:Transacao[]; 
 total_despesas:number;
 todal_receita:number;
 saldo:number;
}

export function UsuarioPage()
{
  const api_url = import.meta.env.VITE_API_URL; 
  const [usuarios, setUsuarios] = useState<Usuarios[]>([])
  console.log(api_url)

  useEffect(() => {
    async function carregarDados(){
      try
      {
        const response = await fetch(`https://controle-financeiro-backend-kyde.onrender.com/api/Usuarios`)
        if(!response.ok)
          {
            throw new Error("Falha ao receber dados")
          }
        const usuarios = await response.json(); 
        usuarios
        .map(u => {
          u.total_despesas = 0; 
          u.total_receita = 0; 
          u.saldo = 0; 
          u.transacoes
           .map(t => t.tipo == "Receita" ? u.total_receita += t.valor : u.total_despesas += t.valor )
          u.saldo = u.total_receita - u.total_despesas; 

        })

        setUsuarios(usuarios)

      } catch(err)
      {
        console.error("[UsuarioPage]", err)
      }
    }

    carregarDados(); 

  },[])

  const headers = ["nome", "idade", "total_receita", "total_despesas", "saldo"];

    return (
    <div>
      <Table
          headers={headers}
          data={usuarios}
          showActions={true}
          onDelete={(row, index) => console.log("deletar", row, index)}
          onAdd={() => console.log("abrir modal de adicionar")}
          renderAddForm={({ onSubmit, onCancel }) => (
            <UserFormModal onSubmit={onSubmit} onCancel={onCancel} />
          )}
        />

    </div>
  )

}
