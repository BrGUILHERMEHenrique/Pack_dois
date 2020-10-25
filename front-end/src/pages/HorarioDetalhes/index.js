import React, { useState, useEffect, useCallback } from 'react';

import Input from '@material-ui/core/Input';

import Modal from 'react-modal';
import api from '../../services/api';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { FormModal, Button, Container, Row, SubTitulo, HeaderModal, FooterModal } from './styles';
import { TableHD } from '../../components/Table';


const customStyles = {
    content : {
        width               : '50%',
        height              : '50%',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
  };

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    }
  }));
  
const HorarioDetalhes = () => {
    const classes = useStyles();
    const [ListHorarioDetalhes, setListHorarioDetalhes] = useState([]);
    const [folga, setFolga] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [entrada1, setEntrada1] = useState('');
    const [entrada2, setEntrada2] = useState('');
    const [saida1, setSaida1] = useState('');
    const [saida2, setSaida2] = useState('');
    const [horario, setHorario] = useState({});
    const [horarioDetalhe, setHorarioDetalhe] = useState({});
    const [codigoDia, setCodigoDia] = useState(1);
    const [codigoDiaAtualizado, setCodigoDiaAtualizado] = useState(Number);
    const [folgaAtualizado,  setFolgaAtualizado] = useState(Boolean);
    const [entrada1Atualizado, setEntrada1Atualizado] = useState('');
    const [entrada2Atualizado, setEntrada2Atualizado] = useState('');
    const [saida1Atualizado, setSaida1Atualizado] = useState('');
    const [saida2Atualizado, setSaida2Atualizado] = useState('');
    const [ultimo, setUltimo] = useState(Number);
    const [modalPutIsOpen, setModalaPutIsOpen] = useState(false);
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false);
    const listHorarios = [
        "06:00:00",
        "07:00:00",
        "08:00:00",
        "09:00:00",
        "10:00:00",
        "11:00:00",
        "12:00:00",
        "13:00:00",
        "14:00:00",
        "15:00:00",
        "16:00:00",
        "17:00:00",
        "18:00:00"
    ]
    const openModalWithData = useCallback (
    async (id) => {
        try{
            const response = await api.get(`horario_detalhes/${id}`);
            setEntrada1Atualizado(response.data.entrada1);
            setSaida1Atualizado(response.data.saida1);
            setEntrada2Atualizado(response.data.entrada2);
            setSaida2Atualizado(response.data.saida2);
            setFolgaAtualizado(response.data.folga);
            setCodigoDiaAtualizado(response.data.codigoDia);
            setHorarioDetalhe(response.data);
            setModalaPutIsOpen(true);
        } catch (error) {
            console.log(error);
        }
    }, [],
    );

    const closeModalUpdate = () => {
        setModalaPutIsOpen(false);
    }

    const openModalAdd = () => {
        setModalAddIsOpen(true);
    }
    const closeModalAdd = () => {
        setModalAddIsOpen(false);
        
    }
    

    const loadHorarioDetahes = useCallback(
    async () => {
        try {
            const response = await api.get('horario_detalhes');
            console.log(response.data);
            setListHorarioDetalhes(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [],
    );

    const loadHorarios = useCallback(
        async () => {
            try{
                const response = await api.get('horario');
                setHorarios(response.data);
                console.log(response.data);
            } catch(error) {
                console.log(error);
            }
        }, [],
    )

    const handleAddHorarioDetalhe = useCallback(
        async (e) => {
            e.preventDefault();
            if(parseInt(codigoDia) > 31){
                alert("Por favor verifique os dados, não há um mês que passe do dia 31");
                closeModalAdd();
                return;
            }
            if(!folga){
                if(!entrada1 || !saida1 || !entrada2 || !saida2 || !codigoDia){
                alert("Por favor, preencha todos os campos");
                return;
                }
            }
            const params = { 
                idHorario: horario.id,
                codigoDia: parseInt(codigoDia),
                folga,
                entrada1: entrada1,
                saida1: saida1,
                entrada2: entrada2,
                saida2: saida2
   
            }

            try {
                console.log(params);
                await api.post('horario_detalhes', params);
            } catch (error) {
                console.log(error.response.data);
            } finally{
                loadHorarioDetahes();
                setCodigoDia(ultimo + 1);
                closeModalAdd();
                setEntrada1('');
                setEntrada2('');
                setSaida1('');
                setSaida2('');
                setFolga(false);
                setHorario({});
                closeModalAdd();
            }
        }, [
            horario,  
            codigoDia,
            folga,
            entrada1,
            saida1,
            entrada2,
            saida2
        ]
    );

    const removeHorarioDetalhe = useCallback(
        async (id) => {
            try {
                await api.delete(`horario_detalhes/${id}`);
                console.log('Sucess, Delete');
            } catch (error) {
                console.log(error);
            } finally {
                loadHorarioDetahes();
            }
        }, []
    )

    const handleHorarioDetalhe = useCallback(
        async (horario, e) => {
            e.preventDefault();
            if(parseInt(codigoDia) > 31){
                alert("Por favor verifique os dados, não há um mês que passe do dia 31");
                closeModalAdd();
                return;
            }
            if(!codigoDiaAtualizado || !folgaAtualizado || !entrada1Atualizado || !saida1Atualizado || !entrada2Atualizado || !saida2Atualizado || !folgaAtualizado){
                alert("Por favor, preencha todos os campos");
                return;
            }
            const params = {
                codigoDia: parseInt(codigoDiaAtualizado),
                folga: folgaAtualizado,
                entrada1: entrada1Atualizado,
                saida1: saida1Atualizado,
                entrada2: entrada2Atualizado,
                saida2: saida2Atualizado
            }
            console.log(params);

            try{
                await api.put(`horario_detalhes/${horario}`, params);
                console.log('Sucess, Update');
            } catch(error) {
                console.log(error);
            } finally {
                loadHorarioDetahes();
            }
        }, [
            codigoDiaAtualizado,
            folgaAtualizado,
            entrada1Atualizado,
            saida1Atualizado,
            entrada2Atualizado,
            saida2Atualizado
        ],
    )
    

    useEffect(
        () => {
            loadHorarioDetahes();
            loadHorarios();
        }, [loadHorarioDetahes, loadHorarios],
    )

    return(
        <>

        <Container>
             <Row 
            direction="row"
            container>
                <SubTitulo> Horário Detalhe </SubTitulo>
                <Button variant="contained" color="primary" onClick={openModalAdd}>Adicionar</Button>
            </Row>

        <TableHD horarioDetalhes={ListHorarioDetalhes} removeHorarioDetalhes = {removeHorarioDetalhe} handleHorarioDetalhes={openModalWithData}/>

        <Modal
            isOpen={modalPutIsOpen}
            onRequestClose={closeModalUpdate}
            style={customStyles}
            contentLabel="Modal"
        >
            <HeaderModal>
                <h2>Atualizar</h2>
            </HeaderModal>
            
            {/* <button onClick={closeModalUpdate}>Fechar</button> */}
            <FormModal>
                <Row>
                <Input 
                    onChange={e => setEntrada1Atualizado(e.target.value)}
                    value={entrada1Atualizado}
                />
               
                <Input 
                    onChange={e => setEntrada2Atualizado(e.target.value)}
                    value={entrada2Atualizado}
                />
                </Row>
                <Row>
                <Input   
                    onChange={e => setSaida1Atualizado(e.target.value)}
                    value={saida1Atualizado}
                />
                <Input
                    onChange={e => setSaida2Atualizado(e.target.value)} 
                    value={saida2Atualizado}
                />
                </Row>
                <Row>
                <Input 
                    type="number"
                    value={codigoDiaAtualizado}
                    
                    onChange={e => {
                        setCodigoDiaAtualizado(e.target.value);
                    }}
                />
                
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink={true} id="Folga">Folga</InputLabel>
                        <Select
                        labelId="Folga"
                        id="Folga"
                        value={folgaAtualizado}
                        onChange={e => setFolgaAtualizado(e.target.value)}
                        >
                            <MenuItem value={true}>Verdadeiro</MenuItem>
                            <MenuItem value={false}>Falso</MenuItem>
                        </Select>
                    </FormControl>
                </Row>
                    <FooterModal>
                <Button
                    onClick={e => handleHorarioDetalhe(horarioDetalhe.id, e)}
                >Atualizar</Button>
                <Button
                    onClick={closeModalUpdate}
                >Cancelar</Button>
                </FooterModal>
            </FormModal>
            </Modal>

            <Modal
            isOpen={modalAddIsOpen}
            onRequestClose={closeModalAdd}
            style={customStyles}
            contentLabel="Modal"
            >
                <HeaderModal>
                  <h2>Cadastrar</h2>  
                </HeaderModal>
            
            <FormModal>
               <Row>
                 <FormControl className={classes.formControl}>
                        <InputLabel shrink={true} id={entrada1}>Horário Entrada</InputLabel>
                        <Select
                        labelId={entrada1}
                        id={entrada1}
                        value={entrada1}
                        onChange={e => setEntrada1(e.target.value)}
                        >
                            {
                                listHorarios.map(horario => (
                                    <MenuItem value={horario}>{horario}</MenuItem>
                                ))
                            }
                        
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink={true} id={saida1}>Horário saida almoço</InputLabel>
                        <Select
                        labelId={saida1}
                        id={saida1}
                        value={saida1}
                        onChange={e => setSaida1(e.target.value)}
                        >
                            {
                                listHorarios.map(horario => (
                                    <MenuItem value={horario}>{horario}</MenuItem>
                                ))
                            }
                        
                        </Select>
                    </FormControl>
                
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink={true} id={entrada2}>Horário volta almoço</InputLabel>
                        <Select
                        labelId={entrada2}
                        id={entrada2}
                        value={entrada2}
                        onChange={e => setEntrada2(e.target.value)}
                        >
                            {
                                listHorarios.map(horario => (
                                    <MenuItem value={horario}>{horario}</MenuItem>
                                ))
                            }
                        
                        </Select>
                    </FormControl>
                    </Row>
                    <Row>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink={true} id={saida2}>Horário final expediente</InputLabel>
                        <Select
                        labelId={saida2}
                        id={saida2}
                        value={saida2}
                        onChange={e => setSaida2(e.target.value)}
                        >
                            {
                                listHorarios.map(horario => (
                                    <MenuItem value={horario}>{horario}</MenuItem>
                                ))
                            }
                        
                        </Select>
                    </FormControl>

                <FormControl className={classes.formControl}>
                        <InputLabel id={horario.id}>Horário</InputLabel>
                        <Select
                        labelId="Horarios"
                        id={horario.id}
                        value={horario}
                        onChange={e => setHorario(e.target.value)}
                        >
                            {
                                horarios.map(horario => (
                                    <MenuItem value={horario}>{horario.codigoHorario}-{horario.descHorario}</MenuItem>
                                )) 
                            }
                        
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel shrink={true} id="Folga">Folga</InputLabel>
                        <Select
                        labelId="Folga"
                        id="Folga"
                        value={folga}
                        onChange={e => setFolga(e.target.value)}
                        >
                            <MenuItem value={true}>Verdadeiro</MenuItem>
                            <MenuItem value={false}>Falso</MenuItem>
                        </Select>
                    </FormControl>
                    </Row>

                    <Input 
                        min={1}
                        type="number"
                        size="small"
                        value={codigoDia}
                        onChange={e => {
                            setCodigoDia(e.target.value);
                            setUltimo(parseInt(e.target.value));
                        }}
                    />
                    <FooterModal>
                <Button
                    onClick={e => handleAddHorarioDetalhe(e)}
                >Adicionar</Button>
                <Button
                    onClick={closeModalAdd}
                >Cancelar</Button>
                </FooterModal>
            </FormModal>
            </Modal>
            </Container>
        </>
    )



}

export default HorarioDetalhes;