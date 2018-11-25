import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="navbar navbar-dark bg-primary col-md-12">
                <NavLink to={'/'} exact activeClassName='active' className="nav-item nav-link white">Inicio</NavLink>
                <NavLink to={'/create'} exact activeClassName='active' className="nav-item nav-link white">Crear Modelo</NavLink>
                <NavLink to={'/train'} exact activeClassName='active' className="nav-item nav-link white">Entrenar Modelo</NavLink>
                <NavLink to={'/prediction'} exact activeClassName='active' className="nav-item nav-link white">Predicción</NavLink>
                <NavLink to={'/test'} exact activeClassName='active' className="nav-item nav-link white">Pruebas</NavLink>
            </nav>
        );
    }
}

