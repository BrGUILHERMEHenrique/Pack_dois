import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Funcionarios from '../pages/Funcionarios';
import Horario from '../pages/Horario';

const Routes = () => (
    <Switch>

        <Route exact path="/" component={Funcionarios} />
        <Route excact path="/horario" component={Horario} />
    </Switch>

)

export default Routes;