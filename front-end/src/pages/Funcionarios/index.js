import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { AiOutlineClose } from 'react-icons/ai';

//imports de dentro do diretório do projeto
import { TableF } from '../../components/Table';

import api from '../../services/api';

import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button} from './styles';

const inputStyle = {
    width               : '76%',
    height              : '90%' 
};

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
    const [codMatricula, setCodMatricula] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');
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
    
    const handleAddFuncionario = useCallback(
        async (e) => {
            e.preventDefault();

            if(!nome || !codMatricula || !cpf.replace(/\D/g, '') || !dataNascimento.replace(/\D/g, '') || !telefone.replace(/\D/g, '')){
                alert("Por favor, preencha todos os campos");
                return;
            }

            if(!cpfValidator.isValid(cpf)){ 
                alert('O CPF informado é inválido');
                return;
            }
            const params = {
                nome: nome,
                codMatricula: codMatricula,
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
                setCodMatricula('');
                setCpf('');
                setDataNascimento('');
                setTelefone('');
                closeModal();
                loadFuncionarios();
            }
        }, [nome, codMatricula, cpf, dataNascimento, telefone],
    )

        const getFuncionarioById = useCallback(
            async (id) => {
                
                try{
                    const response = await api.get(`funcionario/${id}`);
                    setFuncionario(response.data);
                } catch(error){
                    console.log(error);
                } 
            }, [nome, cpf, dataNascimento, codMatricula, telefone, funcionario]
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

    return(

        <Container>
             <Row 
            direction="row"
            container>
                <SubTitulo> Funcionário </SubTitulo>
                <Button variant="contained" color="primary" onClick={openModal}>Adicionar</Button>
            </Row>
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={styleAdicionar}
            contentLabel="Modal"
            >
                <HeaderModal>
                    <h2>Cadastro</h2>
                </HeaderModal>
            <FormModal>
                <Input 
                    placeholder="Nome"
                    fullWidth={true}
                    style={inputStyle}
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <Input 
                    placeholder="Matricula"
                    fullWidth={true}
                    style={inputStyle}
                    value={codMatricula}
                    onChange={e => setCodMatricula(e.target.value)}
                />
                <ContainerInputs>

                    <InputMask mask="999.999.999-99" 
                        id="cpf"
                        placeholder="CPF"
                        value={cpf} 
                        onChange={e => {
                        setCpf(e.target.value);
                        console.log(e.target.value);
                        }}>
                        {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                    </InputMask>

                    <form className={classes.container} >
                        <TextField
                            id="date"
                            label="Data de Nascimento"
                            type="date"
                            defaultValue={dataNascimento}
                            onChange={e => {
                                setDataNascimento(e.target.value)
                                console.log(e.target.value)
                            }}
                            className={classes.textField}
                            InputLabelProps={{
                            shrink: true
                            }}
                        />
                    </form>
                    
                    <InputMask mask="(99) 99999-9999"
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
                <FooterModal>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={e => handleAddFuncionario(e)}
                    >Adicionar</Button>
                    <Button
                        color="secundary"
                        variant="outlined"
                        onClick={closeModal}
                    >Cancelar</Button>

                    </FooterModal>
            </FormModal>
            </Modal>

                    {/* segundo modal para atualização ! */}
            <Modal
            isOpen={modalPutIsOpen}
            onRequestClose={closeModalUpdate}
            style={styleAtualizar}
            contentLabel="Modal"
            >
            <HeaderModal>
            <h2>Atualizar</h2>
            </HeaderModal>
            <FormModal>
                <Input 
                 style={inputStyle}
                 placeholder="Nome"
                value={nomeAtualizado}
                onChange={e => setNomeAtualizado(e.target.value)}
                />

                <FormModal className={classes.container} >
                    <TextField
                        id="date"
                        
                        type="date"
                        defaultValue={dataNascimentoAtualizado}
                        onChange={e => {
                            setDataNascimentoAtualizado(e.target.value)
                            console.log(e.target.value)
                        }}
                        className={classes.textField}
                    
                    />
                
                
                <InputMask mask="(99) 99999-9999"
                    id="tel" 
                    label="Telefone"
                    value={telefoneAtualizado} 
                    onChange={e => {
                    setTelefoneAtualizado(e.target.value);
                    console.log(e.target.value);
                    }}>
                    {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                </InputMask>
                </FormModal>
                 <FooterModal>
                <Button
                    onClick={e => handleUpdateFuncionario(e)}
                >Atualizar</Button>
                </FooterModal>
            </FormModal>
            </Modal>

            <TableF funcionarios = {funcionarios} handleFuncionario = {openModalWithData} removeFuncionario = {removeFuncionario}/> 
        </Container>
        
    );
}

export default Funcionarios;