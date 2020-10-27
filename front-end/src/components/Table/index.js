import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import {TableBody, Table, TableContainer, Paper} from '@material-ui/core';
import { Tabela, TabelaRow, THead, Button, TextoTh, TextoTr, ButtonU, ButtonD } from './styles';
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
                  <TextoTr>{funcionario.nome}</TextoTr>
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
    const history = useHistory();

    const buttonStyle = {
      marginRight: 40
    }

    return(
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="Tabela Horários">
            {/* <Tabela align="center"><TextoTh>Id</TextoTh></Tabela> */}
            <Tabela align="center"><TextoTh>Codigo do Horário</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Descrição do Horário</TextoTh></Tabela>
            <TableBody>
              {horarios.map(horario => (
                <TabelaRow key={horario.id}>
                  {/* <Tabela component="th" scope="Detlhes de horário" align="center">
                    <TextoTr>{horario.id}</TextoTr>
                  </Tabela> */}
                  <Tabela align="center"><TextoTr>{horario.codigoHorario}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horario.descHorario}</TextoTr></Tabela>
                  <Tabela align="center">
                    <ButtonU
                      style={buttonStyle}
                      onClick={() => {
                        history.push('/horarioDetalhes', {id: horario.id});
                      }}
                    >Detalhes</ButtonU>

                    <ButtonU
                      style={buttonStyle}
                      onClick={() => {
                        handleHorario(horario.id);
                      }}
                    >Atualizar</ButtonU>
                    <ButtonD
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

    return(
      <TableContainer component={Paper} className={classes.table}>
        <Table aria-label="Tabela Horários">
          <Tabela align="center"><TextoTh>Nome</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>Codigo Inicial</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>Descrição Horário</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>VIgência Inicial</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>Vigência Final</TextoTh></Tabela>
          <TableBody>
            {funcionarioHorarios.map(funcionarioHorario => (
              <TabelaRow key={funcionarioHorario.id}>
                <Tabela component="th" scope="Funcionário-Horario" align="center">
                <TextoTr>{funcionarioHorario.idFuncionario.nome}</TextoTr>
                </Tabela>
                <Tabela align="center"><TextoTr>{funcionarioHorario.codigoInicial}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{funcionarioHorario.idHorario.descHorario}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{funcionarioHorario.vigenciaInicial}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{funcionarioHorario.vigenciaFinal}</TextoTr></Tabela>
                <Tabela align="center"><ButtonU
                  onClick={() => {
                    handleFuncionarioHorario(funcionarioHorario.id);
                  }}
                >Atualizar</ButtonU></Tabela>
                <Tabela align="center"><ButtonD 
                                          onClick={() => {
                                              OpenAlert(funcionarioHorario.id, removeFuncionarioHorario)
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

  export {TableF, TableE, TableHD, TableH, TableFH};
  
