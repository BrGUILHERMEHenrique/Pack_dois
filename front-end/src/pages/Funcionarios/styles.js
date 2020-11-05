import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)`
    padding: 20px;
`;  

export const SubTitulo = styled.p`
    margin: 10px 40px 10px 46px;
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
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: rgba(103, 102, 106, 0.7); 
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: rgba(131,151,176,0.2);
        cursor: pointer;
        color: black;
    }

`;


export const SearchContainer = styled(Grid)`
    margin-left: 48em;

`;

export const ButtonCancel = styled.button`
    width: 85px;
    height: 35px;
    color: rgba(103, 102, 106, 0.7);
    border: none;
    border-radius: 5px;
    background-color: transparent;
    font-family: 'Oxanium', cursive;
    outline: none;

    &:hover{
        background-color: rgba(103, 102, 106, 0.4);
        color: white;
    }

    &+button {
        margin-left: 8px;
    }

`;

export const FormModal = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
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
    margin-left: 8.5%;
    margin-top: 5%;
    font-family: 'Oxanium', cursive;
    
    h2{
        font-size: 2em;
        font-weight: normal;
        color: #67666a;

    }
`;

export const FooterModal = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 12%;
    margin-right: 8.5%;

    Button+Button{
        margin-left: 10px;
    }
`;


export const inputStyle = {
    nome: {
        width: '450px',
        height: '64%',
    },
    matricula: {
        width: '100%',
        height: '100%',
        marginTop: '19px',
        marginRight: '10px'
    },
    cpf: {
        width: '25%',
        height: '25%',
        marginTop: '3%', 
        marginRight: '10px'

    }, 
    data: {
        width: '30%',
        height: '30%',
        marginTop: '3%',
        marginRight: '10px'
    },
    tel: {
        width: '25%',
        height: '25%',
        marginTop: '3%'
        
    },
    empresa: {
        width: '100%',
        height: '100%',
        marginTop: '3px'
    },
    dataUp: {
        width: '177px',
        height: '50%',
        marginRight: '10px',
        marginTop: '10px'
    },
    telUp: {
        width: '177px',
        height: '50%',
        marginTop: '10px'
    },
    nomeUp: {
        width: '364px',
        height: '55%',
    },
    label: {
        fontFamily: 'Oxanium, cursive'
    },
    empresaSearch: {
        width: '350px',
        maxWidth: '350px',
        height: '100%',
        fontFamily: 'Oxanium, cursive'
    }
};

export const modalStyleAtualizar = {
    content: {
        width               : '480px',
        height              : '320px',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
};

export const modalStyleAdicionar = {
    content: {
        width               : '580px',
        height              : '390px',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
}

