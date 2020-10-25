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
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss'

import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss'


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
const OpenAlert = (id, remove) => {

  swal({
    title: 'Deseja REALMENTE excluir??',
    text: 'Esses dados serão removidos permanentemente.', 
    icon: "warning",
    buttons: true,
    dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    swal('Removido com sucesso!', {
      icon: "success",
    });
    remove(id)
  } else {
    swal('Ação cancelada!');
  }
});
}


const TableF = ({ funcionarios, handleFuncionario, removeFuncionario }) =>{
    const classes = useStyles();
    const history = useHistory();

    return(
        <TableContainer component={Paper} className={classes.table}>
          <Table  aria-label="Tabela Funcionários">
            <Tabela align="center"><TextoTh>Nome</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Empresa</TextoTh></Tabela>
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

                  <Tabela align="center"><TextoTr>{funcionario.idEmpresa.razaoSocial}</TextoTr></Tabela>
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
                  <Tabela align="center"><ButtonD 
                                        onClick={() => {
                                            OpenAlert(funcionario.id, removeFuncionario)
                                          }}
                                          >Excluir</ButtonD>
                  </Tabela>
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
  }

  const TableE = ({ empresas, handleEmpresa, removeEmpresa }) =>{
    const classes = useStyles();

    return(
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
                  <Tabela align="center"><ButtonD 
                                          onClick={() => {
                                              OpenAlert(empresa.id, removeEmpresa)
                                            }}
                                            >Excluir</ButtonD>
                  </Tabela>
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
  }

  const TableHD = ({ horarioDetalhes, handleHorarioDetalhes, removeHorarioDetalhe }) => {
    const classes = useStyles();

    return(
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
                                          onClick={() => {
                                              OpenAlert(horarioDetalhe.id, removeHorarioDetalhe)
                                            }}
                                            >Excluir</ButtonD>
                  </Tabela>
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
  }
  
  const TableH = ({ horarios, handleHorario, removeHorario }) => {
    const classes = useStyles();

    return(
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
                  <Tabela align="center"><ButtonD 
                                          onClick={() => {
                                              OpenAlert(horario.id, removeHorario)
                                            }}
                                            >Excluir</ButtonD>
                  </Tabela>
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
    )
  }

  const TableFH = ({ funcionarioHorarios, handleFuncionarioHorario, removeFuncionarioHorario }) => {

    const classes = useStyles();

    const [modalDeleteIsOpen, setModalDeleteisOpen] = useState(false);
    const [funcionarioHorario, setFuncionarioHorario] = useState({});

    const openModalDelete = (funcionarioHorario) => {
      setFuncionarioHorario(funcionarioHorario);
      setModalDeleteisOpen(true);
    }

    const closeModalDelete = () => {
      setFuncionarioHorario({});
      setModalDeleteisOpen(false);
    }

    return(
      <>
      <TableContainer component={Paper} className={classes.table}>
    <Table aria-label="Tabela Horários">
      <TableHead>
        <TabelaRow>

          <Tabela align="right">Nome</Tabela>
          <Tabela align="right">Codigo Inicial</Tabela>
          <Tabela align="right">Descrição Horário</Tabela>
          <Tabela align="right">VIgência Inicial</Tabela>
          <Tabela align="right">Vigência Final</Tabela>
        </TabelaRow>
      </TableHead>
      <TableBody>
        {funcionarioHorarios.map(funcionarioHorario => (
          <TabelaRow key={funcionarioHorario.id}>
            <Tabela component="th" scope="Funcionário-Horario" align="right">
              {funcionarioHorario.idFuncionario.nome}
            </Tabela>
            <Tabela align="right">{funcionarioHorario.codigoInicial}</Tabela>
            <Tabela align="right">{funcionarioHorario.idHorario.descHorario}</Tabela>
            <Tabela align="right">{funcionarioHorario.vigenciaInicial}</Tabela>
            <Tabela align="right">{funcionarioHorario.vigenciaFinal}</Tabela>
            <Tabela align="right"><Button variant="contained" color="primary"
              onClick={() => {
                handleFuncionarioHorario(funcionarioHorario.id);
              }}
            >Atualizar</Button></Tabela>
            <Tabela align="right"><Button variant="outlined" color="primary" onClick={() => openModalDelete(funcionarioHorario)}>Excluir</Button></Tabela>
          </TabelaRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
              <ModalDelete obj={funcionarioHorario}
                          modalIsOpen={modalDeleteIsOpen}
                          closeModal={closeModalDelete}
                          deleteFunction={removeFuncionarioHorario}
                          customStyles={customStyles}
              />

  </>

    )

  }

  export {TableF, TableE, TableHD, TableH, TableFH};
  
