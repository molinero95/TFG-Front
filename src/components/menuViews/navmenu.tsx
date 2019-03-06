import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return (
            <nav className="navbar navbar-dark bg-success col-md-12">
                <NavLink to={'/selectModel'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Seleccionar modelo</NavLink>
                <NavLink to={'/selectVersion'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Seleccionar version</NavLink>
                <NavLink to={'/train'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Entrenar Modelo</NavLink>
                <NavLink to={'/prediction'} exact activeClassName='active' className="nav-item nav-link bigCentereWhitedText">Predicción</NavLink>
            </nav>
        );
    }
}
