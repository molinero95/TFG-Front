import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from "./components/menuViews/layout";
import { Predictions } from './components/menuViews/predictions/predictions';
import { VersionSelectorAndCreatorViewComp } from './components/menuViews/versionSelectorAndCreatorView/versionSelectorAndCreatorViewComp';
import { ModelSelectorAndCreatorViewComp } from './components/menuViews/modelSelectorAndCreatorView/modelSelectorAndCreatorViewComp';
import { ModelTrainerViewComp } from './components/menuViews/modeltrainerView/modelTrainerViewComp';

export const routes =
    <Layout>
        <Route exact path='/selectModel' component={ModelSelectorAndCreatorViewComp} />
        <Route exact path='/selectVersion' component={VersionSelectorAndCreatorViewComp} />
        <Route exact path='/train' component={ModelTrainerViewComp} />
        <Route exact path='/prediction' component={Predictions} />
    </Layout>