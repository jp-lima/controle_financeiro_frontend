import { Table } from "../components/Table"
import { UserFormModal } from "../components/UserFormModal";
import { useEffect, useState } from "react";

type Transacao = {
  id: string;
  descricao: string;
  tipo: string;
  valor: number;
}

type Usuario = {
  id: string;
  nome: string;
  idade: number;
  transacoes: Transacao[];
  total_despesas: number;
  total_receita: number;
  saldo: number;
}

export function UsuarioPage() {
  const api_url = import.meta.env.VITE_API_URL;
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const response = await fetch(`${api_url}/api/Usuarios`);
        if (!response.ok) {
          throw new Error("Falha ao receber dados");
        }
        const dados: Usuario[] = await response.json();

        // calcula os totais de cada usuário a partir das transações vinculadas
        dados.forEach((u) => {
          u.total_receita = 0;
          u.total_despesas = 0;
          u.transacoes.forEach((t) => {
            if (t.tipo === "Receita") {
              u.total_receita += t.valor;
            } else {
              u.total_despesas += t.valor;
            }
          });
          u.saldo = u.total_receita - u.total_despesas;
        });

        setUsuarios(dados);
      } catch (err) {
        console.error("[UsuarioPage]", err);
      }
    }
    carregarDados();
  }, []);

  // total geral, somando o total de cada pessoa já calculado acima
  const totalGeral = usuarios.reduce(
    (acc, u) => ({
      receita: acc.receita + u.total_receita,
      despesas: acc.despesas + u.total_despesas,
      saldo: acc.saldo + u.saldo,
    }),
    { receita: 0, despesas: 0, saldo: 0 }
  );

  const headers = ["nome", "idade", "total_receita", "total_despesas", "saldo"];

  return (
    <div>
      <Table
        headers={headers}
        data={usuarios}
        showActions={true}
        onAdd={() => console.log("abrir modal de adicionar")}
        renderAddForm={({ onCancel }) => (
          <UserFormModal onCancel={onCancel} />
        )}
      />

      <div className="totais-gerais">
        <h3>Total geral</h3>
        <div className="totais-linha">
          <span>Receitas: <strong className="valor-positivo">R$ {totalGeral.receita.toFixed(2)}</strong></span>
          <span>Despesas: <strong className="valor-negativo">R$ {totalGeral.despesas.toFixed(2)}</strong></span>
          <span>Saldo: <strong className={totalGeral.saldo >= 0 ? "valor-positivo" : "valor-negativo"}>
            R$ {totalGeral.saldo.toFixed(2)}
          </strong></span>
        </div>
      </div>
    </div>
  );
}
