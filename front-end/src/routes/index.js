import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Funcionarios from '../pages/Funcionarios';
import Horario from '../pages/Horario';
import Empresas from '../pages/Empresas';
import HorarioDetalhes from '../pages/HorarioDetalhes';


const Routes = () => (
    <Switch>

        <Route exact path="/" component={Funcionarios} />
        <Route exact path="/horario" component={HorarioDetalhes} />
        <Route exact path="/funcionarios" component={Funcionarios} />
        <Route exact path="/empresas" component={Empresas} />
        

    </Switch>

)

export default Routes;