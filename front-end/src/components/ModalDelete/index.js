import React from 'react';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';

import { HeaderModal, FooterModal, ModalBody, ModalText } from './styles';

const ModalDelete = ({ 
    obj,
    modalIsOpen,
    closeModal,
    deleteFunction,
    customStyles
}) => {

    return(
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Excluir"
    >
        <HeaderModal>
            <h2>Confirmar exclusão</h2>
        </HeaderModal>
        <hr />

        <ModalBody>

            <ModalText>Deseja realmente EXCLUIR? </ModalText>

        </ModalBody>

        <FooterModal>
                <Button color="secundary" variant="contained" onClick={() => closeModal()}>Cancelar</Button>
                <Button color="primary" variant="contained" onClick={() => {
                    deleteFunction(obj.id)
                    closeModal()}}>Excluir</Button>
        </FooterModal>
    </Modal>
    )
}

export default ModalDelete;