import './App.css'
import { useState } from 'react';
import { UsuarioPage } from './pages/UsuarioPage';
import { TransacaoPage } from './pages/TransacaoPage';

function App() {
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
