import React, { useCallback, useEffect, useState } from 'react';

import Modal from 'react-modal';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { TextField }from '@material-ui/core';
import InputMask from 'react-input-mask';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import api from '../../services/api';
import { TableFH } from '../../components/Table';
import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button, ButtonCancel } from './styles';

const modalStyle = {
    content : {
        width               : '550px',
        height              : '300px',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
  };

  const inputStyle = {

    codigo: { 
        width: '98px',
        height: '100%',
        marginRight: '10px'
    }, 
    horario: { 
        width: '15vw',
        height: '100%',
        marginRight: '10px'
    }
};


const FuncionarioHorario = ({ location }) => {
    const id = location.state.id;
    
    const [funcionarioHorarios, setFuncionarioHorarios] = useState([]);
    const [funcionarioHorario, setFuncionarioHorario] = useState({});
    const [horarios, setHorarios] = useState([]);
    const [codigoInicial, setCodigoInicial] = useState('');
    const [idHorario, setIdHorario] = useState(Number);
    const [codigoInicialAtualizado, setCodigoInicialAtualizado] = useState('');
    const [vigenciaInicial, setVigenciaInicial] = useState('');
    const [vigenciaFinal, setVigenciaFinal] = useState('');
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

            if(!parseInt(idHorario) || !vigenciaInicial || !vigenciaFinal|| !parseInt(codigoInicial)){
                alert("Por favor, preencha todos os campos");
                return;
            }

            const params = {
                codigoInicial: parseInt(codigoInicial),
                idFuncionario : id,
                idHorario: parseInt(idHorario),
                vigenciaFinal: vigenciaFinal,
                vigenciaInicial: vigenciaInicial
            }
            console.log(params);
            try {
                await api.post('funcionario_horario', params);
            } catch (error) {
                alert(error);
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
                vigenciaFinal: vigenciaFinal,
                vigenciaInicial: vigenciaInicial
            }
            try{
                await api.put(`funcionario_horario/${funcionarioHorario.id}`, params);
                console.log("deu certo parceiro")
            } catch (error) {
                alert(error);
            } finally {
                loadFuncionarioHorarios();
                closeModalUpdate();
            }     
        }, [codigoInicialAtualizado, idHorarioAtualizado, vigenciaInicial, vigenciaFinal],
    );

    const removeFuncionarioHorario = useCallback (
        async (id) => {
            try {
                await api.delete(`funcionario_horario/${id}`);
                console.log("apagado com sucesso");
            } catch (error) {
                alert(error)
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
        <Container>
            <Row 
            direction="row"
            container>
                <SubTitulo> Horários do Funcionário</SubTitulo>
                <Button onClick={openModal}>Adicionar</Button>
            </Row>
            <TableFH funcionarioHorarios={funcionarioHorarios} handleFuncionarioHorario={openModalWithData} removeFuncionarioHorario={removeFuncionarioHorario} />
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
                contentLabel="Modal"
            >
                <HeaderModal>
                    <h2>Cadastro</h2>
                </HeaderModal>
                <FormModal>
                    <ContainerInputs>
                        <TextField
                            label="Codigo inicial"
                            fullWidth={true}
                            value={codigoInicial}
                            style={inputStyle.codigo}
                            InputLabelProps={{ shrink: true }}
                            InputProps={{ inputProps: { min: 1} }}
                            onChange={e => setCodigoInicial(e.target.value)}
                            type="number"
                        />
                        <TextField
                            select
                            label="Horário"
                            labelId="Horarios"
                            id={idHorario}
                            value={idHorario}
                            style={inputStyle.horario}
                            InputProps={{ inputProps: { min: 1} }}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setIdHorario(e.target.value)}
                        >
                            {
                                horarios.map(horario => (
                                    <MenuItem value={horario.id}>{horario.codigoHorario}-{horario.descHorario}</MenuItem>
                                )) 
                            }
                        
                        </TextField>
                        <Input
                            id="date"
                            label="Vigência Inicial"
                            value={vigenciaInicial}
                            style={inputStyle.codigo}
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setVigenciaInicial(e.target.value)}
                        />
                        <Input
                            id="date"
                            type="date"
                            label="Vigência Final"
                            value={vigenciaFinal}
                            style={inputStyle.codigo}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setVigenciaFinal(e.target.value)}
                        />
                    </ContainerInputs>
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleAddFunionarioHorario(e)}
                    >
                        Salvar
                    </Button>
                    <ButtonCancel
                        onClick={closeModal}
                    >
                        Cancelar
                    </ButtonCancel>

                    </FooterModal>
            </Modal>

            <Modal
                isOpen={modalPutIsOpen}
                onRequestClose={closeModalUpdate}
                contentLabel="Modal"
                style={modalStyle}
            >
                <HeaderModal>
                    <h2>Atualizar</h2>
                </HeaderModal>
                <FormModal>
                <ContainerInputs>
                    <TextField
                        label="Codigo inicial"
                        style={inputStyle.codigo}
                        fullWidth={true}
                        value={codigoInicialAtualizado}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: 1} }}
                        onChange={e => setCodigoInicialAtualizado(e.target.value)}
                        type="number"
                    />
                    
                        {/* <InputLabel id={idHorarioAtualizado}>Horário</InputLabel> */}
                        <TextField
                            select
                            labelId="Horarios"
                            label="Horário"
                            style={inputStyle.horario}
                            id={idHorarioAtualizado}
                            value={idHorarioAtualizado}
                            InputProps={{ inputProps: { min: 1} }}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setIdHorarioAtualizado(e.target.value)}
                        >
                            {
                                horarios.map(horario => (
                                    <MenuItem value={horario.id}>{horario.codigoHorario}-{horario.descHorario}</MenuItem>
                                )) 
                            }
                        </TextField>
                    </ContainerInputs>
                        </FormModal>
                    <FooterModal>
                        <Button
                            onClick={e => handleUpdateFuncionarioHorario(e)}
                        >
                            Salvar
                        </Button>
                        <ButtonCancel
                            onClick={closeModalUpdate}
                        >
                            Cancelar
                        </ButtonCancel>
                    </FooterModal>
            </Modal>

   
        </Container>
        
    )
}


export default FuncionarioHorario;