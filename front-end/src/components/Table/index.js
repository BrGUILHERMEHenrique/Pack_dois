//importação padrão do react 
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { format } from 'date-fns'
//imortação para construir a tabela com material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Tabela, TabelaRow, THead, Button, TextoTh, TextoTr, ButtonU, ButtonD } from './styles';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
// import TabelaRow from '@material-ui/core/TabelaRow';
import Paper from '@material-ui/core/Paper';
// import Button from '@material-ui/core/Button';

import ModalDelete from '../../components/ModalDelete';


//styles criado através do material para a tabela
const useStyles = makeStyles({
    table: {
      minWidth: "400px",
      width: "80vw",
      height: "auto",

      margin: "auto",
      padding: "auto",
      marginTop: "50px"
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

    return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
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
    const history = useHistory();

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
              <Tabela align="center"><TextoTh>Nome</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Matricula</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>CPF</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Data de Nascimento</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Telefone</TextoTh></Tabela>
              <TableBody>
                {funcionarios.map((funcionario) => (
                  <TabelaRow key={funcionario.id}>
                    <Tabela component="th" scope="funcionario" align="center">
                      {funcionario.nome}
                    </Tabela>

                    <Tabela align="center"><TextoTr>{funcionario.codMatricula}</TextoTr></Tabela>
                    <Tabela align="center"><TextoTr>{funcionario.cpf.cpf()}</TextoTr></Tabela>
                    <Tabela align="center"><TextoTr>{format(new Date(funcionario.dataNascimento), 'MM/dd/yyyy')}</TextoTr></Tabela>
                    <Tabela align="center"><TextoTr>{funcionario.telefone.numero()}</TextoTr></Tabela>
                    <Tabela align="center"><ButtonU
                      onClick = {() => history.push('/funcionarioHorario', { id: funcionario.id })}
                    >Horários</ButtonU></Tabela>
                    <Tabela align="center"><ButtonU 
                      onClick={() => {
                        handleFuncionario(funcionario.id);
                      }}
                    >Atualizar</ButtonU></Tabela>
                    <Tabela align="center"><ButtonD onClick={() => openModalDelete(funcionario)}>Excluir</ButtonD></Tabela>
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
              <Tabela align="center"><TextoTh>Razão Social</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Código da Empresa</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Cnpj</TextoTh></Tabela>
              <TableBody>
                {empresas.map((empresa) => (
                  <TabelaRow key={empresa.id}>
                    <Tabela component="th" scope="empresa" align="center">
                    <TextoTr>{empresa.razaoSocial}</TextoTr>
                    </Tabela>
                    <Tabela align="center"><TextoTr>{empresa.codEmpresa}</TextoTr></Tabela>
                    <Tabela align="center"><TextoTr>{empresa.cnpj.cnpj()}</TextoTr></Tabela>
                    <Tabela align="center"><ButtonU 
                      onClick={() => {
                        handleEmpresa(empresa.id);
                      }}
                    >Atualizar</ButtonU></Tabela>
                    <Tabela align="center"><ButtonD onClick={() => openModalDelete(empresa)}>Excluir</ButtonD></Tabela>
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

  const TableHD = ({ horarioDetalhes, handleHorarioDetalhes, removeHorarioDetalhes }) => {
    const classes = useStyles();

    const [modalDeleteIsOpen, setModalDeleteisOpen] = useState(false);
    const [horarioDetalhe, setHorarioDetalhe] = useState({});

    const openModalDelete = (horario) => {
      setHorarioDetalhe(horario);
      setModalDeleteisOpen(true);
    }

    const closeModalDelete = () => {
      setHorarioDetalhe({});
      setModalDeleteisOpen(false);
    }

    return(
      <>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="Tabela Empresas">
              <Tabela align="center"><TextoTh>Id</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Descrição Horário</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Entrada</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Intervalo</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Retorno do Intervalo</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Saida</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Folga</TextoTh></Tabela>
            <TableBody>
              {horarioDetalhes.map(horarioDetalhe => (
                <TabelaRow key={horarioDetalhe.id}>
                  <Tabela component="th" scope="Detalhes de horário" align="center">
                  <TextoTr>{horarioDetalhe.id}</TextoTr>
                  </Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.idHorario.descHorario}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.entrada1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.saida1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.entrada2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.saida2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.folga ? 'VERDADEIRO' : 'FALSO'}</TextoTr></Tabela>
                  <Tabela align="center"><ButtonU 
                                          onClick={() => {
                                            handleHorarioDetalhes(horarioDetalhe.id);
                                          }}
                                          >Atualizar</ButtonU>
                  </Tabela>
                  <Tabela align="center"><ButtonD
                                          onClick={() => 
                                          openModalDelete(horarioDetalhe)}  
                                          >Excluir</ButtonD>
                  </Tabela>
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                    <ModalDelete obj={horarioDetalhe}
                                modalIsOpen={modalDeleteIsOpen}
                                closeModal={closeModalDelete}
                                deleteFunction={removeHorarioDetalhes}
                                customStyles={customStyles}
                    />
      </>
    )
  }
  
  const TableH = ({ horarios, handleHorario, removeHorario }) => {
    const classes = useStyles();

    const [modalDeleteIsOpen, setModalDeleteisOpen] = useState(false);
    const [horario, setHorario] = useState({});

    const openModalDelete = (horario) => {
      setHorario(horario);
      setModalDeleteisOpen(true);
    }

    const closeModalDelete = () => {
      setHorario({});
      setModalDeleteisOpen(false);
    }

    return(
      <>
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="Tabela Horários">
            <Tabela align="center"><TextoTh>Id</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Codigo do Horário</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Descrição do Horário</TextoTh></Tabela>
            <TableBody>
              {horarios.map(horario => (
                <TabelaRow key={horario.id}>
                  <Tabela component="th" scope="Detlhes de horário" align="center">
                    <TextoTr>{horario.id}</TextoTr>
                  </Tabela>
                  <Tabela align="center"><TextoTr>{horario.codigoHorario}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horario.descHorario}</TextoTr></Tabela>
                  <Tabela align="center"><ButtonU
                    onClick={() => {
                      handleHorario(horario.id);
                    }}
                  >Atualizar</ButtonU></Tabela>
                  <Tabela align="center"><ButtonD onClick={() => openModalDelete(horario)}>Excluir</ButtonD></Tabela>
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
                  <ModalDelete obj={horario}
                              modalIsOpen={modalDeleteIsOpen}
                              closeModal={closeModalDelete}
                              deleteFunction={removeHorario}
                              customStyles={customStyles}
                  />

      </>
    )
  }

  export {TableF, TableE, TableHD, TableH};