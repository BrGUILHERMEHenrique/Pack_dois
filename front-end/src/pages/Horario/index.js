import React, { useEffect, useState, useCallback } from 'react';

import Button from '@material-ui/core/Button';

import api from '../../services/api';

const Horario = ({ location }) => {
    const id = location.state.id;
    const [timeNow, setTimeNow] = useState ('');
    const [entrada1, setEntrada1] = useState('');
    const [entrada2, setEntrada2] = useState('');
    const [saida1, setSaida1] = useState('');
    const [saida2, setSaida2] = useState('');
    const [funcionario, setFuncionario] = useState({});
    const [funcionarios, setFuncionarios] = useState([]);
    const [descHorario, setDescHorario] = useState('');
    const [horario, setHorario] = useState(Number);
    const [horarios, setHorarios] = useState([]);
    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');
    const [segundo, setSegundo] = useState('');
    const [dia, setDia] = useState(Number);
    const listaDias = [1, 2, 3, 4, 5, 6, 7];


    const getTimeNow = () => {
        const dateNow = new Date();
        let hour = dateNow.getHours();
        let minute = dateNow.getMinutes();
        let second = dateNow.getSeconds();
        if(dateNow.getHours() < 10){
            hour = `0${dateNow.getHours()}`;
        }
        if(dateNow.getMinutes() < 10){
            minute = `0${dateNow.getMinutes()}`;
        }
        if(dateNow.getSeconds() < 10){
            second = `0${dateNow.getSeconds()}`;
        }
        const dateTotal = `${hour}:${minute}:${second}`
        setTimeNow(dateTotal);
        if(!entrada1 && !saida1){
            setEntrada1(dateTotal);
            console.log(dateTotal);
        } else if(!entrada2 && !!entrada1 && !!saida1){
            setEntrada2(dateTotal);
        }
        console.log(entrada1);
    }

    const timeStop = () =>{
        const dateNow = new Date();
        let hour = dateNow.getHours();
        let minute = dateNow.getMinutes();
        let second = dateNow.getSeconds();
        if(dateNow.getHours() < 10){
            hour = `0${dateNow.getHours()}`;
        }
        if(dateNow.getMinutes() < 10){
            minute = `0${dateNow.getMinutes()}`;
        }
        if(dateNow.getSeconds() < 10){
            second = `0${dateNow.getSeconds()}`;
        }
        const dateTotal = `${hour}:${minute}:${second}`
        if(!saida1 && !!entrada1){
            setSaida1(dateTotal);
        } else if(!saida2 && !!entrada2 && !!saida1) {
            setSaida2(dateTotal);
        }

        console.log(dateTotal);
    }

    
    const loadFuncionarios = useCallback(
        async () => {
            try {
                const response = await api.get('funcionario');
                console.log(response);
                setFuncionarios(response.data);
            } catch (error) {
                console.log(error);
            }
        }, [],
    )

    const  loadHorarios = useCallback(
        async () => {
            try{
                const response = await api.get('horario');
                console.log(response.data);
                setHorarios(response.data);
            } catch(error){
                console.log(error)
            }
        }, []
    )
    const handleAddHorario = useCallback(
        async () => {
            const paramsHorario = {
                codigoHorario: 5,
                descHorario: "Horário comercial"
            }
            try {
                const response = await api.post('horario', paramsHorario);
                console.log(response.data);
                setHorario(response.data);
 
            } catch (error) {
                console.log(error);
            }
    }, [],
    );

    const handleAddHorarioDetalhes = useCallback(
        async () => {
            const paramsHoraDetalhe = {
                idHorario: horario,
                codigoDia: dia,
                folga: false,
                entrada1: entrada1,
                saida1: saida1,
                entrada2: entrada2,
                saida2: saida2
            }
            try {               
                // const response = await api.post('horario_detalhes', paramsHoraDetalhe);
                // console.log(response.data);
                console.log(paramsHoraDetalhe);
            } catch (error) {
                console.log(error.response.data);
                console.log(error);
            }
        }, [horario, funcionario, handleAddHorario, entrada1, entrada2, saida1, saida2]
    )

    const defineHour = useCallback(
        () => {
            const timer = new Date();
            setHora(timer.getHours());
            setMinuto(timer.getMinutes());
            setSegundo(timer.getSeconds());
            if(parseInt(timer.getMinutes()) >= 60){
                setHora(timer.getHours());
            }
            console.log(timer.getHours() +":"+ timer.getMinutes());
            }, [],
    )

    useEffect(
        () => {
            console.log("location_state: ",id);
        }, [location]
    ); 


    useEffect(
        () => {
            loadFuncionarios();
            loadHorarios();
        }, [loadFuncionarios, loadHorarios]
    )

    return(
        <>
            <h1>{`${hora}:${minuto}`}</h1>
        <Button variant="contained" color="primary" 
            onClick={getTimeNow}
        >
            Iniciar
        </Button >

        <select
        value={dia.id}
        onSelect={(e) => setDia(e.target.value)}
        >
            {
                listaDias.map(dia => (
                    <option value={dia.id} key={dia.id} >{dia}</option>
                ))
            }
        </select>

        <select
            value={horario.id}
            onSelect={(e) => setHorario(e.target.value)}
        >
            {
                horarios.map(horario => (
                <option value={horario.id} key={horario.id} >{horario.codigoHorario}-{horario.descHorario}</option>
                ))
            }
        </select>

        <select
            value={funcionario.id}
            onSelect={(e) => setFuncionario(e.target.value)}
        >
            {
                funcionarios.map(func => (
                    <option value={func.id} key={func.id} >{func.nome}</option>
                ))
            }
        </select>

        <Button variant="contained" color="secundary"
            onClick={() => handleAddHorarioDetalhes()}
        >
            Gravar
        </Button>

        <Button variant="outlined" color="primary" 
            onClick={() => timeStop()}
        >
            Parar
            </Button>    


        </>
    )
}

export default Horario;