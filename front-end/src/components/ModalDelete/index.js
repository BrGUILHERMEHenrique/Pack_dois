import { Container } from '@material-ui/core';
import React from 'react';
import Modal from 'react-modal';
import { SubTitulo } from '../../pages/Empresas/styles';

import { HeaderModal, FooterModal, ModalBody, ModalText, Button, TituloModal, Titulo } from './styles';


const ModalDelete = ({ 
    obj,
    modalIsOpen,
    closeModal,
    deleteFunction,
    customStyles
}) => {

    return(
        <Container>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Excluir"
    >
        <HeaderModal>
            <Titulo>Confirmar exclusão</Titulo>
        </HeaderModal>

        <ModalBody>
            <ModalText>Deseja realmente EXCLUIR? </ModalText>
        </ModalBody>

        <FooterModal>
            <Button color="primary" variant="contained" onClick={() => {
                deleteFunction(obj.id)
                closeModal()}}>Excluir</Button>
            <Button color="secundary" variant="contained" onClick={() => closeModal()}>Cancelar</Button>
                
        </FooterModal>
    </Modal>
    </Container>
    )
}

export default ModalDelete;