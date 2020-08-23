import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Recommend from './pages/Recommend';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Landing} path="/" exact />
            <Route component={Recommend} path="/recomendar" />
        </BrowserRouter>
    );
}

export default Routes;