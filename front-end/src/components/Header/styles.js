import Styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Image = Styled.img`
    align-items: center;
    margin-left: 3%;
    
`

export const Container = Styled(Grid)`
    justify-content: space-between;
    display: flex;
    align-items: center;
    background-color: white;
    position: fixed;
    flex-wrap: wrap;


`

export const Menu = Styled(Grid)`
    font-size: 1.1em;
    font-family: 'Oxanium', cursive;
    color: #67666a;
    margin-right: 3%;
    flex-wrap: wrap;
    display: flex;
    justify-content: center;
    text-align: center;

`
