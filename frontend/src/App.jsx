import ProdutosList from './components/ProdutosList';
import BackendStatus from './components/BackendStatus';
import './App.css'

function App() {
  return (
    <div>
      <h1>Inventary Manager</h1>
      <ProdutosList />
      <BackendStatus />
    </div>
  );
}

export default App;
