import React, { useState, useEffect, useCallback } from 'react';
import Modal from 'react-modal';
import api from '../../services/api';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { TableHD } from '../../components/Table';
import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss';
import { FormModal, Button, Container, Row, SubTitulo, HeaderModal, FooterModal, InputContainer, ButtonCancel, inputStyle, modalStyleAdicionar, modalStyleAtualizar} from './styles';
  
const HorarioDetalhes = ({ location }) => {

    const id = location.state.id;
    const horarioSubtitulo = location.state.descHorario;

    const [ListHorarioDetalhes, setListHorarioDetalhes] = useState([]);
    const [folga, setFolga] = useState(false);
    const [entrada1, setEntrada1] = useState('');
    const [entrada2, setEntrada2] = useState('');
    const [saida1, setSaida1] = useState('');
    const [saida2, setSaida2] = useState('');
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
            swal("Atenção", "Não foi possível carregar os dados", "error");
        }
    }, [id],
    );

    const handleAddHorarioDetalhe = useCallback(
        async (e) => {
            e.preventDefault();

            if(parseInt(codigoDia) > 31) {
                swal("Atenção", "Por favor verifique os dados, não há um mês que passe do dia 31", "warning");
                closeModalAdd();
                return;
            }
            if(!folga){
                if(!entrada1 || !saida1 || !entrada2 || !saida2 || !codigoDia){
                swal("Atenção", "Por favor, preencha todos os campos", "warning");
                return;
                }
            }
            if(
                entrada1.getTime() >= saida1.getTime() ||
                entrada1.getTime() >= entrada2.getTime() ||
                entrada1.getTime() >= saida2.getTime() ||
                saida1.getTime() >= entrada2.getTime() ||
                saida1.getTime() >= saida2.getTime() ||
                entrada2.getTime() >= saida2.getTime()
            ) {
                swal("Atenção", "Verifique a ordem dos horários", "warning");
                return;
            }

            const params = { 
                horario: id,
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
                swal("Atenção", error.response.data, "error");
            } finally{
                loadHorarioDetahes();
                setCodigoDia(ultimo + 1);
                closeModalAdd();
                setEntrada1('');
                setEntrada2('');
                setSaida1('');
                setSaida2('');
                setFolga(false);
                closeModalAdd();
            }
        }, [codigoDia, folga, entrada1, saida1, entrada2, saida2, id, loadHorarioDetahes, ultimo]
    );

    const removeHorarioDetalhe = useCallback(
        async (id) => {
            try {
                await api.delete(`horario_detalhes/${id}`);
                console.log('Sucess, Delete');
                swal("Sucesso", "Relação removida com sucesso", "sucess");
            } catch (error) {
                swal("Atenção", "Não foi possível remover a relação", "error");
            } finally {
                loadHorarioDetahes();
            }
        }, [loadHorarioDetahes],
    )

    const handleHorarioDetalhe = useCallback(
        async (horario, e) => {
            e.preventDefault();
            if(parseInt(codigoDia) > 31){
                swal("Atenção", "Por favor verifique os dados, não há um mês que passe do dia 31", "warning");
                closeModalAdd();
                return;
            }
            if(!folgaAtualizado) {
                if(!entrada1Atualizado || !saida1Atualizado || !entrada2Atualizado || !saida2Atualizado || !codigoDiaAtualizado){
                    swal("Atenção", "Por favor, preencha todos os campos", "warning");
                return;
                }
            }

            if(
                entrada1Atualizado.getTime() >= saida1Atualizado.getTime() ||
                entrada1Atualizado.getTime() >= entrada2Atualizado.getTime() ||
                entrada1Atualizado.getTime() >= saida2Atualizado.getTime() ||
                saida1Atualizado.getTime() >= entrada2Atualizado.getTime() ||
                saida1Atualizado.getTime() >= saida2Atualizado.getTime() ||
                entrada2Atualizado.getTime() >= saida2Atualizado.getTime()
            ) {
                swal("Atenção", "Verifique a ordem dos horários", "warning");
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
        }, [codigoDia, folgaAtualizado, entrada1Atualizado, saida1Atualizado, entrada2Atualizado, saida2Atualizado, codigoDiaAtualizado, loadHorarioDetahes],
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
                container
            >
                <SubTitulo> {horarioSubtitulo} </SubTitulo>
                <Button onClick={openModalAdd}>Adicionar</Button>
            </Row>
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
                            label="Entrada"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEntrada1Atualizado(e.target.value)}
                            value={entrada1Atualizado}
                        />
                        <TextField 
                            style={inputStyle.horarioUp}
                            label="Almoço"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSaida1Atualizado(e.target.value)}
                            value={saida1Atualizado}
                        />
                    
                        <TextField 
                            style={inputStyle.horarioUp}
                            label="Retorno"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setEntrada2Atualizado(e.target.value)}
                            value={entrada2Atualizado}
                        />
                        <TextField
                            style={inputStyle.horarioUp}
                            label="Saída"
                            InputLabelProps={{ shrink: true }}
                            onChange={e => setSaida2Atualizado(e.target.value)} 
                            value={saida2Atualizado}
                        />
                    </InputContainer>
                    <InputContainer>
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
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleHorarioDetalhe(horarioDetalhe.id, e)}
                    >Atualizar</Button>
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
                            label="Entrada"
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
                            label="Almoço"
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
                            label="Retorno"
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
                            label="Saída"
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
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleAddHorarioDetalhe(e)}
                    >
                        Adicionar
                    </Button>
                    <ButtonCancel
                        onClick={closeModalAdd}
                    >
                        Cancelar
                    </ButtonCancel>
                </FooterModal>
            </Modal>
            <TableHD horarioDetalhes={ListHorarioDetalhes} removeHorarioDetalhe = {removeHorarioDetalhe} handleHorarioDetalhes={openModalWithData}/>
        </Container>
    )

}

export default HorarioDetalhes;