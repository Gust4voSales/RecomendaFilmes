import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { FilterProvider } from './contexts/filtersContexts';
import Details from './pages/Details';
import Landing from './pages/Landing';
import Recommend from './pages/Recommend';

const Routes = () => {
    return(
        <FilterProvider>
        <BrowserRouter>
            <Route component={Landing} path="/" exact />
            <Route 
                component={Recommend} 
                // component={() => (<FilterProvider> <Recommend /> </FilterProvider>)} 
                path="/recomendar" 
            />
            <Route component={Details} path="/filme/:id" />
            <Route component={Details} path="/serie/:id" />
        </BrowserRouter>
        </FilterProvider>
    );
}

export default Routes;