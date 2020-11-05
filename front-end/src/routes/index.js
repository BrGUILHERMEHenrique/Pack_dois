import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Funcionarios from '../pages/Funcionarios';
import Ponto from '../pages/Ponto';
import FuncionarioHorario  from '../pages/FuncionarioHorario'
import Empresas from '../pages/Empresas';
import HorarioDetalhes from '../pages/HorarioDetalhes';
import Horarios from '../pages/Horarios';
import Apontamento from  '../pages/Apontamento';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Funcionarios} />
        <Route exact path="/horarioDetalhes" component={HorarioDetalhes} />
        <Route exact path="/horarios" component={Horarios} />
        <Route exact path="/funcionarios" component={Funcionarios} />
        <Route exact path="/empresas" component={Empresas} />
        <Route exact path="/funcionarioHorario" component={FuncionarioHorario} />
        <Route exact path="/apontamentos" component={Apontamento} />
        <Route exact path="/ponto" component={Ponto} />
    </Switch>
)

export default Routes;