import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)`
    padding: 20px;
`;  

export const SubTitulo = styled.p`
    margin: 10px 40px 10px 3%;
    font-family: 'Oxanium', cursive;
    font-size: 2.4rem;
    color: #942a37
`

export const Row = styled(Grid)`
    align-items: center;
    margin-top: 15%;

`
export const Button = styled.button`
    width: 85px;
    height: 35px;
    color: rgba(103, 102, 106, 0.6);
    border: 0;
    border-radius: 5px;
    background-color: rgba(103, 102, 106, 0.6); 
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: rgba(103, 102, 106, 0.6);
        cursor: pointer;
        color: black;
    }

`;

export const FormModal = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    font-family: 'Oxanium', cursive;

    input{
        border: 0;
        outline: none;
        color: #3a3a3a;
    }

 `;

export const ContainerInputs = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Oxanium', cursive;
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
    justify-content: center;
    align-items: flex-end;
    margin-top: 10%;

    Button+Button{
        margin-left: 10px;
    }
`;
