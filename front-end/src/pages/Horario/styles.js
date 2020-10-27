import styled from 'styled-components';

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
        margin-left: 40px;
    }
`;