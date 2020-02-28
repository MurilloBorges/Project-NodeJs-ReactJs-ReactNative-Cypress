import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './services/auth'
import Login from './pages/Login';
import ListaProdutos from './pages/ListaProdutos';
import OperacaoProdutos from './pages/OperacaoProdutos';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest}
        render = {
            props => isAuthenticated() ? (<Component {...props} />) 
                : (<Redirect to={{ pathname: "/", state: { from: props.location } }} />)
        }
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" excat component={Login} />
            <Route exact path="/login" excat component={Login} />                     
            <PrivateRoute path="/produtos" exact component={ListaProdutos}/> 
            <PrivateRoute path="/produtos/:tipoOperacao" exact component={OperacaoProdutos}/> 
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;