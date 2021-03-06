import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import { cnpj as cnpjValidator } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';
import Input from '@material-ui/core/Input';
import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss';
import {TableE} from '../../components/Table';
import api from '../../services/api';
import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button, ButtonCancel, inputStyle, modalStyleAdicionar, modalStyleAtualizar } from './styles';

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
                swal("Atenção", "Impossível carregar as empresas", "error");
            }
        }, [],
    );
    
    const handleAddEmpresa = useCallback(
        async (e) => {
            e.preventDefault();

            if(!razaoSocial || !codEmpresa || !cnpj.replace(/\D/g, '')){
                swal("Atenção", "Por favor, preencha todos os campos", "warning");
                return;
            }

            if(!cnpjValidator.isValid(cnpj)){ 
                swal("Atenção", "O CNPJ informado é inválido", "warning");
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
                swal("Atenção", "Impossível carregar as empresas", "error");
            } finally {
                setRazaoSocial('');
                setCodEmpresa('');
                setCnpj('');
                closeModal();
                loadEmpresas();
            }
        }, [razaoSocial, codEmpresa, cnpj, loadEmpresas],
    )

    const getEmpresaById = useCallback(
        async (id) => {
            
            try{
                const response = await api.get(`empresa/${id}`);
                setEmpresa(response.data);
            } catch(error){                    
            swal("Atenção", "Não foi possível encontrar a empresa", "error");
            }
        }, [],
    )

    const openModalWithData = useCallback(
        async (id) => {
            try {
                const response = await api.get(`empresa/${id}`);
                await getEmpresaById(id);
                setRazaoSocialAtualizada(response.data.razaoSocial);
            } catch(error) {                    
            swal("Atenção", "Impossível carregar as empresas", "error");
            } finally {
                openModalUpdate();
            }
        }, [getEmpresaById],
    )

    const handleUpdateEmpresa = useCallback(
        async (e) => {
            e.preventDefault();

            if(!razaoSocialAtualizada){
                swal("Atenção", "Por favor, preencha todos os campos", "warning");
                return;
            }
            const paramsUpdated = {
                razaoSocial: razaoSocialAtualizada
            }
            try{
                await api.put(`empresa/${empresa.id}`, paramsUpdated);
            } catch(error){
                alert(error);
            } finally {
                closeModalUpdate();
                setRazaoSocial('');
                loadEmpresas();
            }
            
        }, [empresa.id, loadEmpresas, razaoSocialAtualizada],
    )

    const removeEmpresa = async (id) => {
        try {
            await api.delete(`empresa/${id}`);
            swal("Ação realizada com sucesso!", "Empresa removida.", "success");
        } catch (error) {
            swal("Ação não permitida!", error.response.data.replaceAll("_", " "), "error");
        } finally {
            loadEmpresas();
        }
    }

    useEffect(
        () => {
            loadEmpresas();
        }, [loadEmpresas],
    )

    return(

        <Container>
            <Row 
                direction="row"
                container
            >
                <SubTitulo>Empresas</SubTitulo>
                <Button onClick={openModal}>Adicionar</Button>
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
                        placeholder="Razão Social"
                        fullWidth={true}
                        value={razaoSocial}
                        style={inputStyle.razaoSocial}
                        onChange={e => setRazaoSocial(e.target.value)}
                    />
                    <ContainerInputs>
                        <Input 
                            placeholder="Código da Empresa"
                            fullWidth={true}
                            value={codEmpresa}
                            style={inputStyle.matricula}
                            onChange={e => setCodEmpresa(e.target.value)}
                        />
                        <InputMask 
                            style={inputStyle.cnpj}
                            mask="99.999.999/9999-99" 
                            placeholder="CNPJ"
                            value={cnpj} 
                            onChange={e => {
                            setCnpj(e.target.value);
                            }}>
                            {(inputProps) => <MaterialInput {...inputProps} type="tel"  />}
                        </InputMask>
                    </ContainerInputs>
                </FormModal>
                <FooterModal>
                    <Button
                        onClick={e => handleAddEmpresa(e)}
                    >
                        Salvar
                    </Button>
                    <ButtonCancel
                        onClick={closeModal}
                    >
                        Cancelar
                    </ButtonCancel>

                </FooterModal>
            </Modal>
            <Modal
                isOpen={modalPutIsOpen}
                onRequestClose={closeModalUpdate}
                contentLabel="Modal"
                style={modalStyleAtualizar}
            >
                <HeaderModal>
                <h2>Atualizar</h2>
                </HeaderModal>
                <FormModal>
                    <ContainerInputs>
                        <Input 
                            style={inputStyle.razaoSocialUp}
                            placeholder="Razão Social"
                            value={razaoSocialAtualizada}
                            onChange={e => setRazaoSocialAtualizada(e.target.value)}
                        />
                    </ContainerInputs>
                </FormModal>
                <FooterModal>
                    <Button
                    onClick={e => handleUpdateEmpresa(e)}
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
            <TableE empresas = {empresas} handleEmpresa = {openModalWithData} removeEmpresa = {removeEmpresa}/> 
        </Container>
        
    );
}

export default Empresas;