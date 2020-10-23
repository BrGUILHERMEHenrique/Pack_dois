import { Container } from '@material-ui/core';
import Modal from 'react-modal';
import { SubTitulo } from '../../pages/Empresas/styles';
import React, { Component } from 'react';
import { withSwalInstance } from 'sweetalert2-react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss'

import { HeaderModal, FooterModal, ModalBody, ModalText, Button, TituloModal, Titulo } from './styles';


const ModalDelete = ({ 
    obj,
    modalIsOpen,
    closeModal,
    deleteFunction,
    customStyles
}) => {

        {/* <Modal
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
    </Modal> */}
   
      return (<Button onClick={()=>deleteFunction(obj.id)}>Clique</Button>)
    }
    

export default ModalDelete;