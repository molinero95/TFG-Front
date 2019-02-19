import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="navbar navbar-dark bg-primary col-md-12">
                <NavLink to={'/'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Inicio</NavLink>
                <NavLink to={'/train'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Entrenar Modelo</NavLink>
                <NavLink to={'/prediction'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Predicción</NavLink>
                <NavLink to={'/test'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Pruebas</NavLink>
            </nav>
        );
    }
}

