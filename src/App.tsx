import { Table } from './components/Table'
import './App.css'
import { UserFormModal } from './components/UserFormModal';
import { useState } from 'react';
import { UsuarioPage } from './pages/UsuarioPage';
import { TransacaoPage } from './pages/TransacaoPage';

function App() {

const headers = ["Nome", "Preço", "Estoque"];
const data = [
  { Nome: "Perfume A", Preço: 120, Estoque: 10 },
  { Nome: "Perfume B", Preço: 89, Estoque: 5 },
];

  const [tradeTable, setTradeTable ] = useState(false);

  return (
    <>
      <h1> 
        Controle Financeiro 
      </h1>
      <section className='section-buttons' >
        <button onClick={() => {setTradeTable(false)}}> 
          tabela usuarios
        </button>
        <button onClick={() => setTradeTable(true)}> 
          tabela transacoes  
        </button>
      </section>

      { tradeTable ?
        <TransacaoPage/> 
      :
        <UsuarioPage/>
      }

    </>
  )
}

export default App
