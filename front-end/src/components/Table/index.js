//importação padrão do react 
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { format } from 'date-fns'
//imortação para construir a tabela com material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import { Tabela, TabelaRow, THead, Button, TextoTh, TextoTr } from './styles';
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
          <TableHead>
              <Tabela align="center"><TextoTh>Nome</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Matricula</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>CPF</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Data de Nascimento</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Telefone</TextoTh></Tabela>
          </TableHead>
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
                <Tabela align="center"><Button variant="contained" color="primary"
                  onClick={() => {
                    handleFuncionario(funcionario.id);
                  }}
                >Atualizar</Button></Tabela>
                <Tabela align="center"><Button variant="contained" color="primary"
                  onClick = {() => history.push('/funcionarioHorario', { id: funcionario.id })}
                >Mais Detalhes</Button></Tabela>
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
              <Tabela align="center"><TextoTh>Razão Social</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Código da Empresa</TextoTh></Tabela>
              <Tabela align="center"><TextoTh>Cnpj</TextoTh></Tabela>
          </TableHead>
          <TableBody>
            {empresas.map((empresa) => (
              <TabelaRow key={empresa.id}>
                <Tabela component="th" scope="empresa" align="center">
                <TextoTr>{empresa.razaoSocial}</TextoTr>
                </Tabela>
                <Tabela align="center"><TextoTr>{empresa.codEmpresa}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{empresa.cnpj.cnpj()}</TextoTr></Tabela>
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
          <TableHead>
            <TabelaRow>

              <Tabela align="right">id</Tabela>
              <Tabela align="right">descrição horário</Tabela>
              <Tabela align="right">Entrada</Tabela>
              <Tabela align="right">Intervalo</Tabela>
              <Tabela align="right">Volta intervalo</Tabela>
              <Tabela align="right">Saida</Tabela>
              <Tabela align="right">Folga</Tabela>
            </TabelaRow>
          </TableHead>
          <TableBody>
            {horarioDetalhes.map(horarioDetalhe => (
              <TabelaRow key={horarioDetalhe.id}>
                <Tabela component="th" scope="Detlhes de horário" align="right">
                  {horarioDetalhe.id}
                </Tabela>
                <Tabela align="right">{horarioDetalhe.idHorario.descHorario}</Tabela>
                <Tabela align="right">{horarioDetalhe.entrada1}</Tabela>
                <Tabela align="right">{horarioDetalhe.saida1}</Tabela>
                <Tabela align="right">{horarioDetalhe.entrada2}</Tabela>
                <Tabela align="right">{horarioDetalhe.saida2}</Tabela>
                <Tabela align="right">{horarioDetalhe.folga ? 'VERDADEIRO' : 'FALSO'}</Tabela>
                <Tabela align="right"><Button variant="contained" color="primary"
                  onClick={() => {
                    handleHorarioDetalhes(horarioDetalhe.id);
                  }}
                >Atualizar</Button></Tabela>
                <Tabela align="right"><Button variant="outlined" color="primary" onClick={() => openModalDelete(horarioDetalhe)}>Excluir</Button></Tabela>
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
          <TableHead>
            <TabelaRow>

              <Tabela align="right">id</Tabela>
              <Tabela align="right">Codigo horário</Tabela>
              <Tabela align="right">Descrição horário</Tabela>
            </TabelaRow>
          </TableHead>
          <TableBody>
            {horarios.map(horario => (
              <TabelaRow key={horario.id}>
                <Tabela component="th" scope="Detlhes de horário" align="right">
                  {horario.id}
                </Tabela>
                <Tabela align="right">{horario.codigoHorario}</Tabela>
                <Tabela align="right">{horario.descHorario}</Tabela>
                <Tabela align="right"><Button variant="contained" color="primary"
                  onClick={() => {
                    handleHorario(horario.id);
                  }}
                >Atualizar</Button></Tabela>
                <Tabela align="right"><Button variant="outlined" color="primary" onClick={() => openModalDelete(horario)}>Excluir</Button></Tabela>
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