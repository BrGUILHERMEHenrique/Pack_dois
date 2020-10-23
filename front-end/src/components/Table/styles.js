import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';


export const Tabela = styled(TableCell)`
    
`

export const TabelaRow = styled(TableRow)`
    &:nth-child(even) {
        background-color: rgba(131,151,176,0.1);
        &:hover {
            background-color:rgba(131,151,176,0.3);
        }
    }

    &:nth-child(odd) {
        &:hover {
            background-color:rgba(131,151,176,0.2);
        }
    }

`;

export const TextoTh = styled.p`
    font-size: 1rem;
    font-family: 'Oxanium', cursive;
    font-weight: bold;

`;

export const TextoTr = styled.p`
    font-size: 0.9rem;
    font-family: 'Oxanium', cursive;

`;


export const Button = styled.button`
    width: 85px;
    height: 35px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: #8397B0;
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: white;
        cursor: pointer;
        color: black;
    }

`;

