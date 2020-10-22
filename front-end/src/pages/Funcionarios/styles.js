import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)`
    padding: 20px;
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

export const FormModal = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 40px;
    font-family: 'Oxanium', cursive;


    input{
        width: 100%;
        height: 100%;
        border: 0;
        outline: none;
        color: #3a3a3a;
        margin-top: 20px;

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

export const ContainerInputs = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Oxanium', cursive;

`;


export const Row = styled(Grid)`
    align-items: center;

`

export const HeaderModal = styled.div`
    flex-direction: row;
    text-align: center;
    margin-top: 50px;
    font-family: 'Oxanium', cursive;
    h2{
        font-size: 2em;
        font-weight: normal;

    }
`;

export const FooterModal = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 10%;

    Button+Button{
        margin-left: 10px;

    }
`;

