import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className='navbar'>
            <Link to='/' className="nav-link">Home</Link>
            <Link to='/formulario' className="nav-link">Formulario</Link>
            <Link to='/quienes_somos' className="nav-link">Quienes somos</Link>
            <Link to='/pokemon' className="nav-link">Pokedex</Link>
        </nav>
    )
}

export default Navbar;