import React, { useEffect, useState, useCallback } from 'react';

import Button from '@material-ui/core/Button';

import api from '../../services/api';

const Horario = () => {

    const [timeNow, setTimeNow] = useState('');
    const [funcionario, setFuncionario] = useState({});
    const [funcionarios, setFuncionarios] = useState([]);
    const [horario, setHorario] = useState({});


    const getTimeNow = () => {
        const dateNow = new Date();
        const dateTotal = `${dateNow.getHours()}:${dateNow.getMinutes()}:${dateNow.getSeconds()}.${dateNow.getMilliseconds()}`
        setTimeNow(dateTotal);
        console.log(dateTotal);
    }
    
    const loadFuncionarios = useCallback(
        async () => {
            try {
                const response = await api.get('funcionario');
                console.log(response);
                setFuncionarios(response.data);
            } catch (error) {
                console.log(error.response.data);
            }
        }, [],
    )
    const handleAddHorario = useCallback(
        async () => {
            const paramsHorario = {
                codigoHorario: 1,
                descHorario: "Horário comercial"
            }
            try {
                const response = await api.post('horario', paramsHorario);
                console.log(response.data);

            } catch (error) {
                alert(error.response)
            }
    }, [],
    );

    const handleAddHorarioDetalhes = useCallback(
        async () => {
            const paramsHoraDetalhe = {
                idHorario: horario.id,
                codigo: 1,
                folga: false,
                entrada1: timeNow,
                saida1: timeNow,
                entrada2: timeNow,
                saida2: timeNow
            }
            try {
                await handleAddHorario();
                const response = await api.post('horario_detalhes', paramsHoraDetalhe)
            } catch (error) {
                console.log(error.response.data)
            }
        }, [horario, funcionario, handleAddHorario]
    )

    useEffect(
        () => {
            loadFuncionarios();
        }, [loadFuncionarios]
    )

    return(
        <>
        <Button variant="contained" color="primary" 
            onClick={getTimeNow}
        >
            Iniciar
        </Button >

        <select
            value={funcionario}
        >
            {
                funcionarios.map(func => (
                    <option value={func} key={func.id} onClick={e => setFuncionario(e.target.value)}>{func.nome}</option>
                ))
            }
        </select>

        <Button variant="contained" color="secundary"
            onClick={() => handleAddHorarioDetalhes()}
        >
            Gravar
        </Button>
        </>
    )
}

export default Horario;