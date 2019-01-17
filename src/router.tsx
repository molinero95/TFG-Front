import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from "./components/menu/layout";
import { Home } from './components/menu/home/home';
import { TrainNetworkView } from './components/menu/trainNetwork/trainNetworkView';
import { Predictions } from './components/menu/predictions/predictions';
import { TestNetwork } from './components/menu/testNetwork/testNetwork';

export const routes =
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/train' component={TrainNetworkView} />
        <Route exact path='/prediction' component={Predictions} />
        <Route exact path='/test' component={TestNetwork} />
    </Layout>