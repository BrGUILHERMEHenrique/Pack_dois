//importação padrão do react 
import React from 'react';
//imortação para construir a tabela com material ui
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//styles criado através do material para a tabela
const useStyles = makeStyles({
    table: {
      minWidth: "480px",
      width: "70vw",
      height: "auto"
    },
  });
  

  //protoypes que formataram os dados em tela  
  String.prototype.cpf = function(){
      let cpf = this.replace(/\D/g, '');

      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

  String.prototype.numero = function(){
      let numero = this.replace(/\D/g, '');

      return numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
}
  
  const TableF = ({ funcionarios }) =>{
    const classes = useStyles();
    
    function createData(Nome, Matricula, CPF, Data_de_nascimento, Telefone) {
      return { Nome, Matricula, CPF, Data_de_nascimento, Telefone };
    }
      return(
        <TableContainer component={Paper} className={classes.table}>
        <Table  aria-label="Tabela Funcionários">
          <TableHead>
            <TableRow>

              <TableCell align="right">Nome</TableCell>
              <TableCell align="right">Matricula</TableCell>
              <TableCell align="right">CPF</TableCell>
              <TableCell align="right">Data de nascimento</TableCell>
              <TableCell align="right">Telefone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id}>
                <TableCell component="th" scope="funcionario" align="right">
                  {funcionario.nome}
                </TableCell>

                <TableCell align="right">{funcionario.codMatricula}</TableCell>
                <TableCell align="right">{funcionario.cpf.cpf()}</TableCell>
                <TableCell align="right">{funcionario.dataNascimento.join('/')}</TableCell>
                <TableCell align="right">{funcionario.telefone.numero()}</TableCell>
                <TableCell align="right"><Button variant="contained" color="primary">Atualizar</Button></TableCell>
                <TableCell align="right"><Button variant="outlined" color="primary">Apagar</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      )
  }

  export default TableF;