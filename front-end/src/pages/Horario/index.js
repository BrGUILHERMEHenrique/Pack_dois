import React, { useEffect, useState, useCallback } from 'react';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';

import api from '../../services/api';

import { Container, ContainerButtons, Clock, ContainerLogin } from './styles';

const Horario = () => {
    const [timeNow, setTimeNow] = useState ('');
    const [entrada1, setEntrada1] = useState('');
    const [entrada2, setEntrada2] = useState('');
    const [saida1, setSaida1] = useState('');
    const [saida2, setSaida2] = useState('');
    const [funcionario, setFuncionario] = useState({});
    const [horario, setHorario] = useState(Number);
    const [horarios, setHorarios] = useState([]);
    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');
    const [segundo, setSegundo] = useState('');
    const [codMatricula, setCodMatricula] = useState(''); 
    const dateNow = new Date();


    const getTimeNow = () => {
        if(!funcionario.id){
            alert("Antes de fazer qualquer coisa, informe sua Matricula");
            return;
        } 
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

    const handleAddHorarioDetalhes = useCallback(
        async (saida2) => {
            
            console.log(saida2);
            const paramsHoraDetalhe = {
                idFuncionario: funcionario.id,
                // idHorarioDetalhe: funcionarioHorario.idHorario.id,
                entrada1: entrada1,
                saida1: saida1,
                entrada2: entrada2,
                saida2: saida2
            }
            try {               
            // const response = await api.post('horario_detalhes', paramsHoraDetalhe);
                // console.log();
                console.log(paramsHoraDetalhe);
            } catch (error) {
                console.log(error.response.data);
                console.log(error);
            }
        }, [horario, 
            funcionario, 
            entrada1, 
            entrada2, 
            saida1, 
            saida2]
    )
    const timeStop = useCallback(
    () =>{
        if(!funcionario.id){
            alert("Antes de fazer qualquer coisa, informe sua Matricula");
            return;
        }
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
            handleAddHorarioDetalhes(dateTotal);
        }
        
        console.log(dateTotal);
      
    }, [
        entrada1,
        entrada2,
        saida1,
        saida2,
        handleAddHorarioDetalhes
    ], 
    );

    
    const loadFuncionario = useCallback(
        async () => {
            try {
                const response = await api.get(`funcionario/cod/${codMatricula}`);
                console.log(response);
                setFuncionario(response.data);
            } catch (error) {
                console.log(error);
            }
        }, [codMatricula],
    )

    const  loadHorarios = useCallback(
        async () => {
            try{
                const response = await api.get('horario_detalhes');
                console.log(response.data);
                setHorarios(response.data);
            } catch(error){
                console.log(error);
            }
        }, []
    )

    

    const defineHour = useCallback(
        () => {
            setHora(dateNow.getHours());
            setMinuto(dateNow.getMinutes());
            setSegundo(dateNow.getSeconds());
            if(parseInt(dateNow.getMinutes()) >= 59){
                setHora(dateNow.getHours());
            }
            console.log(dateNow.getHours() +":"+ dateNow.getMinutes());
            }, [],
    )

    useEffect (
        () => {
            defineHour();
        }, [defineHour]
    )
    useEffect(
        () => {
            setInterval(() => {
                defineHour();
            }, 300000);
        }, [defineHour]
    ); 


 
    return(
        <Container>
            <ContainerLogin>
            <Input 
                placeholder="Matricula"
                value={codMatricula}
                onChange={e => setCodMatricula(e.target.value)}
                />
            <Button variant="contained" color="primary"
                onClick={() => loadFuncionario()}
                disabled={!!funcionario.id ? true : false}
            >
                Logar
            </Button>
            </ContainerLogin>
            <Clock>{`${hora}:${minuto}`}</Clock>
            <ContainerButtons>
                <Button variant="contained" color="primary" 
                    onClick={getTimeNow}
                    disabled={!!entrada1 && !saida1 || !!entrada2 ? true : false}
                >
                    Gravar {!entrada1 ? "entrada" : "volta do almoço"}
                </Button >

                <Button variant="outlined" color="primary" 
                    onClick={() => timeStop()}
                    disabled={!!saida1 && !entrada2 || !!saida2 ? true : false}
                >
                    {!saida1 ? "Saida almoço" : "Encerrar dia"}
                    </Button>    
            </ContainerButtons>

        </Container>
    )
}

export default Horario;