import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from "./components/menuViews/layout";
import { VersionRouteComp } from './components/menuViews/versionView/versionRouteComp';
import { ModelRouteComp } from './components/menuViews/modelView/modelRouteComp';
import { TrainerRouteMainViewComp } from './components/menuViews/trainerView/trainerRouteMainViewComp';
import { PredictionsRouteMainViewComp } from './components/menuViews/predictionsView/predictionsRouteMainViewComp';

export const routes =
	<Layout>
		<Route exact path='/' component={ModelRouteComp} />
		<Route exact path='/selectModel' component={ModelRouteComp} />
		<Route exact path='/selectVersion' component={VersionRouteComp} />
		<Route exact path='/train' component={TrainerRouteMainViewComp} />
		<Route exact path='/prediction' component={PredictionsRouteMainViewComp} />
	</Layout>