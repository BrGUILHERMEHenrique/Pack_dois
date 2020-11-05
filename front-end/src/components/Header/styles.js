import Styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Image = Styled.img`
    align-items: center;
    margin-left: 3%;
`;

export const Container = Styled(Grid)`
    justify-content: space-between;
    display: flex;
    align-items: center;
    background-color: white;
    position: fixed;
    flex-wrap: wrap;
`;

export const Menu = Styled(Grid)`
    font-size: 1.1em;
    font-family: 'Oxanium', cursive;
    color: #67666a;
    margin-right: 3%;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    text-align: center;
`;

export const ativo = {
    color:'#942a37'
    }
export const activeMenuImage = {
    width: '10%'
}

export const inactiveMenuImage = {
    width: '25%'
}

export const activeMenuContainer = {
    padding: '0.9%',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)',
    zIndex: '1'
}

export const inactiveMenuContainer = {
    padding: '2%'
}

export const activeMenuLink = {
    color: '#7B7B7B',
    textDecoration: 'none',
    fontSize: '0.9em',
    padding: '15px'
}

export const inactiveMenuLink = {
    textDecoration: 'none',
    padding: '15px',
    color: '#7B7B7B'
}