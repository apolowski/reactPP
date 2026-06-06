import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Quienes_somos from '../pages/Quienes_somos';
import PokemonCatalog from '../pages/PokemonCatalog';

function AppRouter(){
    return(
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/quienes_somos' element={<Quienes_somos />} />
                <Route path='/pokemon' element={<PokemonCatalog />} />
            </Routes>
        
        </BrowserRouter>
    )
}

export default AppRouter;