import Styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Image = Styled.img`
    align-items: center;
    
`

export const Container = Styled(Grid)`
    margin: 0;
    justify-content: space-around;
    display: flex;
    align-items: center;
    background-color: white;
    position: fixed;
    color: rgb(162, 169, 173);
    flex-wrap: wrap;

`

export const Menu = Styled(Grid)`
    font-size: 1.1em;
    font-family: 'Oxanium', cursive;
    color: rgb(162, 169, 173);
`
