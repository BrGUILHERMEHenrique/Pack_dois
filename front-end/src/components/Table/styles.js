import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';


export const Tabela = styled(TableCell)`
    
`

export const TabelaRow = styled(TableRow)`

    &:nth-child(even) {
        background-color: rgba(162, 169, 173, 0.1);
        &:hover {   
            background-color: rgba(162, 169, 173, 0.3)
        }
    }

    &:nth-child(odd) {
        &:hover {
            background-color: rgba(166,169,173,0.3);
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


export const ButtonU = styled.button`
    width: 85px;
    height: 35px;
    color: #A2A9AD;
    border: 2px solid #A2A9AD;
    border-radius: 5px;
    background-color: transparent;
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: #A2A9AD;
        cursor: pointer;
        color: white;
    }

`;



export const ButtonD = styled.button`
    width: 85px;
    height: 35px;
    color: rgba(206,14,45,0.8);
    border: 2px solid rgba(206,14,45,0.7) ;
    border-radius: 5px;
    background-color: transparent;
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: rgba(206,14,45,0.9) ;
        cursor: pointer;
        color: white;
    }

`;

export const Button = styled.button`
    width: 85px;
    height: 35px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: #A2A9AD;
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: white;
        cursor: pointer;
        color: black;
    }

`;