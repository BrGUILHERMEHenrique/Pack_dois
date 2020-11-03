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
import { pt } from 'date-fns/locale';

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
  if (willDelete) {
    swal('Removido com sucesso!', {
      icon: "success",
    });
    remove(id)
  } else {
    swal('Ação cancelada!', {
      icon: "error",
    });
      
  }
})
}


const TableF = ({ funcionarios, handleFuncionario, removeFuncionario }) =>{
    const classes = useStyles();
    const history = useHistory();

    return(
        <TableContainer component={Paper} className={classes.table}>
          <Table  aria-label="Tabela Funcionários">
          <tr>
            <Tabela align="left"><TextoTh>Nome</TextoTh></Tabela>
            <Tabela align="left"><TextoTh>Empresa</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>PIS</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>CPF</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Data de Nascimento</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Telefone</TextoTh></Tabela>
            </tr>
            <TableBody>
              {funcionarios.map((funcionario) => (
                <TabelaRow key={funcionario.id}>
                  <Tabela component="th" scope="funcionario" align="left">
                  <TextoTr>{funcionario.nome}</TextoTr>
                  </Tabela>
                  <Tabela align="left"><TextoTr>{funcionario.idEmpresa.razaoSocial}</TextoTr></Tabela>
                  <Tabela align="right" style={{minWidth: 150}}><TextoTr>{funcionario.pis.pis()}</TextoTr></Tabela>
                  <Tabela align="center" style={{minWidth: 150}}><TextoTr>{funcionario.cpf.cpf()}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{format(new Date(funcionario.dataNascimento.split("-")), 'dd/MM/yyyy')}</TextoTr></Tabela>
                  <Tabela align="center" style={{minWidth: 150}}><TextoTr>{funcionario.telefone.numero()}</TextoTr></Tabela>
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
            <tr>
            <Tabela align="left"><TextoTh>Razão Social</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Código da Empresa</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Cnpj</TextoTh></Tabela>
            </tr>
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
          <Table aria-label="Tabela Empresas">
            <tr>
            <Tabela align="center"><TextoTh>Entrada</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Intervalo</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Retorno do Intervalo</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saida</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Folga</TextoTh></Tabela>
           </tr>
            <TableBody>
              {horarioDetalhes.map(horarioDetalhe => (
                <TabelaRow key={horarioDetalhe.id}>
                  {/* <Tabela component="th" scope="Detalhes de horário" align="center">
                  <TextoTr>{horarioDetalhe.id}</TextoTr>
                  </Tabela> */}
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
            <tr>
            {/* <Tabela align="center"><TextoTh>Id</TextoTh></Tabela> */}
            <Tabela align="center"><TextoTh>Codigo do Horário</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Descrição do Horário</TextoTh></Tabela>
            </tr>
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
          <tr>
          <Tabela align="center"><TextoTh>Nome</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>Codigo Inicial</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>Descrição Horário</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>VIgência Inicial</TextoTh></Tabela>
          <Tabela align="center"><TextoTh>Vigência Final</TextoTh></Tabela>
          </tr>
          <TableBody>
            {funcionarioHorarios.map(funcionarioHorario => (
              <TabelaRow key={funcionarioHorario.id}>
                <Tabela component="th" scope="Funcionário-Horario" align="center">
                <TextoTr>{funcionarioHorario.idFuncionario.nome}</TextoTr>
                </Tabela>
                <Tabela align="center"><TextoTr>{funcionarioHorario.codigoInicial}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{funcionarioHorario.idHorario.descHorario}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{format( new Date(funcionarioHorario.vigenciaInicial.split("-")), 'dd/MM/yyyy', { locale: pt })}</TextoTr></Tabela>
                <Tabela align="center"><TextoTr>{format(new Date(funcionarioHorario.vigenciaFinal.split("-")), 'dd/MM/yyyy')}</TextoTr></Tabela>
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

    const TableA = ({ apontamentos, handleApontamento, removeApontamento }) => {

      const classes = useStyles();
  
      const [apontamento, setApontamento] = useState({});
      const toSlash = (data) => {
        const dd = data.slice(8,10)
        const MM = data.slice(5,7)
        const YYYY = data.slice(0,4)
        return dd + "/" + MM + "/" + YYYY
      }

      return(
        <TableContainer component={Paper} className={classes.table}>
          <Table aria-label="Tabela Apontamentos">
            <tr>
            <Tabela align="center"><TextoTh>Horario</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Data</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Primeira Entrada</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saida Almoço</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Volta Almoço</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Horário Final</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Total Trabalhado</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saldo Hora Extra</TextoTh></Tabela>
            <Tabela align="center"><TextoTh>Saldo Atraso</TextoTh></Tabela>
            </tr>
            <TableBody>
              {apontamentos.map(apontamento => (
                <TabelaRow key={apontamento.id} color={!apontamento.horarioDetalhes.horario ? "#C6C6C6" : ''}>
                    <Tabela align="center">
                    {apontamento.horarioDetalhes.horario === null ? 
                    <TextoTr>Fora da vigência</TextoTr>
                    :
                    <TextoTr>{apontamento.horarioDetalhes.horario.descHorario}</TextoTr>
                    }
                  </Tabela> 
                  <Tabela align="center"><TextoTr>{apontamento.data}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontamento.entrada1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontamento.saida1}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontamento.entrada2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontamento.saida2}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr>{apontamento.totalTrabalhado}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr color={apontamento.saldoHe === "00:00:00" ? '' : '#00BC22'}>{apontamento.saldoHe}</TextoTr></Tabela>
                  <Tabela align="center"><TextoTr color={apontamento.saldoAtraso === "00:00:00" ? '' : 'red'}>{apontamento.saldoAtraso}</TextoTr></Tabela>
                  <Tabela align="center">
                    <ButtonU
                      onClick={() =>{
                        handleApontamento(apontamento.id);  
                      }}>
                        Editar
                      </ButtonU>
                  </Tabela>
                  

                  {/* <Tabela align="center">
                    <ButtonU
                      onClick={() => {
                        handleapontamento(apontamento.id);
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
  
