import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';


export const Container = styled(Grid)`
    padding: 20px;

`;  

export const SubTitulo = styled.p`
    margin: 10px 40px 10px 9%;
    font-family: 'Oxanium', cursive;
    font-size: 2.4rem;
    color: rgb(206,14,45)
    

`

export const Row = styled(Grid)`
    align-items: center;
    margin-top: 15%;

`

export const Button = styled.button`
    width: 85px;
   height: 35px;
   color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: rgba(162, 169, 173,0.9); 
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
    justify-content: center;
    margin-top: 5%;
    font-family: 'Oxanium', cursive;


    input{
        margin-top: 5%;
    }

`;

export const ContainerInputs = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    font-family: 'Oxanium', cursive;
    margin-bottom: 8%;
    width: 100%;
    justify-content: center;

`;

export const HeaderModal = styled.div`
    flex-direction: row;
    text-align: center;
    margin-top: 5%;
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
    margin-bottom: 1%;

    Button+Button{
        margin-left: 10px;
    }
`;

