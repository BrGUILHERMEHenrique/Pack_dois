import React, { useState, useEffect, useCallback } from 'react';

import Modal from 'react-modal';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';


import { FormModal, Button, Container, Row, SubTitulo, HeaderModal, FooterModal, InputContainer } from './styles';
import { TableHD } from '../../components/Table';


// const customStyles = {
//     content : {
//         width               : '50%',
//         height              : '50%',
//         top                 : '50%',
//         left                : '50%',
//         right               : 'auto',
//         bottom              : 'auto',
//         marginRight         : '-50%',
//         transform           : 'translate(-50%, -50%)'
//     }
//   };

const inputStyle = {
    horario: {
        width: '8vw',
        height: '100%',
        marginRight: '10px',
        marginTop: '3%', 
    },
    horarioUp: {
        width: '8vw',
        height: '100%',
        marginRight: '10px',
        marginTop: '3%', 
    },
    
};


const modalStyleAtualizar = {
    content: {
        width               : '45%',
        height              : '55%',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
};

const modalStyleAdicionar = {
    content: {
        width               : '50%',
        height              : '55%',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
}


  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    TextFieldEmpty: {
      marginTop: theme.spacing(2),
    }
  }));
  
const HorarioDetalhes = ({ location }) => {
    const id = location.state.id;
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
            const response = await api.get(`horario_detalhes/idHorario/${id}`);
            console.log(response.data);
            setListHorarioDetalhes(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [id],
    );

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
                idHorario: id,
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
            if(!folgaAtualizado){
                if(!entrada1Atualizado || !saida1Atualizado || !entrada2Atualizado || !saida2Atualizado || !codigoDiaAtualizado){
                alert("Por favor, preencha todos os campos");
                return;
                }
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
        }, [loadHorarioDetahes],
    )

    return(
        <Container>
            <Row 
            direction="row"
            container>
                <SubTitulo> Detalhes do Horário </SubTitulo>
                <Button variant="contained" color="primary" onClick={openModalAdd}>Adicionar</Button>
            </Row>

            <TableHD horarioDetalhes={ListHorarioDetalhes} removeHorarioDetalhe = {removeHorarioDetalhe} handleHorarioDetalhes={openModalWithData}/>

            <Modal
                isOpen={modalPutIsOpen}
                onRequestClose={closeModalUpdate}
                style={modalStyleAtualizar}
                contentLabel="Modal"
            >
                <HeaderModal>
                    <h2>Atualizar</h2>
                </HeaderModal>
                <FormModal>
                    <InputContainer>
                        <TextField
                            style={inputStyle.horarioUp}
                            label="Horário Entrada"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEntrada1Atualizado(e.target.value)}
                            value={entrada1Atualizado}
                        />
                        <TextField 
                            style={inputStyle.horarioUp}
                            label="Horário Almoço"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSaida1Atualizado(e.target.value)}
                            value={saida1Atualizado}
                        />
                    
                        <TextField 
                            style={inputStyle.horarioUp}
                            label="Horário Retorno"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEntrada2Atualizado(e.target.value)}
                            value={entrada2Atualizado}
                        />
                        <TextField
                            style={inputStyle.horarioUp}
                            label="Horário Saída"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSaida2Atualizado(e.target.value)} 
                            value={saida2Atualizado}
                        />
                    </InputContainer>
                    <InputContainer>
                        {/* <TextField 
                            type="number"
                            value={codigoDiaAtualizado}
                            style={inputStyle.horarioUp}
                            label="Código do Dia"
                            InputProps={{ inputProps: { min: 1} }}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => {
                                setCodigoDiaAtualizado(e.target.value);
                            }}
                        /> */}
                        <TextField
                            select
                            style={inputStyle.horarioUp}
                            labelId="Folga"
                            id="Folga"
                            value={folgaAtualizado}
                            label="Folga"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setFolgaAtualizado(e.target.value)}
                        >
                            <MenuItem value={true}>Verdadeiro</MenuItem>
                            <MenuItem value={false}>Falso</MenuItem>
                        </TextField>
                    </InputContainer>
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
            style={modalStyleAdicionar}
            contentLabel="Modal"
            >
                <HeaderModal>
                <h2>Cadastrar</h2>  
                </HeaderModal>
            
                <FormModal>
                    <InputContainer>
                        <TextField
                            select
                            label="Horário Entrada"
                            labelId={entrada1}
                            id={entrada1}
                            value={entrada1}
                            style={inputStyle.horario}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEntrada1(e.target.value)}
                        >
                            {
                                listHorarios.map(horario => (
                                    <MenuItem value={horario}>{horario}</MenuItem>
                                ))
                            }
                        
                        </TextField>
                        <TextField
                            select
                            labelId={saida1}
                            id={saida1}
                            value={saida1}
                            style={inputStyle.horario}
                            label="Horário Almoço"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSaida1(e.target.value)}
                        >
                            {
                                listHorarios.map(horario => (
                                    <MenuItem value={horario}>{horario}</MenuItem>
                                ))
                            }
                        
                        </TextField>
                        <TextField
                            select
                            style={inputStyle.horario}
                            label="Horário Retorno"
                            InputLabelProps={{ shrink: true }}
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
                        
                        </TextField>
                            <TextField
                                select
                                style={inputStyle.horario}
                                label="Horário Saída"
                                InputLabelProps={{ shrink: true }}
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
                            
                            </TextField>
                    </InputContainer>
                    <InputContainer>
                            {/* <TextField
                                select
                                style={inputStyle.horario}
                                label="Horário"
                                labelId="Horarios"
                                id={horario.id}
                                value={horario}
                                InputLabelProps={{ shrink: true }}
                                onChange={e => setHorario(e.target.value)}
                            >
                                {
                                    horarios.map(horario => (
                                        <MenuItem value={horario}>{horario.codigoHorario}-{horario.descHorario}</MenuItem>
                                    )) 
                                }
                            
                            </TextField> */}
                            <TextField
                                select
                                style={inputStyle.horario}
                                label="Folga"
                                labelId="Folga"
                                id="Folga"
                                value={folga}
                                InputLabelProps={{ shrink: true }}
                                onChange={e => setFolga(e.target.value)}
                            >
                                <MenuItem value={true}>Verdadeiro</MenuItem>
                                <MenuItem value={false}>Falso</MenuItem>
                            </TextField>
                        <TextField 
                            style={inputStyle.horario}
                            type="number"
                            label="Código do Dia"
                            value={codigoDia}
                            InputProps={{ inputProps: { min: 1} }}
                            onChange={e => {
                                setCodigoDia(e.target.value);
                                setUltimo(parseInt(e.target.value));
                            }}
                        />
                    </InputContainer>
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
    )



}

export default HorarioDetalhes;