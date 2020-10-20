import styled from 'styled-components';

export const HeaderModal = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    h2{
        font-size: 30px;
        font-weight: bold;
    }
`;

export const FooterModal = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    margin-top: 10%;

    Button+Button{
        margin-left: 10px;

    }
`;

export const ModalBody = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

`;

export const ModalText = styled.h2`
    font-weight: bold;
    font-size: 26px;
`;
