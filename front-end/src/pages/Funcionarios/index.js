import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ValidaPIS from '../../components/ValidaPis'
import Select from '@material-ui/core/Select';
import autoTable from 'jspdf-autotable'
import Input from '@material-ui/core/Input';
import { jsPDF } from "jspdf";

import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss';

//imports de dentro do diretório do projeto
import { TableF } from '../../components/Table';

import api from '../../services/api';

import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button, ButtonCancel, SearchContainer } from './styles';

const inputStyle = {
    nome: {
        width: '450px',
        height: '64%',
    },
    matricula: {
        width: '100%',
        height: '100%',
        marginTop: '19px',
        marginRight: '10px'
    },
    cpf: {
        width: '25%',
        height: '25%',
        marginTop: '3%', 
        marginRight: '10px'

    }, 
    data: {
        width: '30%',
        height: '30%',
        marginTop: '3%',
        marginRight: '10px'
    },
    tel: {
        width: '25%',
        height: '25%',
        marginTop: '3%'
        
    },
    empresa: {
        width: '100%',
        height: '100%',
        marginTop: '3px'
    },
    dataUp: {
        width: '149px',
        height: '50%',
        marginRight: '10px',
        marginTop: '10px'
    },
    telUp: {
        width: '135px',
        height: '50%',
        marginTop: '10px'
    },
    nomeUp: {
        width: '364px',
        height: '55%',
    },
    label: {
        fontFamily: 'Oxanium, cursive'
    }
};

const modalStyleAtualizar = {
    content: {
        width               : '480px',
        height              : '320px',
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
        width               : '580px',
        height              : '390px',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
}

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const Funcionarios = () => {

    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionario, setFuncionario] = useState({});
    const [idEmpresa, setIdEmpresa] = useState(Number);
    const [modalIsOpen,setIsOpen] = useState(false);
    const [modalPutIsOpen, setModalPutIsOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [pis, setPis] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [listaEmpresas, setListaEmpresas] = useState([]);
    const [nomeAtualizado, setNomeAtualizado] = useState('');
    const [dataNascimentoAtualizado, setDataNascimentoAtualizado] = useState('');
    const [telefoneAtualizado, setTelefoneAtualizado] = useState('');

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

    const loadFuncionarios = useCallback(
        async (idEmpresa) => {
            try{
                const response = await api.get(`funcionario/empresa/${idEmpresa}`);
                console.log(response.data);
                setFuncionarios(response.data);
            }catch(error){
                console.log(error);
            }
        }, [idEmpresa],
    );

    const loadEmpresas = useCallback(
        async () => {
            try{
                const response = await api.get('empresa');
                console.log(response.data);
                setListaEmpresas(response.data);
            }catch(error){
                console.log(error);
            }
        }, [],
    );
    
    const handleAddFuncionario = useCallback(
        async (e) => {
            e.preventDefault();

            if(!nome || !pis || !cpf.replace(/\D/g, '') || !dataNascimento.replace(/\D/g, '') || !telefone.replace(/\D/g, '') || !empresa){
                alert("Por favor, preencha todos os campos");
                return;
            }

            if(!cpfValidator.isValid(cpf)){ 
                alert('O CPF informado é inválido');
                return;
            }
            if(!ValidaPIS(pis)){ 
                alert('O matricula informado é inválido');
                return;
            }
            const params = {
                nome: nome,
                idEmpresa: empresa.id,
                pis: pis.replace(/\D/g, ''),
                cpf: cpf.replace(/\D/g, ''),
                dataNascimento: dataNascimento,
                telefone: telefone.replace(/\D/g, '')
            }

            try {
                console.log(params);
                const response = await api.post('funcionario', params);
                console.log(response.data);
            } catch (error) {
                alert(error.response.data.replaceAll("_", " "));
            } finally {
                setNome('');
                setPis('');
                setCpf('');
                setDataNascimento('');
                setTelefone('');
                setEmpresa('');
                closeModal();
                loadFuncionarios();
            }
        }, [nome, pis, cpf, dataNascimento, telefone, empresa],
    )

        const getFuncionarioById = useCallback(
            async (id) => {
                
                try{
                    const response = await api.get(`funcionario/${id}`);
                    setFuncionario(response.data);
                } catch(error){
                    console.log(error);
                } 
            }, [nome, cpf, dataNascimento, pis, telefone, funcionario, empresa]
        )

        const openModalWithData = useCallback(
            async (id) => {
                try {
                    const response = await api.get(`funcionario/${id}`);
                    await getFuncionarioById(id);
                    setNomeAtualizado(response.data.nome);
                    setDataNascimentoAtualizado(response.data.dataNascimento);
                    setTelefoneAtualizado(response.data.telefone);
                } catch(error) {
                    console.log(error);
                } finally {
                    openModalUpdate();
                }
            }, [funcionario, nomeAtualizado, dataNascimentoAtualizado, telefoneAtualizado],
        )

        const handleUpdateFuncionario = useCallback(
        async (e) => {
            e.preventDefault();

            if(!nomeAtualizado || !dataNascimentoAtualizado.replace(/\D/g, '') || !telefoneAtualizado.replace(/\D/g, '')){
                alert("Por favor, preencha todos os campos");
                return;
            }

            const paramsUpdated = {
                nome: nomeAtualizado,
                dataNascimento: dataNascimentoAtualizado,
                telefone: telefoneAtualizado.replace(/\D/g, '')
            }

            try{
                await api.put(`funcionario/${funcionario.id}`, paramsUpdated);
                console.log(paramsUpdated);
            } catch(error){
                console.log(error);

            } finally {
                closeModalUpdate();
                loadFuncionarios();
            }
            
        }, [nomeAtualizado, dataNascimentoAtualizado, telefoneAtualizado],
        )

        const removeFuncionario = async (id) => {
            try {
                const response = await api.delete(`funcionario/${id}`);
                swal("Funcionário apagado com sucesso", response.data , "success");
                console.log(response.data);
            } catch (error) {
                console.log(error.response.data.replaceAll("_", " "));
                swal("Não Foi Possível apagar o funcionário", error.response.data.replaceAll("_", " ") , "error");
            } finally {
                loadFuncionarios();
            }
        }

    useEffect(
        () => {
            loadEmpresas();
        }, [loadEmpresas],
    )

    const inputStyles = {
        empresa: {
            width: '350px',
            maxWidth: '350px',
            height: '100%',
            fontFamily: 'Oxanium, cursive'
        }
    }
    
    return(

        <Container>
           
            <Row direction="row" container>
                <SubTitulo> Funcionário </SubTitulo>
                <Button onClick={openModal}>Adicionar</Button>
                <SearchContainer>
                <InputLabel style={inputStyle.label} id="Empresa" shrink>Empresa</InputLabel>
                    <Select
                        style={inputStyles.empresa}
                        labelId='Empresa'
                        value={idEmpresa}
                        MenuProps={{ style: {maxWidth: '400px', maxHeight: '400px'}  }}
                        onChange={e => {
                            loadFuncionarios(e.target.value)
                            setIdEmpresa(e.target.value);
                            }
                        }
                        >
                            {
                                listaEmpresas.map(emp => (
                                    <MenuItem style={inputStyle.label} value={emp.id}>{emp.razaoSocial}</MenuItem>
                                ))                                
                            }
                    </Select>
                </SearchContainer>
            </Row>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyleAdicionar}
                contentLabel="Modal"
            >
                <HeaderModal>
                    <h2>Cadastro</h2>
                </HeaderModal>
                <FormModal>
                    <Input 
                        placeholder="Nome"
                        fullWidth={true}
                        style={inputStyle.nome}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                    <ContainerInputs>
                        <InputMask 
                            style={inputStyle.cpf}
                            mask="999.999.999-99" 
                            id="cpf"
                            placeholder="CPF"
                            value={cpf} 
                            onChange={e => {
                            setCpf(e.target.value);
                            console.log(e.target.value);
                            }}>
                            {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                        </InputMask>
                        <Input
                            id="date"
                            style={inputStyle.data}
                            label="Data de Nascimento"
                            type="date"
                            defaultValue={dataNascimento}
                            onChange={e => {
                                setDataNascimento(e.target.value)
                                console.log(e.target.value)
                            }}
                            InputLabelProps={{
                            shrink: true
                            }}
                        />
                        <InputMask 
                            mask="(99) 99999-9999"
                            style={inputStyle.tel}
                            id="tel" 
                            placeholder="Telefone"
                            value={telefone} 
                            onChange={e => {
                            setTelefone(e.target.value);
                            console.log(e.target.value);
                            }}>
                            {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                        </InputMask>
                    </ContainerInputs>
                    <ContainerInputs>
                        <InputMask
                            mask="999.99999.99-9"
                            id="pis"
                            placeholder="PIS"
                            style={inputStyle.matricula}
                            value={pis}
                            onChange={e => 
                                {setPis(e.target.value)
                            }}
                        >
                        {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                        </InputMask>
                        <TextField
                            labelId={empresa}
                            label='Empresa'
                            style={inputStyle.empresa}
                            select
                            value={empresa}
                            onChange={e => setEmpresa(e.target.value)}
                            >
                                {
                                    listaEmpresas.map(emp => (
                                        <MenuItem value={emp}>{emp.razaoSocial}</MenuItem>
                                    ))                                
                                }
                        </TextField>
                    </ContainerInputs>
                            </FormModal>
                        <FooterModal>
                            <Button
                                onClick={e => handleAddFuncionario(e)}
                            >Salvar</Button>
                            <ButtonCancel
                                onClick={closeModal}
                            >Cancelar</ButtonCancel>
                        </FooterModal>
            </Modal>

                    {/* segundo modal para atualização ! */}
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
                    <Input 
                    style={inputStyle.nomeUp}
                    placeholder="Nome"
                    value={nomeAtualizado}
                    onChange={e => setNomeAtualizado(e.target.value)}
                    />
                    <ContainerInputs>
                        <TextField
                            id="date"
                            style={inputStyle.dataUp}
                            type="date"
                            defaultValue={dataNascimentoAtualizado}
                            onChange={e => {
                                setDataNascimentoAtualizado(e.target.value)
                                console.log(e.target.value)
                            }}
                        />
                        <InputMask 
                            style={inputStyle.telUp}
                            mask="(99) 99999-9999"
                            id="tel" 
                            placeholder="Telefone"
                            value={telefoneAtualizado} 
                            onChange={e => {
                            setTelefoneAtualizado(e.target.value);
                            console.log(e.target.value);
                            }}>
                            {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                        </InputMask>
                    </ContainerInputs> 
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleUpdateFuncionario(e)}
                    >
                        Adicionar
                    </Button>
                    <ButtonCancel
                        onClick={closeModalUpdate}
                    >
                        Cancelar
                    </ButtonCancel>
                </FooterModal>
            </Modal>

            <TableF funcionarios = {funcionarios} handleFuncionario = {openModalWithData} removeFuncionario = {removeFuncionario}/> 
        </Container>
        
    );
}

export default Funcionarios;