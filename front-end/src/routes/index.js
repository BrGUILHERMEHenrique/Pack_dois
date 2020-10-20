import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Funcionarios from '../pages/Funcionarios';
import Empresas from '../pages/Empresas';


const Routes = () => (
    <Switch>

        <Route exact path="/funcionarios" component={Funcionarios} />
        <Route exact path="/empresas" component={Empresas} />

    </Switch>

)

export default Routes;