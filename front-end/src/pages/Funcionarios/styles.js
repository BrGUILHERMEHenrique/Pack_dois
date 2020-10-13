import styled from 'styled-components';

export const Container = styled.div`

    padding: 20px;
    width: 100vw;
    height: 100vh;
    display: flex;

`;

export const Button = styled.button`

    width: 7vw;
    height: 7vh;

    color: #fff;
    border: 0;
    border-radius: 5px;
    background-color: blue;

    &:hover{
        background-color: darkblue;
        cursor: pointer;
    }

`;