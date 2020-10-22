import styled from 'styled-components';

export const Container = styled.div`

    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;

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

export const ContainerInputs = styled.div`
    display: flex;
    flex-direction: row;
`;

export const HeaderModal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h2{
        margin-left: 42%;
        font-size: 30px;
        font-weight: bold;
    }
`;

export const FooterModal = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 20%;

    Button+Button{
        margin-left: 10px;

    }
`;
