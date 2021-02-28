import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { FilterProvider } from './contexts/filtersContexts';
import Details from './pages/Details';
import Landing from './pages/Landing';
import PageNotFound from './pages/PageNotFound';
import Recommend from './pages/Recommend';
import SearchResults from './pages/SearchResults';

const Routes = () => {
	return(
		<FilterProvider>
		<BrowserRouter>
		<Switch>
			<Route component={Landing} path="/" exact />
			<Route 
				component={Recommend} 
				// component={() => (<FilterProvider> <Recommend /> </FilterProvider>)} 
				path="/recomendar" 
			/>
			<Route component={Details} path="/filme/:id" />
			<Route component={Details} path="/serie/:id" />
			<Route component={SearchResults} path="/pesquisar" />
			
			<Route path="page-not-found" component={PageNotFound} />
			<Route component={PageNotFound} />
		</Switch>
		</BrowserRouter>
		</FilterProvider>
	);
}

export default Routes;