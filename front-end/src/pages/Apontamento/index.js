import React, { useState, useEffect, useCallback } from 'react';
import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button, ButtonCancel} from './styles';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import Modal from 'react-modal';

import api from '../../services/api';

import { TableA } from '../../components/Table';


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


const modalStyle = {
    content: {
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


const Apontamento = () => {

    const [ entrada1Atualizada, setEntrada1Atualizada ] = useState('');
    const [ saida1Atualizada, setSaida1Atualizada ] = useState('');
    const [ entrada2Atualizada, setEntrada2Atualizada ] = useState('');
    const [ saida2Atualizada, setSaida2Atualizada ] = useState('');
    const [modalPutIsOpen, setModalPutIsOpen] = useState(false);
    const [apontamentos, setApontamentos] = useState([]);

    function openModalUpdate() {
        setModalPutIsOpen(true);
      }
      
      function closeModalUpdate(){
        setModalPutIsOpen(false);
      }

    const openModalWithData = useCallback(
        async (id) => {
            try {
                const response = await api.get(`apontamento/${id}`);
                const apontamento = response.data;
                setEntrada1Atualizada(apontamento.entrada1);
                setSaida1Atualizada(apontamento.saida1);
                setEntrada2Atualizada(apontamento.entrada2);
                setSaida2Atualizada(apontamento.saida2);
            } catch(error) {
                console.log(error);
            } finally {
                openModalUpdate();
            }
        }, [entrada1Atualizada, saida1Atualizada, entrada2Atualizada, saida2Atualizada],
    )
    
    const handleUpdateApontamento = useCallback(
        async (e) => {
            e.preventDefault();

            if(!entrada1Atualizada || !saida1Atualizada || !entrada2Atualizada || !entrada2Atualizada){
                alert("Por favor, preencha todos os campos");
                return;
            }

            const paramsUpdated = {
                entrada1: entrada1Atualizada,
                saida1: saida1Atualizada,
                entrada2: entrada1Atualizada,
                saida2: saida2Atualizada
            }

            try{
                await api.put(`apontamento/${apontamentos.id}`, paramsUpdated);
                console.log(paramsUpdated);
            } catch(error){
                console.log(error.response.data);

            } finally {
                closeModalUpdate();
                loadApontamentos();
            }
            
        }, [entrada1Atualizada, saida1Atualizada, entrada2Atualizada, saida2Atualizada],
        )


    const loadApontamentos = useCallback (
        async () => {
            try {
                const response = await api.get('apontamento');
                setApontamentos(response.data);
                console.log(response.data);
                response.data.map(apontamento => console.log(apontamento))
            } catch (error) {
                console.log(error);
            }
        }, []
    )

    useEffect(
        () => {
            loadApontamentos();
        }, [loadApontamentos]
    )

    return(
        <Container>
            <Row>
                <SubTitulo>
                    Apontamentos
                </SubTitulo>
            </Row>

        <TableA apontamentos={apontamentos} handleApontamento={openModalWithData} />
        
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
                        <InputMask
                            placeholder="Entrada"
                            mask="00:00:00"
                            label="Entrada"
                            id={entrada1Atualizada}
                            value={entrada1Atualizada}
                            style={inputStyle.horario}
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEntrada1Atualizada(e.target.value)}
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </InputMask>
                        
                        
                        <InputMask
                            placeholder="Almoço"
                            mask="00:00:00"
                            id={saida1Atualizada}
                            value={saida1Atualizada}
                            style={inputStyle.horario}
                            label="Almoço"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSaida1Atualizada(e.target.value)}
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </InputMask>
                            
                        
                        
                        <InputMask
                            placeholder="Retorno"
                            mask="00:00:00"
                            style={inputStyle.horario}
                            label="Retorno"
                            InputLabelProps={{ shrink: true }}
                            id={entrada2Atualizada}
                            value={entrada2Atualizada}
                            onChange={e => setEntrada2Atualizada(e.target.value)}                       
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </InputMask>
                       
                
                        
                    
                        <InputMask
                            placeholder="Saida"
                            mask="00:00:00"
                            style={inputStyle.horario}
                            label="Saída"
                            InputLabelProps={{ shrink: true }}
                            id={saida2Atualizada}
                            value={saida2Atualizada}
                            onChange={e => setSaida2Atualizada(e.target.value)}
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </InputMask>
                           
                        
                    </ContainerInputs>
                </FormModal>
                    <FooterModal>
                        <Button
                            onClick={e => handleUpdateApontamento(e)}
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

export default Apontamento;