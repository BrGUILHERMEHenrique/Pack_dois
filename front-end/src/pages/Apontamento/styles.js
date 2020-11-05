import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Container = styled(Grid)`
    padding: 20px;
`;  

export const SubTitulo = styled.p`
    margin: 10px 40px 10px 53px;
    font-family: 'Oxanium', cursive;
    font-size: 2.4rem;
    color: #942a37
`;

export const Row = styled(Grid)`
    align-items: center;
    margin-top: 15%;
`;

export const SearchContainer = styled(Grid)`
    margin-right: 25px;
`;

export const InputMonth= styled.input`
margin-top: 7px;
    font-family: 'Oxanium', cursive;
    width: 190px;
    outline: none;
    border: none;
    border-bottom: solid 0.5px grey;
    font-size: 1em;
`;

export const InputRow = styled(Grid)`
margin-left: 53px;
margin-top: 2%;
align-items: center;
`;

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
        background-color: rgba(103, 102, 106, 0.4);
        color: white;
    }
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
    margin-bottom: 10%;
    width: 100%;
    justify-content: center;
`;

export const HeaderModal = styled.div`
    flex-direction: row;
    margin-left: 3.5%;
    margin-top: 5%;
    font-family: 'Oxanium', cursive;
    
    h2 {
        font-size: 2em;
        font-weight: normal;
        color: #67666a;    
    }
`;

export const FooterModal = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-right: 5%;
    align-items: flex-end;
    margin-bottom: 1%;

    Button+Button{
        margin-left: 10px;
    }
`;

export const inputStyle = {
    horario: {
        width: '8vw',
        height: '100%',
        marginRight: '10px',
        marginTop: '3%', 
    },
    horarioUp: {
        width: '8vw',
        height: '100%',
        marginRight: '10px',
        marginTop: '3%', 
    },
    empresa: {
        width: '240px',
        maxWidth: '240px',
        height: '100%',
        fontFamily: 'Oxanium, cursive'
    },
    funcionario: {
        width: '240px',
        maxWidth: '240px',
        height: '100%',
        fontFamily: 'Oxanium, cursive'
    },
    data: {
        width: '240px',
        maxWidth: '240px',
        marginTop: '100px',
        height: '100%'
    },
    label: {
        fontFamily: 'Oxanium, cursive'
    }
    
};

export const modalStyle = {
    content: {
        width               : '550px',
        height              : '300px',
        top                 : '50%',
        left                : '50%',
        right               : 'auto',
        bottom              : 'auto',
        marginRight         : '-50%',
        transform           : 'translate(-50%, -50%)'
    }
};