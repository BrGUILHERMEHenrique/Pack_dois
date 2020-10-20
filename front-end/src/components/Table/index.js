//importação padrão do react 
import React, { useState } from 'react';

import { format } from 'date-fns'
//imortação para construir a tabela com material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Tabela, TabelaRow } from './styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TabelaRow from '@material-ui/core/TabelaRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ModalDelete from '../../components/ModalDelete';


//styles criado através do material para a tabela
const useStyles = makeStyles({
    table: {
      minWidth: "480px",
      width: "80vw",
      height: "auto",
      margin: "auto",
      padding: "auto",
      marginTop: "10%"
    },
  });

  //Styles do modal
  const customStyles = {
    content : {
        width               : '50%',
        height              : '50%',
        top                 : '50%',
        left                : '50%',
        center               : 'auto',
        bottom              : 'auto',
        margincenter         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
  };
  

  //protoypes que formataram os dados em tela  
  String.prototype.cpf = function(){
      let cpf = this.replace(/\D/g, '');

      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

  String.prototype.cnpj = function(){
    let cnpj = this.replace(/\D/g, '');

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$2");
  }

  String.prototype.numero = function(){
      let numero = this.replace(/\D/g, '');

      if(numero.lenght === 10){
        return numero.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3")
      }else {
        return numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
      }

}
  
  const TableF = ({ funcionarios, handleFuncionario, removeFuncionario }) =>{
    const classes = useStyles();

    const [modalDeleteIsOpen, setModalDeleteisOpen] = useState(false);
    const [funcionario, setFuncionario] = useState({});

    function createData(Nome, Matricula, CPF, Data_de_nascimento, Telefone) {
      return { Nome, Matricula, CPF, Data_de_nascimento, Telefone };
    }

    const openModalDelete = (funcionario) => {
      setFuncionario(funcionario);
      setModalDeleteisOpen(true);
    }

    const closeModalDelete = () => {
      setFuncionario({});
      setModalDeleteisOpen(false);
    }

      return(
        <>
        <TableContainer component={Paper} className={classes.table}>
        <Table  aria-label="Tabela Funcionários">
          <TableHead>
            <TabelaRow>

              <Tabela align="center">Nome</Tabela>
              <Tabela align="center">Matricula</Tabela>
              <Tabela align="center">CPF</Tabela>
              <Tabela align="center">Data de nascimento</Tabela>
              <Tabela align="center">Telefone</Tabela>
            </TabelaRow>
          </TableHead>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TabelaRow key={funcionario.id}>
                <Tabela component="th" scope="funcionario" align="center">
                  {funcionario.nome}
                </Tabela>

                <Tabela align="center">{funcionario.codMatricula}</Tabela>
                <Tabela align="center">{funcionario.cpf.cpf()}</Tabela>
                <Tabela align="center">{format(new Date(funcionario.dataNascimento), 'MM/dd/yyyy')}</Tabela>
                <Tabela align="center">{funcionario.telefone.numero()}</Tabela>
                <Tabela align="center"><Button variant="contained" color="primary"
                  onClick={() => {
                    handleFuncionario(funcionario.id);
                  }}
                >Atualizar</Button></Tabela>
                <Tabela align="center"><Button variant="outlined" color="primary" onClick={() => openModalDelete(funcionario)}>Excluir</Button></Tabela>
              </TabelaRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                  <ModalDelete obj={funcionario}
                              modalIsOpen={modalDeleteIsOpen}
                              closeModal={closeModalDelete}
                              deleteFunction={removeFuncionario}
                              customStyles={customStyles}
                  />
      </>
      )
  }

  const TableE = ({ empresas, handleEmpresa, removeEmpresa }) =>{
    const classes = useStyles();

    const [modalDeleteIsOpen, setModalDeleteisOpen] = useState(false);
    const [empresa, setEmpresa] = useState({});

    function createData(CodEmpresa, RazaoSocial, Cnpj) {
      return { CodEmpresa, RazaoSocial, Cnpj};
    }

    const openModalDelete = (empresa) => {
      setEmpresa(empresa);
      setModalDeleteisOpen(true);
    }

    const closeModalDelete = () => {
      setEmpresa({});
      setModalDeleteisOpen(false);
    }

      return(
        <>
        <TableContainer component={Paper} className={classes.table}>
        <Table  aria-label="Tabela Empresas">
          <TableHead>
            <TabelaRow>

              <Tabela align="center">Razão Social</Tabela>
              <Tabela align="center">Código da Empresa</Tabela>
              <Tabela align="center">Cnpj</Tabela>
            </TabelaRow>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <TabelaRow key={empresa.id}>
                <Tabela component="th" scope="empresa" align="center">
                  {empresa.razaoSocial}
                </Tabela>
                <Tabela align="center">{empresa.codEmpresa}</Tabela>
                <Tabela align="center">{empresa.cnpj.cnpj()}</Tabela>
                <Tabela align="center"><Button variant="contained" color="primary"
                  onClick={() => {
                    handleEmpresa(empresa.id);
                  }}
                >Atualizar</Button></Tabela>
                <Tabela align="center"><Button variant="outlined" color="primary" onClick={() => openModalDelete(empresa)}>Excluir</Button></Tabela>
              </TabelaRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                  <ModalDelete obj={empresa}
                              modalIsOpen={modalDeleteIsOpen}
                              closeModal={closeModalDelete}
                              deleteFunction={removeEmpresa}
                              customStyles={customStyles}
                  />
      </>
      )
  }

  export {TableF, TableE};