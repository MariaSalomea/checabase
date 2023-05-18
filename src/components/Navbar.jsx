import { Link } from 'react-router-dom';
import './Navbar.css';

const navigationItems = [
  { path: '/roles', label: 'Roles' },
  { path: '/unidades', label: 'Unidades' },
  { path: '/seleccionarrol', label: 'Seleccionar Rol' },
];

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        {navigationItems.map((item) => (
          <li className="nav-item" key={item.path}>
            <Link to={item.path} className="nav-link">{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;