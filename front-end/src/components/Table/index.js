import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns'
import { makeStyles } from '@material-ui/core/styles';
import {TableBody, Table, TableContainer, Paper, Menu, MenuItem} from '@material-ui/core';
import { Tabela, TabelaRow, THead, Button, TextoTh, TextoTr, ButtonU, ButtonD, TableOptions, MenuList, ButtonIcon, ButtonIconD } from './styles';
import swal from 'sweetalert';
import 'sweetalert2/src/sweetalert2.scss'
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import DateRangeIconRounded from '@material-ui/icons/DateRangeRounded';

const useStyles = makeStyles({
    table: {
      minWidth: "400px",
      width: "90vw",
      height: "auto", 
      margin: "auto",
      padding: "auto",
      marginTop: "50px"
    },

    tableH: {
      minWidth: "400px",
      width: "75vw",
      height: "auto", 
      margin: "auto",
      padding: "auto",
      marginTop: "50px"
    }
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

  String.prototype.pis = function(){
    let pis = this.replace(/\D/g, '');

    return pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, "$1.$2.$3-$4");
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
  try {
    if (willDelete) {
      swal('Removido com sucesso!', {
        icon: "success",
      });
      remove(id)
    } } catch(error) {
    alert(error.response.data)
  }
    
    
    // else {
    //   swal('Ação cancelada!', {
    //     icon: "error",
    //   });
    // }
  

});
}


const TableF = ({ funcionarios, handleFuncionario, removeFuncionario }) =>{
    const classes = useStyles();
    const history = useHistory();

    return(
        <TableContainer component={Paper} className={classes.table}>
          <Table  aria-label="Tabela Funcionários">
            <Tabela align="left"><TextoTh>Nome</TextoTh></Tabela>
            <Tabela align="left"><TextoTh>Empresa</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>PIS</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>CPF</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Data de Nascimento</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Telefone</TextoTh></Tabela>
            <TableBody>
              {funcionarios.map((funcionario) => (
                <TabelaRow key={funcionario.id}>
                  <Tabela component="th" scope="funcionario" align="left">
                  <TextoTr>{funcionario.nome}</TextoTr>
                  </Tabela>
                  <Tabela align="left"><TextoTr>{funcionario.idEmpresa.razaoSocial}</TextoTr></Tabela>
                  <Tabela align="right"><TextoTr>{funcionario.pis.pis()}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{funcionario.cpf.cpf()}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{format(new Date(funcionario.dataNascimento), 'dd/MM/yyyy')}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{funcionario.telefone.numero()}</TextoTr></Tabela>
                   <Tabela align="center" style={{minWidth: 150}}>
                     <ButtonIcon
                        onClick = {() => {
                          history.push('/funcionarioHorario', { id: funcionario.id })
                        }}
                      >
                        <DateRangeIconRounded 
                          fontSize="small" 
                          style={{marginTop: '3px'}}
                        />
                      </ButtonIcon>
                    <ButtonIcon 
                      onClick={() => {
                        handleFuncionario(funcionario.id);
                      }}
                    >
                      <EditIcon 
                        fontSize="small"
                        style={{textAlign: 'center', marginTop: '3px'}}
                      />
                    </ButtonIcon>
                    <ButtonIconD
                      onClick={() => {
                        OpenAlert(funcionario.id, removeFuncionario)
                      }}
                    >
                      <DeleteForeverIcon 
                        fontSize="small" 
                        style={{marginTop: '3px'}}/>                    
                    </ButtonIconD>
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
            <Tabela align="left"><TextoTh>Razão Social</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Código da Empresa</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Cnpj</TextoTh></Tabela>
            <TableBody>
              {empresas.map((empresa) => (
                <TabelaRow key={empresa.id}>
                  <Tabela component="th" scope="empresa" align="left">
                  <TextoTr>{empresa.razaoSocial}</TextoTr>
                  </Tabela>
                  <Tabela align="center"><TextoTr>{empresa.codEmpresa}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{empresa.cnpj.cnpj()}</TextoTr></Tabela>
                  <Tabela align="center">
                    <ButtonU 
                      onClick={() => {
                        handleEmpresa(empresa.id);
                      }}
                    >
                      Atualizar
                    </ButtonU>

                    <ButtonD 
                      onClick={() => {
                        OpenAlert(empresa.id, removeEmpresa)
                      }}
                    >
                      Excluir
                    </ButtonD>
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
          <Table aria-label="Tabela Detalhes do Horário">
            <Tabela align="center"><TextoTh>Código do Dia</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Entrada</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Intervalo</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Retorno do Intervalo</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saida</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Folga</TextoTh></Tabela>
            <TableBody>
              {horarioDetalhes.map(horarioDetalhe => (
                <TabelaRow key={horarioDetalhe.id}>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.codigoDia}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.entrada1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.saida1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.entrada2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.saida2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{horarioDetalhe.folga ? 'VERDADEIRO' : 'FALSO'}</TextoTr></Tabela>
                  <Tabela align="center">
                    <ButtonU 
                      onClick={() => {
                        handleHorarioDetalhes(horarioDetalhe.id);
                      }}
                    >
                      Atualizar
                    </ButtonU>
                    <ButtonD 
                      onClick={() => {
                        OpenAlert(horarioDetalhe.id, removeHorarioDetalhe)
                      }}
                    >
                      Excluir
                    </ButtonD>
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
      marginRight: 15
    }

    return(
        <TableContainer component={Paper} className={classes.tableH}>
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
                      onClick={() => {
                        history.push('/horarioDetalhes', {id: horario.id, descHorario: horario.descHorario});
                      }}
                    >
                      Detalhes
                    </ButtonU>

                    <ButtonU
                      onClick={() => {
                        handleHorario(horario.id);
                      }}
                    >
                      Atualizar
                    </ButtonU>

                    <ButtonD
                      onClick={() => {
                        OpenAlert(horario.id, removeHorario)
                      }}
                    >
                      Excluir
                    </ButtonD>
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
                <Tabela align="center">
                  <ButtonU
                    onClick={() => {
                      handleFuncionarioHorario(funcionarioHorario.id);
                    }}
                  >
                    Atualizar
                  </ButtonU>
                  <ButtonD 
                    onClick={() => {
                      OpenAlert(funcionarioHorario.id, removeFuncionarioHorario)
                    }}
                  >
                    Excluir
                  </ButtonD>
                </Tabela>
              </TabelaRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    )
}

    const TableA = ({ apontamentos, handleapontamento, removeapontamento }) => {

      const classes = useStyles();
  
      const [apontamento, setApontamento] = useState({});

      return(
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="Tabela Apontamentos">
            <Tabela align="center"><TextoTh>Funcionário</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Horario</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Data</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Primeira Entrada</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saida Almoço</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Volta Almoço</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Horário Final</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Total Trabalhado</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saldo Hora Extra</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saldo Atraso</TextoTh></Tabela>
            <TableBody>
              {apontamentos.map(apontameto => (
                <TabelaRow key={apontameto.id}>
                  <Tabela component="th" scope="Funcionário-Horario" align="center">
                  <TextoTr>{apontameto.funcionario.nome}</TextoTr>
                  </Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.horarioDetalhes.horario.descHorario}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.data}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.entrada1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.saida1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.entrada2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.saida2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.totalTrabalhado}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.saldoHe}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontameto.saldoAtraso}</TextoTr></Tabela>

                  {/* <Tabela align="center">
                    <ButtonU
                      onClick={() => {
                        handleapontamento(apontameto.id);
                      }}
                    >Atualizar
                    </ButtonU>
                  </Tabela>
                  <Tabela align="center">
                    <ButtonD 
                      onClick={() => {
                        OpenAlert(apontamento.id, removeapontamento)
                      }}
                    >Excluir
                    </ButtonD>
                  </Tabela> */}
                </TabelaRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
  
      )

  }

  export {TableF, TableE, TableHD, TableH, TableFH, TableA};
  
