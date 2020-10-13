import React, { useState, useCallback, useEffect } from 'react';
import Modal from 'react-modal';
import MaskedInput from 'react-input-mask';

import api from '../../services/api';

import { Container, Button } from './styles';
const Funcionarios = () => {
    String.prototype.cpf = function(){
        let cpf = this.replace(/\D/g, '');

        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }

    String.prototype.numero = function(){
        let numero = this.replace(/\D/g, '');

        return numero.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    const [funcionarios, setFuncionarios] = useState([]);

    const loadFuncionarios = useCallback(
        async () => {
            try{
                const response = await api.get('funcionario');
                console.log(response.data);
                setFuncionarios(response.data);
            }catch(error){
                console.log(error);
            }
        }, [],
    )

    useEffect(
        () => {
            loadFuncionarios();
        }, [loadFuncionarios],
    )

    return(

        <Container>
            <Button>Adicionar</Button>

            <table>
                <thead>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Matricula</th>
                    <th>CPF</th>
                    <th>Data de nascimento</th>
                    <th>Telefone</th>
                </thead>
                <tbody>
                    {
                        funcionarios.map(funcionario => (
                            <tr>
                                <td>{funcionario.id}</td>
                                <td>{funcionario.nome}</td>
                                <td>{funcionario.codMatricula}</td>
                                <td>{funcionario.cpf.cpf()}</td>
                                <td>{funcionario.dataNascimento.join('/')}</td>
                                <td>{funcionario.telefone.numero()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </Container>
        
    );
}

export default Funcionarios;