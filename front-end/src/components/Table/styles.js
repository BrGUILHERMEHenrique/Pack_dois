import { TableCell, TableRow, Paper } from '@material-ui/core';
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

export const TableOptions = styled(Paper)`
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    padding: 12px 16px;
    z-index: 1;
    display: inline-block;

`;

export const ButtonIcon = styled.button`
width: 32px;
height: 30px;
color: #A2A9AD;
border: 2px solid #A2A9AD;
border-radius: 10px;
background-color: transparent;
outline: none;

&:hover{
    background-color: #A2A9AD;
    cursor: pointer;
    color: white;
}

&+button {
    margin-left: 8px;
}

`

export const ButtonIconD = styled.button`
width: 32px;
height: 30px;
color: rgba(206,14,45,0.7);
border: 2px solid rgba(206,14,45,0.7);
border-radius: 10px;
background-color: transparent;
outline: none;

&:hover{
    background-color: rgba(206,14,45,0.9);
    cursor: pointer;
    color: white;
}

&+button {
    margin-left: 8px;
}

`

export const MenuList = styled.div`
    position: relative;
    display: inline-block;

    &:hover Paper{

    }

`

export const ButtonU = styled.button`
    width: 75px;
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
    width: 70px;
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