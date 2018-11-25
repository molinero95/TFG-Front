import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from "./components/menu/layout";
import { Home } from './components/menu/home/home';
import { TrainNetwork } from './components/menu/trainNetwork/trainNetwork';
import { CreateNetwork } from './components/menu/createNetwork/createNetwork';
import { Predictions } from './components/menu/predictions/predictions';
import { TestNetwork } from './components/menu/testNetwork/testNetwork';

export const routes =
    <Layout>
        <Route exact path='/' component={Home} />
        <Route exact path='/create' component={CreateNetwork} />
        <Route exact path='/train' component={TrainNetwork} />
        <Route exact path='/prediction' component={Predictions} />
        <Route exact path='/test' component={TestNetwork} />
    </Layout>