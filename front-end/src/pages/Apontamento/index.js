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
        height: '100%'
    },
    funcionario: {
        width: '240px',
        maxWidth: '240px',
        height: '100%'
    },
    data: {
        width: '240px',
        maxWidth: '240px',
        marginTop: '100px',
        height: '100%'
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
    const [modalPutIsOpen, setModalPutIsOpen] = useState(false);
    const [apontamentos, setApontamentos] = useState([]);
    const [apontamentosFiltrados, setApontamentosFiltrados] = useState([]);
    const [listaFuncionarios, setListaFuncionarios] = useState([]);
    const [listaEmpresas, setListaEmpresas] = useState([]);

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
                setEntrada1Atualizada(response.data.entrada1);
                setSaida1Atualizada(response.data.saida1);
                setEntrada2Atualizada(response.data.entrada2);
                setSaida2Atualizada(response.data.saida2);
            } catch(error) {
                alert(error);
            } finally {
                openModalUpdate();
            }
        }, [entrada1Atualizada, saida1Atualizada, entrada2Atualizada, saida2Atualizada],
    )


    const getByFuncionarioAndMes =
        async (data1, data2) => {        

            const dataInicial = new Date(data1.getFullYear(), data1.getMonth(), 1);
            console.log(dataInicial)

            const dataFinal = new Date(data2.getFullYear(), data2.getMonth() + 1, 0);
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
                console.log(error);
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
                console.log(error);
            } finally {
                
            }
        }
    
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
                console.log(error);
            } finally {
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
            } catch (error) {
                console.log(error);
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
                console.log(error);
            }
        }, [],
    );

    useEffect(
        () => {
            loadEmpresas();
        }, [loadEmpresas]
    )



    function criadorPDF() {
        const doc = new jsPDF('landscape');
        const colunas = ["Data","Entrada", "Almoço", "Retorno", "Saída", "Total", "Horas Extras", "Atrasos"];
        const linhas = [];
        
        var nome;
        
        apontamentosFiltrados.forEach(apont => {  
            nome = apont.funcionario.nome
            var valores = [apont.data, apont.entrada1, apont.saida1,
                apont.entrada2, apont.saida2, apont.totalTrabalhado,
                apont.saldoHe, apont.saldoAtraso];
            linhas.push(valores);
        });   

        doc.text(10, 10, nome);

        doc.autoTable(colunas, linhas, { startY: 30, headStyles: {fillColor: '#942a37'} }
        );
        doc.save('Test.pdf');
    }


    return(
        <Container>
            <Row container direction="row">
                <SubTitulo>
                    Apontamentos
                </SubTitulo>

                <Button 
                disabled={
                    !(apontamentosFiltrados.length != 0) ? 
                    true 
                    : 
                    false}
                onClick={criadorPDF}> 
                Gerar PDF
                </Button> 

                
            <InputRow container direction='row'>
                <SearchContainer>
                    <InputLabel id="Empresa" shrink>Empresa</InputLabel>
                    <Select
                        style={inputStyle.empresa}
                        labelId="Empresa"
                        MenuProps={{ style: {maxWidth: '400px', maxHeight: '400px'}  }}
                        onChange={e => loadFuncionarios(e.target.value)}
                    >
                        {
                            listaEmpresas.map(empresa => (
                                <MenuItem value={empresa.id}>{empresa.razaoSocial}</MenuItem>
                            ))                                
                        }
                    </Select>
                </SearchContainer>
                <SearchContainer>
                    <InputLabel id="Funcionario"shrink>Funcionário</InputLabel>
                    <Select
                        style={inputStyle.funcionario}
                        labelId="Funcionario"
                        value={idFuncionario}
                        MenuProps={{ style: {maxWidth: '400px', maxHeight: '400px'}  }}
                        onChange={e => setIdFuncionario(e.target.value)}
                    >
                        {
                            listaFuncionarios.map(funcionario => (
                                <MenuItem  value={funcionario.id}>{funcionario.nome}</MenuItem>
                            ))                                
                        }
                    </Select>
               </SearchContainer>

               { 
               !!idFuncionario &&
                    <InputMonth
                        style={
                            {
                            width: '180px', 
                            outline: 'none', 
                            border: "none",
                            borderBottom: "solid 0.5px grey" 
                            }
                        }
                        type="month" 
                        onChange={e => 
                            getByFuncionarioAndMes(new Date(e.target.value.split("-")),  
                            new Date(e.target.value.split("-")))
                        }  
                    />
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
            
            <TableA apontamentos={apontamentosFiltrados} handleApontamento={openModalWithData} />
            
        </Container>
    )
    
}

export default Apontamento;