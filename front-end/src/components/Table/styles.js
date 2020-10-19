import styled from 'styled-components';

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

export const ModalBody = styled.div`
    display: flex:
    justify-content: center;
    align-items: center;
    margin: auto;
`;

export const ModalText = styled.h2`
    font-weight: bold;
    font-size: 26px;
`;