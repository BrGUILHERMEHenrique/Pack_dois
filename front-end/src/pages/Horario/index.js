import React, { useEffect, useState, useCallback } from 'react';

// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Relogio from '../../components/Relogio'
import api from '../../services/api';

import { Container, Button, ContainerLogin, ButtonInativo } from './styles';

const inativo = {
    backgroundColor: 'grey'
}

const Horario = () => {
    const [timeNow, setTimeNow] = useState ('');
    const [textButton, setTextButton] = useState('Logar');
    const [entrada1, setEntrada1] = useState('');
    const [entrada2, setEntrada2] = useState('');
    const [saida1, setSaida1] = useState('');
    const [saida2, setSaida2] = useState('');
    const [funcionario, setFuncionario] = useState({});
    const [horario, setHorario] = useState(Number);
    const [horarios, setHorarios] = useState([]);
    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');
    const [estilo, setEstilo] = useState('');
    const [pis, setPis] = useState(''); 
    const dateNow = new Date();
    const data = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate() < 10 ? '0'+ dateNow.getDate() : dateNow.getDate()}`;
    const handleAllClicks = () => {
        console.log(data);
        if(!funcionario.id){
            loadFuncionario();
        } else if(!entrada1 && !saida1 || !entrada2 && !!saida1){
            getTimeNow();
        } else if(!saida1 || !saida2 && !!entrada1 || !!entrada2){
            timeStop();
        }
    }

    const addZero = () => {
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
        return `${hour}:${minute}:${second}`;
    }

    const getTimeNow = () => {
        const dateTotal = addZero();
        setTimeNow(dateTotal);
        if(!entrada1 && !saida1){
            setEntrada1(dateTotal);
            setTextButton('Almoço');
            console.log(dateTotal);
        } else if(!entrada2 && !!entrada1 && !!saida1){
            setEntrada2(dateTotal);
            setTextButton('Encerrar');
        }
        console.log(entrada1);
    }

    const handleAddApontamento = useCallback(
        async (saida2) => {
            
            console.log(saida2);
            const params = {
                funcionario: funcionario.id,
                data: data,
                entrada1: entrada1,
                saida1: saida1,
                entrada2: entrada2,
                saida2: saida2
            }
            try {               
            const response = await api.post('apontamento', params);
                console.log(response.data);
                console.log(params);
            } catch (error) {
                console.log(error.response.data.replaceAll("_", " "));
                console.log(error);
            }
        }, [horario, 
            funcionario,
            data, 
            entrada1, 
            entrada2, 
            saida1, 
            saida2]
    )
    const timeStop = useCallback(
    () =>{
        const dateTotal = addZero();
        if(!saida1 && !!entrada1){
            setSaida1(dateTotal);
            setTextButton('Retorno')
        } else if(!saida2 && !!entrada2 && !!saida1) {
            setSaida2(dateTotal);
            handleAddApontamento(dateTotal);
        }
        
        console.log(dateTotal);
      
    }, [
        entrada1,
        entrada2,
        saida1,
        saida2,
        handleAddApontamento
    ], 
    );

    
    const loadFuncionario = useCallback(
        async () => {
            if(!pis){
                alert("Antes de fazer qualquer coisa, informe sua Matricula");
                return;
            }
            try {
                const response = await api.get(`funcionario/cod/${pis}`);
                console.log(response);
                setFuncionario(response.data);
                setTextButton('Entrada');
            } catch (error) {
                console.log(error);
            }
        }, [pis],
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

    

    // const defineHour = useCallback(
    //     () => {
    //         setHora(dateNow.getHours());
    //         setMinuto(dateNow.getMinutes());
    //         setSegundo(dateNow.getSeconds());
    //         if(parseInt(dateNow.getMinutes()) >= 59){
    //             setHora(dateNow.getHours());
    //         }
    //         console.log(dateNow.getHours() +":"+ dateNow.getMinutes());
    //         }, [],
    // )

    // useEffect (
    //     () => {
    //         defineHour();
    //     }, [defineHour]
    // )
    // useEffect(
    //     () => {
    //         setInterval(() => {
    //             defineHour();
    //         }, 300000);
    //     }, [defineHour]
    // ); 


 
    return(
        <Container>
            <ContainerLogin>
            <Input 
                placeholder="PIS (apenas números)"
                value={pis}
                onChange={e => setPis(e.target.value)}
                disabled={!!funcionario.id ? true : false}
                />
            
            {
                !saida2 ?
                <Button
                onClick={() => handleAllClicks()}
                disabled={!!saida2 ? true : false}
            >
                {textButton}
            </Button>
            :
            <ButtonInativo
                disabled={true}
            >
                Bom descanso!
            </ButtonInativo>
            }

            </ContainerLogin>
            <Relogio/>
        </Container>
    )
}

export default Horario;