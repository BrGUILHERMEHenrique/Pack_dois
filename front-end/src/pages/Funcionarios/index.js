import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ValidaPIS from '../../components/ValidaPis'
import autoTable from 'jspdf-autotable'
// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { AiOutlineClose } from 'react-icons/ai';
import { jsPDF } from "jspdf";


//imports de dentro do diretório do projeto
import { TableF } from '../../components/Table';

import api from '../../services/api';

import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button, ButtonCancel } from './styles';

const inputStyle = {
    nome: {
        width: '64%',
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
        width: '50%',
        height: '50%',
        marginRight: '10px',
        marginTop: '10px'
    },
    telUp: {
        width: '50%',
        height: '50%',
        marginTop: '10px'
    },
    nomeUp: {
        width: '55%',
        height: '55%',
    }
};

const modalStyleAtualizar = {
    content: {
        width               : '45%',
        height              : '50%',
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
        height              : '60%',
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
    const classes = useStyles();

    const [funcionarios, setFuncionarios] = useState([]);
    const [funcionario, setFuncionario] = useState({});
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
        async () => {
            try{
                const response = await api.get('funcionario');
                console.log(response.data);
                setFuncionarios(response.data);
            }catch(error){
                console.log(error);
            }
        }, [],
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
                alert(error.response.data);
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
                    setDataNascimentoAtualizado(response.data.dataNascimento.join('-'));
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
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                loadFuncionarios();
            }
        }

    useEffect(
        () => {
            loadFuncionarios();
        }, [loadFuncionarios],
    )

    useEffect(
        () => {
            loadEmpresas();
        }, [loadEmpresas],
    )
    
    // var img = new Image()
        // img.src = '../../assets/images.png';
        // doc.addImage(img, 'png', 2, 2, 10, 10)

    function criadorPDF() {
        const doc = new jsPDF();
        const colunas = ["CNPJ","Razão Social"];
        const linhas = [];

        listaEmpresas.forEach(emp => {      
            var valores = [emp.cnpj, emp.razaoSocial];
            linhas.push(valores);
        });   

        doc.autoTable(colunas, linhas, { startY: 10, headStyles: {fillColor: '#942a37'} }
        );
        doc.save('Test.pdf');
    }


    return(

        <Container>
            <Row 
            direction="row"
            container>
                <SubTitulo> Funcionário </SubTitulo>
                <Button onClick={openModal}>Adicionar</Button>
                <Button onClick={criadorPDF}>imprimir</Button>
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
                            placeholder="Numero"
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
                            placeholder="Matricula"
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
                        <FooterModal>
                            <Button
                                onClick={e => handleAddFuncionario(e)}
                            >Salvar</Button>
                            <ButtonCancel
                                onClick={closeModal}
                            >Cancelar</ButtonCancel>
                        </FooterModal>
                </FormModal>
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
                            label="Telefone"
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