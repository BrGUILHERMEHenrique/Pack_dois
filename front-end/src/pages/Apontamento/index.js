import React, { useState, useEffect, useCallback } from 'react';
import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button, ButtonCancel, InputRow, SearchContainer, InputMonth} from './styles';
import InputMask from 'react-input-mask';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import MaterialInput from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from 'react-modal';
import api from '../../services/api';
import { jsPDF } from "jspdf";
import { TableA } from '../../components/Table';
import Input from '@material-ui/core/Input';

import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss';

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
    empresa: {
        width: '240px',
        maxWidth: '240px',
        height: '100%',
        fontFamily: 'Oxanium, cursive'
    },
    funcionario: {
        width: '240px',
        maxWidth: '240px',
        height: '100%',
        fontFamily: 'Oxanium, cursive'
    },
    data: {
        width: '240px',
        maxWidth: '240px',
        marginTop: '100px',
        height: '100%'
    },
    label: {
        fontFamily: 'Oxanium, cursive'
    }
    
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
    const [ idFuncionario, setIdFuncionario] = useState('');
    const [ modalPutIsOpen, setModalPutIsOpen] = useState(false);
    const [ apontamentos, setApontamentos] = useState([]);
    const [ apontamentosFiltrados, setApontamentosFiltrados] = useState([]);
    const [ listaFuncionarios, setListaFuncionarios] = useState([]);
    const [ listaEmpresas, setListaEmpresas] = useState([]);
    const [ apontamento, setApontamento ] = useState({});
    const [ dataInicio, setDataInicio ] = useState(new Date());
    const [ dataFim, setDataFim ] = useState(new Date());

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
                setApontamento(apontamento);
                setEntrada1Atualizada(apontamento.entrada1);
                setSaida1Atualizada(apontamento.saida1);
                setEntrada2Atualizada(apontamento.entrada2);
                setSaida2Atualizada(apontamento.saida2);
            } catch(error) {
                swal("Atenção", "Apontamento não encontrado", "error");
            } finally {
                openModalUpdate();
            }
        }, [entrada1Atualizada, saida1Atualizada, entrada2Atualizada, saida2Atualizada],
    )


    const getByFuncionarioAndMes =
        async (data1, data2) => {  
            
            setApontamentosFiltrados([]);

            const dataInicial = new Date(data1.getFullYear(), data1.getMonth(), 1);
            setDataInicio(dataInicial)
            console.log(dataInicial)

            const dataFinal = new Date(data2.getFullYear(), data2.getMonth() + 1, 0);
            setDataFim(dataFinal)
            console.log(dataFinal)

            const params = {
                idFuncionario: idFuncionario,
                dataInicial: dataInicial,
                dataFinal: dataFinal
            }
            try {
                const response = await api.post(`apontamento/totalDays`, params);
                setApontamentosFiltrados(response.data);
                console.log(response.data)
                console.log(params)
            } catch(error) {
                swal("Atenção", "Nenhum dado retornado", "error");
            } finally {
                
            }
        }

    const loadFuncionarios = 
        async (id) => {
            try {
                const response = await api.get(`funcionario/empresa/${id}`);
                console.log("funcionou " + response.data);
                setListaFuncionarios(response.data);
            } catch(error) {
                swal("Anteção", "funcionários não encontrados", "error");
            }
        }
    
    const handleUpdateApontamento = useCallback(
        async (e) => {
            e.preventDefault();
            if(!entrada1Atualizada || !saida1Atualizada || !entrada2Atualizada || !entrada2Atualizada){
                swal("Atenção", "Por favor, preencha todos os campos", "warning");
                return;
            }
            const paramsUpdated = {
                entrada1: entrada1Atualizada,
                saida1: saida1Atualizada,
                entrada2: entrada2Atualizada,
                saida2: saida2Atualizada
            }
            try{
                await api.put(`apontamento/${apontamento.id}`, paramsUpdated);
                console.log(paramsUpdated);
            } catch(error){
                console.log(error.response.data);

                swal("Anteção", "Apontamento não encontrado", "error");
            } finally {
                getByFuncionarioAndMes(dataInicio, dataFim);
                closeModalUpdate();
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
                swal("Anteção", "Não foi possível carregar os apontamentos", "error");
            }
        }, []
    )


    const loadEmpresas = useCallback(
        async () => {
            try{
                const response = await api.get('empresa');
                console.log("aqui, tio" + response.data);
                setListaEmpresas(response.data);
            }catch(error){
                swal("Atenção", "Impossível carregar as empresas", "error");
            }
        }, [],
    );

    useEffect(
        () => {
            loadEmpresas();
        }, [loadEmpresas]
    )

    useEffect(
        () => {
            loadApontamentos();
        }, [loadApontamentos]
    )



    function criadorPDF() {
        const doc = new jsPDF('landscape');
        const colunas = ["Data","Entrada", "Almoço", "Retorno", "Saída", "Total", "Horas Extras", "Atrasos"];
        const linhas = [];
        
        var nome = apontamentosFiltrados[0].funcionario.nome + " (" + apontamentosFiltrados[0].funcionario.pis + ") - " + dataInicio.getMonth() + "/" + dataInicio.getFullYear();
        
        apontamentosFiltrados.forEach(apont => { 
            var valores = [apont.data, apont.entrada1, apont.saida1,
                apont.entrada2, apont.saida2, apont.totalTrabalhado,
                apont.saldoHe, apont.saldoAtraso];
            linhas.push(valores);
        });   

        doc.setFontSize(10);
        doc.text(15, 5, nome, {styles: { 
            fontSize: 10 
        }});

        doc.autoTable(colunas, linhas, { startY: 7, headStyles: {fillColor: '#942a37'},  styles: { 
            fontSize: 5 
         }}
        );
        doc.save(nome);
    }


    return(
        <Container>
            <Row container direction="row">
                <SubTitulo>
                    Apontamentos
                </SubTitulo>
                <Button 
                    disabled={ !(apontamentosFiltrados.length != 0) ? true : false }
                    onClick={criadorPDF}
                > 
                    Gerar PDF
                </Button>  
            <InputRow container direction='row'>
                <SearchContainer>
                    <InputLabel style={inputStyle.label} id="Empresa" shrink>Empresa</InputLabel>
                    <Select
                        style={inputStyle.empresa}
                        labelId="Empresa"
                        MenuProps={{ style: {maxWidth: '400px', maxHeight: '400px'}  }}
                        onChange={e => loadFuncionarios(e.target.value)}
                    >
                        {
                            listaEmpresas.map(empresa => (
                                <MenuItem
                                    style={{fontFamily: 'Oxanium, cursive'}}
                                    value={empresa.id}
                                >
                                    {empresa.razaoSocial}
                                </MenuItem>
                            ))                                
                        }
                    </Select>
                </SearchContainer>
                <SearchContainer>
                    <InputLabel style={inputStyle.label} id="Funcionario"shrink>Funcionário</InputLabel>
                    <Select
                        style={inputStyle.funcionario}
                        labelId="Funcionario"
                        value={idFuncionario}
                        MenuProps={{ style: {maxWidth: '400px', maxHeight: '400px'}  }}
                        onChange={e => setIdFuncionario(e.target.value)}
                    >
                        {
                            listaFuncionarios.map(funcionario => (
                                <MenuItem  
                                    style={{fontFamily: 'Oxanium, cursive'}}
                                    value={funcionario.id}
                                >
                                    {funcionario.nome}
                                </MenuItem>
                            ))                                
                        }
                    </Select>
               </SearchContainer>
                
               { 
               !!idFuncionario &&
                    <SearchContainer>
                        <InputLabel style={inputStyle.label} id="data" shrink>Vigência</InputLabel>
                        <InputMonth
                            labelId="data"
                            type="month" 
                            onChange={e => 
                                getByFuncionarioAndMes(new Date(e.target.value.split("-")),  
                                new Date(e.target.value.split("-")))
                            }  
                        />
                    </SearchContainer>
                }
                </InputRow>
            </Row>

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
                            placeholder="Entrada"
                            mask="00:00:00"
                            label="Entrada"
                            id={entrada1Atualizada}
                            value={entrada1Atualizada}
                            style={inputStyle.horario}
                            InputLabelProps={{ shrink: true }}
                            inputProps={{maxLength: 8, minLength: 8}}
                            onChange={e => setEntrada1Atualizada(e.target.value)}
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </TextField>
                        
                        <TextField
                            placeholder="Almoço"
                            mask="00:00:00"
                            id={saida1Atualizada}
                            value={saida1Atualizada}
                            style={inputStyle.horario}
                            label="Almoço"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{maxLength: 8, minLength: 8}}
                            onChange={e => setSaida1Atualizada(e.target.value)}
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </TextField>
                        
                        <TextField
                            placeholder="Retorno"
                            mask="00:00:00"
                            style={inputStyle.horario}
                            label="Retorno"
                            InputLabelProps={{ shrink: true }}
                            id={entrada2Atualizada}
                            value={entrada2Atualizada}
                            inputProps={{maxLength: 8, minLength: 8}}
                            onChange={e => setEntrada2Atualizada(e.target.value)}                       
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </TextField>

                        <TextField
                            placeholder="Saida"
                            inputProps={{maxLength: 8, minLength: 8}}
                            style={inputStyle.horario}
                            label="Saída"
                            InputLabelProps={{ shrink: true }}
                            id={saida2Atualizada}
                            value={saida2Atualizada}
                            onChange={e => setSaida2Atualizada(e.target.value)}
                        >
                            {(inputProps) => <MaterialInput {...inputProps} type="tel" />}
                        </TextField>   
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
            
            <TableA apontamentos={apontamentosFiltrados} handleApontamento={openModalWithData} />
            
        </Container>
    )
    
}

export default Apontamento;