import styled from 'styled-components';
// import Button from '@material-ui/core/Button';


export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 80vh;
    margin: auto;
    align-items: center;
    justify-content: center;

`;

export const ContainerButtons = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 60px;
    align-items: center;

    button + button {
        margin-left: 5vw;
    }
`;


export const Button = styled.button`
    width: 90px;
    height: 42px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: rgb(148, 42, 55);
    font-family: 'Oxanium', cursive;
    font-size: 13px;
    outline: none;
    padding: 4px;

    &:hover{
        background-color: rgba(148, 42, 55, 0.8);
        cursor: pointer;
    }
`;

export const ButtonInativo = styled.button`
    width: 90px;
    height: 42px;
    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: rgba(148, 42, 55, 0.7);;
    font-family: 'Oxanium', cursive;
    font-size: 0.6em;
    outline: none;
    padding: 4px;
`;

export const Clock = styled.h1`
    font-size: 150px;
    font-weight: bold;
    color: #3a3a3a;
    margin-top: 70px;

`;

export const ContainerLogin = styled.div`
    display: flex;
    flex-direction: row;
    height: 40px;
    margin-top: 200px;
    button {
        margin-left: 20px;
    }
`;