//importação padrão do react 
import React, { useState } from 'react';

import { format } from 'date-fns'
//imortação para construir a tabela com material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
<<<<<<< HEAD
import TableCell from '@material-ui/core/TableCell';
// import { TableCell } from './styles';
=======
import { Tabela, TabelaRow, THead, Button, TextoTh, TextoTr } from './styles';
>>>>>>> cfe57e6569239aadde9271602830db26bcc0d027
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
            <TableRow>

              <TableCell align="right">id</TableCell>
              <TableCell align="right">descrição horário</TableCell>
              <TableCell align="right">Entrada</TableCell>
              <TableCell align="right">Intervalo</TableCell>
              <TableCell align="right">Volta intervalo</TableCell>
              <TableCell align="right">Saida</TableCell>
              <TableCell align="right">Folga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {horarioDetalhes.map(horarioDetalhe => (
              <TableRow key={horarioDetalhe.id}>
                <TableCell component="th" scope="Detlhes de horário" align="right">
                  {horarioDetalhe.id}
                </TableCell>
                <TableCell align="right">{horarioDetalhe.idHorario.descHorario}</TableCell>
                <TableCell align="right">{horarioDetalhe.entrada1}</TableCell>
                <TableCell align="right">{horarioDetalhe.saida1}</TableCell>
                <TableCell align="right">{horarioDetalhe.entrada2}</TableCell>
                <TableCell align="right">{horarioDetalhe.saida2}</TableCell>
                <TableCell align="right">{horarioDetalhe.folga ? 'VERDADEIRO' : 'FALSO'}</TableCell>
                <TableCell align="right"><Button variant="contained" color="primary"
                  onClick={() => {
                    handleHorarioDetalhes(horarioDetalhe.id);
                  }}
                >Atualizar</Button></TableCell>
                <TableCell align="right"><Button variant="outlined" color="primary" onClick={() => openModalDelete(horarioDetalhe)}>Excluir</Button></TableCell>
              </TableRow>
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

  export {TableF, TableE, TableHD};