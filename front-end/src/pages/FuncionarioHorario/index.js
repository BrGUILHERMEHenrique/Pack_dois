import React, { useCallback, useEffect, useState } from 'react';

import Modal from 'react-modal';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import api from '../../services/api';

import { TableFH } from '../../components/Table';
import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button } from './styles';

const styleAdicionar = {
    content : {
        width               : '50%',
        height              : '60%',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
  };

  const styleAtualizar = {
    content : {
        width               : '30%',
        height              : '40%',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
  };
const inputStyle = {
    width               : '70%',
    height              : '70%' 
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
const FuncionarioHorario = ({ location }) => {
    const id = location.state.id;
    const classes = useStyles();

    const [funcionarioHorarios, setFuncionarioHorarios] = useState([]);
    const [funcionarioHorario, setFuncionarioHorario] = useState({});
    const [horarios, setHorarios] = useState([]);
    const [codigoInicial, setCodigoInicial] = useState('');
    const [idHorario, setIdHorario] = useState(Number);
    const [codigoInicialAtualizado, setCodigoInicialAtualizado] = useState('');
    const [idHorarioAtualizado, setIdHorarioAtualizado] = useState('');
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalPutIsOpen, setModalPutIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
      }
      
      function closeModal(){
        setIsOpen(false);
      }

      function openModalUpdate() {
        setModalPutIsOpen(true);
      }
      
      function closeModalUpdate(){
        setModalPutIsOpen(false);
      }

      const loadHorarios = useCallback (
          async () => {
              try{
                const response = await api.get('horario');
                console.log("horarios: ", response.data);
                setHorarios(response.data);
              } catch (error){
                  console.log(error);
              }
          }, []
      )
    const loadFuncionarioHorarios = useCallback(
        async () => {
            const response = await api.get(`funcionario_horario/idFuncionario/${id}`);
            console.log("Load Horarios ",response.data);
            setFuncionarioHorarios(response.data);
        }, [id],
    );

    const handleAddFunionarioHorario = useCallback (
        async (e) => {
            e.preventDefault();
            const params = {
                codigoInicial: parseInt(codigoInicial),
                idFuncionario : id,
                idHorario: parseInt(idHorario),
                vigenciaFinal: "2017-01-13T17:09:42.411",
                vigenciaInicial: "2018-01-13T17:09:42.411"
            }
            console.log(params);
            try {
                await api.post('funcionario_horario', params);
                console.log('Deu certo aqui cara');
            } catch (error) {
                console.log(error);
            } finally {
                closeModal();
                loadFuncionarioHorarios()
            }
        }, [codigoInicial, 
            idHorario,
            loadFuncionarioHorarios
        ]
    );

    const handleUpdateFuncionarioHorario = useCallback(
        async (e) => {
            e.preventDefault();
            const params = {
                codigoInicial: parseInt(codigoInicialAtualizado),
                idFuncionario : id,
                idHorario: parseInt(idHorarioAtualizado),
                vigenciaFinal: "2017-01-13T17:09:42.411",
                vigenciaInicial: "2018-01-13T17:09:42.411"
            }
            try{
                await api.put(`funcionario_horario/${funcionarioHorario.id}`, params);
                console.log("deu certo parceiro")
            } catch (error) {
                console.log(error);
            } finally {
                loadFuncionarioHorarios();
                closeModalUpdate();
            }     
        }, [codigoInicialAtualizado, idHorarioAtualizado],
    );

    const removeFuncionarioHorario = useCallback (
        async (id) => {
            try {
                await api.delete(`funcionario_horario/${id}`);
                console.log("apagado com sucesso");
            } catch (error) {
                console.log(error)
            } finally{
                loadFuncionarioHorarios();
                closeModalUpdate();
            }
        }, [loadFuncionarioHorarios]
    )

    const openModalWithData = useCallback(
        async (id) => {
            try {
                const response = await api.get(`funcionario_horario/${id}`);
                setIdHorarioAtualizado(parseInt(response.data.idHorario.id));
                setCodigoInicialAtualizado(parseInt(response.data.codigoInicial));
                setFuncionarioHorario(response.data)
            } catch(error) {
                console.log(error);
            } finally {
                openModalUpdate();
            }
        }, [codigoInicialAtualizado, idHorarioAtualizado],
    );


    useEffect(
        () => {
            loadFuncionarioHorarios(id);
            loadHorarios();
        }, [loadFuncionarioHorarios, loadHorarios],
    )
    return(
        <>
        <h1>Id Funcionário: {id}</h1>

       
        <Container>
            <Row 
            direction="row"
            container>
                <SubTitulo> Relação: Funcionário-Horário </SubTitulo>
                <Button variant="contained" color="primary" onClick={openModal}>Adicionar</Button>
            </Row>
            <TableFH funcionarioHorarios={funcionarioHorarios} handleFuncionarioHorario={openModalWithData} removeFuncionarioHorario={removeFuncionarioHorario} />
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={styleAdicionar}
            contentLabel="Modal"
            >
                <HeaderModal>
                    <h2>Cadastro</h2>
                    {/* <AiOutlineClose onClick={closeModal} /> */}
                </HeaderModal>
                {/* <hr /> */}
            <FormModal>
                <Input 
                    placeholder="Codigo inicial"
                    fullWidth={true}
                    value={codigoInicial}
                    style={inputStyle}
                    onChange={e => setCodigoInicial(e.target.value)}
                    type="number"
                />
                <FormControl className={classes.formControl}>
                        <InputLabel id={idHorario}>Horário</InputLabel>
                        <Select
                        labelId="Horarios"
                        id={idHorario}
                        value={idHorario}
                        onChange={e => setIdHorario(e.target.value)}
                        >
                            {
                                horarios.map(horario => (
                                    <MenuItem value={horario.id}>{horario.codigoHorario}-{horario.descHorario}</MenuItem>
                                )) 
                            }
                        
                        </Select>
                    </FormControl>
                <FooterModal>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={e => handleAddFunionarioHorario(e)}
                    >Adicionar</Button>
                    <Button
                        color="secundary"
                        variant="outlined"
                        onClick={closeModal}
                    >Cancelar</Button>

                    </FooterModal>
            </FormModal>
            </Modal>


                    
            <Modal
            isOpen={modalPutIsOpen}
            onRequestClose={closeModalUpdate}
            contentLabel="Modal"
            style={styleAtualizar}
            >
            <HeaderModal>
            <h2>Atualizar</h2>
            
            </HeaderModal>
            <FormModal>
            <Input 
                    placeholder="Codigo inicial"
                    fullWidth={true}
                    value={codigoInicialAtualizado}
                    style={inputStyle}
                    onChange={e => setCodigoInicialAtualizado(e.target.value)}
                    type="number"
                />
                <FormControl className={classes.formControl}>
                        <InputLabel id={idHorarioAtualizado}>Horário</InputLabel>
                        <Select
                        labelId="Horarios"
                        id={idHorarioAtualizado}
                        value={idHorarioAtualizado}
                        onChange={e => setIdHorarioAtualizado(e.target.value)}
                        >
                            {
                                horarios.map(horario => (
                                    <MenuItem value={horario.id}>{horario.codigoHorario}-{horario.descHorario}</MenuItem>
                                )) 
                            }
                        
                        </Select>
                    </FormControl>
                <FooterModal>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={e => handleUpdateFuncionarioHorario(e)}
                    >Atualizar</Button>

                    <Button
                    color="secundary"
                    variant="outlined"
                    onClick={closeModalUpdate}
                    >Cancelar</Button>
                    </FooterModal>
                </FormModal>
            </Modal>

   
        </Container>
        </>
        
    )
}


export default FuncionarioHorario;