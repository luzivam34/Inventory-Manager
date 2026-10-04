import { Routes, Route, Link } from 'react-router-dom';
import ProdutosList from './components/ProdutosList';
import BackendStatus from './components/BackendStatus';
import ProdutosForm from './components/ProdutosForm';
import "./styles/App.css";



function App() {
  return (
    <div className='app-container'>
      <h1>Inventary Manager</h1>

      {/*Botão para ir ao Formulario */}
      <Link to="/produtos/novo">
        <button className='add-button'>Adicionar Produto</button>
      </Link>
      <Routes>
        <Route path='/' element={<ProdutosList />} />
        <Route path='/produtos/novo' element={<ProdutosForm />} />
      </Routes>
      <BackendStatus />
    </div>
  );
}

export default App;
