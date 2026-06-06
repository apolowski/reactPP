import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import Formulario from './pages/Formulario';
import QuienesSomos from './pages/Quienes_somos';
import PokemonCatalog from './pages/PokemonCatalog';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/formulario' element={<Formulario />} />
          <Route path='/quienes_somos' element={<QuienesSomos />} />
          <Route path='/pokemon' element={<PokemonCatalog />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;