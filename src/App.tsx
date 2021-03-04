import { h } from 'preact';
import Home from './components/Home';
import SearchById from './components/SearchById';

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id') || '0');

  return id ? <SearchById id={id} /> : <Home />;
}

export default App;
