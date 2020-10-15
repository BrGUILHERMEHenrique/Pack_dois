import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



//imports de dentro do diretório do projeto
import TableF from '../../components/Table';

import api from '../../services/api';

import { Container, FormModal } from './styles';

const customStyles = {
    content : {
        width               : '50%',
        height               : '50%',
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
    const [modalIsOpen,setIsOpen] = useState(false);
    const [nome, setNome] = useState('');
    const [codMatricula, setCodMatricula] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [telefone, setTelefone] = useState('');



    function openModal() {
        setIsOpen(true);
      }
      
      function closeModal(){
        setIsOpen(false);
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
            const params = {
                nome,
                codMatricula,
                cpf,
                dataNascimento,
                telefone
            }

            try {
                console.log(params);
                const response = await api.post('funcionario');
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }, [],
    )

    useEffect(
        () => {
            loadFuncionarios();
        }, [loadFuncionarios],
    )

    return(

        <Container>
            <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
 
          <h2>Cadastro</h2>
          <button onClick={closeModal}>Fechar</button>
          <div>I am a modal</div>
          <FormModal>
            <input 
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
            />
            <input 
                placeholder="Matricula"
                value={codMatricula}
                onChange={e => setCodMatricula(e.target.value)}
            />

            <InputMask mask="999.999.999-99" 
                id="cpf"
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
                    label="Data de nascimento"
                    type="date"
                    defaultValue={dataNascimento}
                    onChange={e => {
                        setDataNascimento(e.target.value)
                        console.log(e.target.value)
                    }}
                    className={classes.textField}
                    InputLabelProps={{
                    shrink: true,
                    }}
                />
            </form>

            
            <InputMask mask="+55 (99) 99999-9999"
                id="tel" 
                value={telefone} 
                onChange={e => {
                setTelefone(e.target.value);
                console.log(e.target.value);
                }}>
                {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
            </InputMask>
            
            <button
                onClick={e => handleAddFuncionario(e)}
            >Adicionar</button>
          </FormModal>
        </Modal>

            <TableF funcionarios = {funcionarios} />
            
        </Container>
        
    );
}

export default Funcionarios;