import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';

import Input from '@material-ui/core/Input';

import api from '../../services/api';

import { FormModal, Button, Container, Row, SubTitulo } from './styles';

import { TableH } from '../../components/Table';

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


const HorarioTabela = () => {
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
                closeModalUpdate();
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

    useEffect(
        () => {
            loadHorarios();
        }, [loadHorarios]
    );

    return(
        <>

        <Container>
             <Row 
            direction="row"
            container>
                <SubTitulo> Horários </SubTitulo>
                <Button variant="contained" color="primary" onClick={openModalAdd}>Adicionar</Button>
            </Row>
        </Container>
        <TableH horarios={horarios} handleHorario={openModalWithData}/>

        <Modal
            isOpen={modalPutIsOpen}
            onRequestClose={closeModalUpdate}
            style={customStyles}
            contentLabel="Modal"
            >
    
            <h2>Atualizar</h2>
            <button onClick={closeModalUpdate}>Fechar</button>
            <FormModal>
                <Input 
                    type="number"
                    onChange={e => setCodigoHorarioAtualizado(e.target.value)}
                    value={codigoHorarioAtualizado}
                />
               
                <Input 
                    onChange={e => setDescHorarioAtualizado(e.target.value)}
                    value={descHorarioAtualizado}
                />
                
                <button
                    onClick={e => handleHorario(horario.id, e)}
                >Atualizar</button>
            </FormModal>
            </Modal>

            <Modal
            isOpen={modalAddIsOpen}
            onRequestClose={closeModalAdd}
            style={customStyles}
            contentLabel="Modal"
            >
    
            <h2>Cadastrar</h2>
            <button onClick={closeModalAdd}>Fechar</button>
            <FormModal>
                <Input 
                    type="number"
                    onChange={e => setCodigoHorario(e.target.value)}
                    value={codigoHorario}
                />
               
                <Input 
                    onChange={e => setDescHorario(e.target.value)}
                    value={descHorario}
                />
                
                <button
                    onClick={e => handleAddHorario(e)}
                >Cadastrar</button>
            </FormModal>
            </Modal>
            </>
    );

}

export default HorarioTabela;