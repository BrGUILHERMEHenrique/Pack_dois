import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Funcionarios from '../pages/Funcionarios';

const Routes = () => (
    <Switch>

        <Route exact path="/" component={Funcionarios} />

    </Switch>

)

export default Routes;