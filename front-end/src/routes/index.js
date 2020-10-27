import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Funcionarios from '../pages/Funcionarios';
import Horario from '../pages/Horario';
import FuncionarioHorario  from '../pages/FuncionarioHorario'
import Empresas from '../pages/Empresas';
import HorarioDetalhes from '../pages/HorarioDetalhes';
import HorarioTabela from '../pages/HorarioTabela';
import Apontamento from  '../pages/Apontamento';

const Routes = () => (
    <Switch>

        <Route exact path="/" component={Funcionarios} />
        <Route exact path="/horarioDetalhes" component={HorarioDetalhes} />
        <Route exact path="/horarios" component={HorarioTabela} />
        <Route exact path="/funcionarios" component={Funcionarios} />
        <Route exact path="/empresas" component={Empresas} />
        <Route exact path="/funcionarioHorario" component={FuncionarioHorario} />
        <Route exact path="/apontamentos" component={Apontamento} />
        <Route exact path="/ponto" component={Horario} />
        

    </Switch>

)

export default Routes;