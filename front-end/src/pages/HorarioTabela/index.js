import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { useHistory } from 'react-router-dom';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import api from '../../services/api';
import { FormModal, Button, Container, Row, SubTitulo, FooterModal, HeaderModal, InputContainer, ButtonCancel } from './styles';
import { TableH } from '../../components/Table';

import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss';

const customStyles = {
    content : {
        width               : '520px',
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
        width: '70px',
        height: '100%',
        marginRight: '10px'
    }, 
    descHorario: { 
        width: '300px',
        height: '100%',
        marginRight: '10px'
    }
};



const HorarioTabela = () => {
    const history = useHistory();
    const [horarios, setHorarios] = useState([]);
    const [horario, setHorario] = useState({});
    const [codigoHorario, setCodigoHorario] = useState('');
    const [descHorario, setDescHorario] = useState('');
    const [codigoHorarioAtualizado, setCodigoHorarioAtualizado] = useState('');
    const [descHorarioAtualizado, setDescHorarioAtualizado] = useState('');
    const [modalPutIsOpen, setModalaPutIsOpen] = useState(false);
    const [modalAddIsOpen, setModalAddIsOpen] = useState(false);

    const closeModalUpdate = () => {
        setModalaPutIsOpen(false);
    }

    const openModalAdd = () => {
        setModalAddIsOpen(true);
    }

    const closeModalAdd = () => {
        setModalAddIsOpen(false);
    }
    const openModalWithData = useCallback (
        async (id) => {
            try{
                const response = await api.get(`horario/${id}`);
                setCodigoHorarioAtualizado(response.data.codigoHorario);
                setDescHorarioAtualizado(response.data.descHorario);
                setHorario(response.data);
                setModalaPutIsOpen(true);
            } catch (error) {
                console.log(error);
            }
        }, [],
        );
    const loadHorarios = useCallback(
        async () => {
            try{
                const response = await api.get('horario');
                console.log(response.data);
                setHorarios(response.data)
            } catch (error) {
                console.log(error);
            }
        }, []
    );

    const handleAddHorario = useCallback(
        async (e) => {
            e.preventDefault();
            const params = {
                codigoHorario,
                descHorario
            }
            try {
                await api.post('horario', params);
                console.log("sucess, Horario post");
            } catch (error) {
                console.log(error)
            } finally {
                loadHorarios();
                closeModalAdd();
            }
        }, [
            codigoHorario,
            descHorario,
            loadHorarios
        ]
    )

    const handleHorario = useCallback(
        async (id, e) => {
            e.preventDefault();
            const params = {
                codigoHorario: codigoHorarioAtualizado,
                descHorario: descHorarioAtualizado
            }
            try {
                await api.put(`horario/${id}`, params);
                console.log('Sucess, Update');
            } catch (error) {
                
            } finally {
                loadHorarios();
                closeModalUpdate();
            }
        }, [
            codigoHorarioAtualizado,
            descHorarioAtualizado,
            loadHorarios
        ]
    )
    
    const removeHorario = async (id) => {
        try {
            const response = await api.delete(`horario/${id}`);
            console.log(response.data);
            swal("Ação realizada com sucesso!", "Horário removido.", "succes");
        } catch (error) {
            console.log(error);
            swal("Ação não permitida!", error.response.data.replaceAll("_", " "), "error");
        } finally {
            loadHorarios();
        }
    }

    useEffect(
        () => {
            loadHorarios();
        }, [loadHorarios]
    );

    return(
        <Container>
            <Row 
            direction="row"
            container>
                <SubTitulo> Horários </SubTitulo>
                <Button onClick={openModalAdd}>Adicionar</Button>
            </Row>
            <TableH horarios={horarios} handleHorario={openModalWithData} removeHorario={removeHorario}/>

            <Modal
                isOpen={modalPutIsOpen}
                onRequestClose={closeModalUpdate}
                style={customStyles}
                contentLabel="Modal"
            >
                    
                <HeaderModal>
                <h2>Atualizar</h2>
                </HeaderModal>
                <FormModal>
                    <TextField
                        style={inputStyle.codigo}
                        type="number"
                        label="Código"
                        InputProps={{ inputProps: { min: 1} }}
                        InputLabelProps={{ shrink: true }}
                        onChange={e => setCodigoHorarioAtualizado(e.target.value)}
                        value={codigoHorarioAtualizado}
                    />
                
                    <TextField  
                        label="Descrição"
                        style={inputStyle.descHorario}
                        InputLabelProps={{ shrink: true }}
                        onChange={e => setDescHorarioAtualizado(e.target.value)}
                        value={descHorarioAtualizado}
                    />
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleHorario(horario.id, e)}
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

            <Modal
                isOpen={modalAddIsOpen}
                onRequestClose={closeModalAdd}
                style={customStyles}
                contentLabel="Modal"
            >
                <HeaderModal>
                    <h2>Cadastrar Horário</h2>
                </HeaderModal>
                <FormModal>         
                    <TextField
                        type="number"
                        label="Código"
                        style={inputStyle.codigo}
                        InputProps={{ inputProps: { min: 1} }}
                        InputLabelProps={{ shrink: true }}
                        onChange={e => setCodigoHorario(e.target.value)}
                        value={codigoHorario}
                    />
                
                    <TextField
                        label="Descrição"
                        style={inputStyle.descHorario}
                        InputLabelProps={{ shrink: true }}
                        onChange={e => setDescHorario(e.target.value)}
                        value={descHorario}
                    />
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleAddHorario(e)}
                    >Salvar</Button>
                     <ButtonCancel
                    onClick={closeModalAdd}
                     >
                         Cancelar
                     </ButtonCancel>
                </FooterModal>
            </Modal>
        </Container>
    );

}

export default HorarioTabela;