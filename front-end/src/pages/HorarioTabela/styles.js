import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const FormModal = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;


    input{
        width: 90%;
        height: 40%;
        padding: 6px;
        flex: 1;

        border: 0;
        outline: none;

        color: #3a3a3a;

        margin-top: 10px;


        &#date{
            border: 0;
        }
        &#tel{
            border: 0;  
        }

        &#cpf{
            border: 0; 
        }
    }

`;

export const Row = styled(Grid)`
    align-items: center;

`;

export const SubTitulo = styled.p`
    margin: 10px 40px 10px 9%;
    font-family: 'Oxanium', cursive;
    font-size: 2.4rem;

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
        background-color: rgba(131,151,176,0.2);
        cursor: pointer;
        color: black;
    }

`;

export const Container = styled(Grid)`
    padding: 20px;
`;  