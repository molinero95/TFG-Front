import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from "./components/menuViews/layout";
import { VersionRoute } from './components/menuViews/versionView/versionRoute';
import { ModelRoute } from './components/menuViews/modelView/modelRoute';
import { TrainerMainView } from './components/menuViews/trainerView/trainerMainView';
import { PredictionsMainView } from './components/menuViews/predictionsView/predictionsMainView';
import { TrainerRoute } from './components/menuViews/trainerView/trainerRoute';
import { PredictionsRoute } from './components/menuViews/predictionsView/predictionsRoute';

export const routes =
	<Layout>
		<Route exact path='/' component={ModelRoute} />
		<Route exact path='/selectModel' component={ModelRoute} />
		<Route exact path='/selectVersion' component={VersionRoute} />
		<Route exact path='/train' component={TrainerRoute} />
		<Route exact path='/prediction' component={PredictionsRoute} />
	</Layout>