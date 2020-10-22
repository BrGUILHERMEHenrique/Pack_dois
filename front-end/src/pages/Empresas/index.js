import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import Input from '@material-ui/core/Input';

//imports de dentro do diretório do projeto
import {TableE} from '../../components/Table';

import api from '../../services/api';

import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button } from './styles';

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
        width               : '30%',
        height              : '40%',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
  };

const Empresas = () => {

    const [empresas, setEmpresas] = useState([]);
    const [empresa, setEmpresa] = useState({});
    const [modalIsOpen,setIsOpen] = useState(false);
    const [modalPutIsOpen, setModalPutIsOpen] = useState(false);
    const [razaoSocial, setRazaoSocial] = useState('');
    const [codEmpresa, setCodEmpresa] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [razaoSocialAtualizada, setRazaoSocialAtualizada] = useState('');

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


    const loadEmpresas = useCallback(
        async () => {
            try{
                const response = await api.get('empresa');
                console.log(response.data);
                setEmpresas(response.data);
            }catch(error){
                console.log(error);
            }
        }, [],
    );
    
    const handleAddEmpresa = useCallback(
        async (e) => {
            e.preventDefault();

            if(!razaoSocial || !codEmpresa || !cnpj.replace(/\D/g, '')){
                alert("Por favor, preencha todos os campos");
                return;
            }

            if(!cnpjValidator.isValid(cnpj)){ 
                alert('O CNPJ informado é inválido');
                return;
            }
            const params = {
                razaoSocial: razaoSocial,
                codEmpresa: codEmpresa,
                cnpj: cnpj.replace(/\D/g, '')
            }

            try {
                console.log(params);
                const response = await api.post('empresa', params);
                console.log(response.data);
            } catch (error) {
                alert(error.response.data);
            } finally {
                setRazaoSocial('');
                setCodEmpresa('');
                setCnpj('');
                closeModal();
                loadEmpresas();
            }
        }, [razaoSocial, codEmpresa, cnpj],
    )

        const getEmpresaById = useCallback(
            async (id) => {
                
                try{
                    const response = await api.get(`empresa/${id}`);
                    setEmpresa(response.data);
                } catch(error){
                    console.log(error);
                } 
            }, [razaoSocial, codEmpresa, cnpj],
        )

        const openModalWithData = useCallback(
            async (id) => {
                try {
                    const response = await api.get(`empresa/${id}`);
                    await getEmpresaById(id);
                    setRazaoSocialAtualizada(response.data.razaoSocial);
                } catch(error) {
                    console.log(error);
                } finally {
                    openModalUpdate();
                }
            }, [empresa, razaoSocialAtualizada],
        )

        const handleUpdateEmpresa = useCallback(
        async (e) => {
            e.preventDefault();

            if(!razaoSocialAtualizada){
                alert("Por favor, preencha todos os campos");
                return;
            }

            const paramsUpdated = {
                razaoSocial: razaoSocialAtualizada
            }

            try{
                await api.put(`empresa/${empresa.id}`, paramsUpdated);
                console.log(paramsUpdated);
            } catch(error){
                console.log(error);

            } finally {
                closeModalUpdate();
                loadEmpresas();
            }
            
        }, [razaoSocialAtualizada],
        )

        const removeEmpresa = async (id) => {
            try {
                const response = await api.delete(`empresa/${id}`);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                loadEmpresas();
            }
        }


    useEffect(
        () => {
            loadEmpresas();
        }, [loadEmpresas],
    )


    const inputStyle = {
        width               : '70%',
        height              : '70%' 
    }
    return(

        <Container>
            <Row 
            direction="row"
            container>
                <SubTitulo> Empresa </SubTitulo>
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
                    {/* <AiOutlineClose onClick={closeModal} /> */}
                </HeaderModal>
                {/* <hr /> */}
            <FormModal>
                <Input 
                    placeholder="Razão Social"
                    fullWidth={true}
                    value={razaoSocial}
                    style={inputStyle}
                    onChange={e => setRazaoSocial(e.target.value)}
                />
                <Input 
                    placeholder="Código da Empresa"
                    fullWidth={true}
                    value={codEmpresa}
                    style={inputStyle}
                    onChange={e => setCodEmpresa(e.target.value)}
                />
                <ContainerInputs>

                    <InputMask 
                    mask="99.999.999/9999-99" 
                        id="cnpj"
                        placeholder="CNPJ"
                        value={cnpj} 
                        onChange={e => {
                        setCnpj(e.target.value);
                        console.log(e.target.value);
                        }}>
                        {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                    </InputMask>
                </ContainerInputs>
                <FooterModal>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={e => handleAddEmpresa(e)}
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
            contentLabel="Modal"
            style={styleAtualizar}
            >
            <HeaderModal>
            <h2>Atualizar</h2>
            {/* <AiOutlineClose onClick={closeModalUpdate} /> */}
            </HeaderModal>
            <FormModal>
                <Input 
                    style={inputStyle}
                    placeholder="Razão Social"
                    value={razaoSocialAtualizada}
                    onChange={e => setRazaoSocialAtualizada(e.target.value)}
                />
                <FooterModal>
                <Button
                color="primary"
                variant="contained"
                onClick={e => handleUpdateEmpresa(e)}
                >Atualizar</Button>

                <Button
                color="secundary"
                variant="outlined"
                onClick={closeModalUpdate}
                >Cancelar</Button>
                </FooterModal>
            </FormModal>
            </Modal>

            <TableE empresas = {empresas} handleEmpresa = {openModalWithData} removeEmpresa = {removeEmpresa}/> 
   
        </Container>
        
    );
}

export default Empresas;