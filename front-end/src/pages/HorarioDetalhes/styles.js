import styled from 'styled-components';


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