import { Table } from "../components/Table"
import { useState, useEffect } from "react";

type Transacao = {
  id: string;
  descricao: string;
  tipo:string; 
  valor: number;
}

export function TransacaoPage()
{

  const api_url = import.meta.env.VITE_API_URL; 
  const [transacoes , setTransacoes] = useState<Transacao[]>([])

  const headers = ["tipo", "valor", "descricao"];
  useEffect(() => {
    async function carregarDados(){
      try
      {
        const response = await fetch(`${api_url}/api/Transacao`)
        if(!response.ok)
          {
            throw new Error("Falha ao receber dados")
          }
        setTransacoes(await response.json());

      } catch(err)
      {
        console.error("[UsuarioPage]", err)
      }
    }
    carregarDados(); 
  },[])



  return (
     <Table
        headers={headers}
        data={transacoes}
      />

  )

}
