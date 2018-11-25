import * as React from "react";
import * as ReactDOM from "react-dom";
import {  HashRouter } from "react-router-dom";
import { AppContainer } from 'react-hot-loader';
import * as RoutesModule from './router';

let routes = RoutesModule.routes;
ReactDOM.render(
    <AppContainer>
        <HashRouter children={ routes }  />
    </AppContainer>,
    document.getElementById('react-app')
);