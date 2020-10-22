import Styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

export const Image = Styled.img`
    width: 30%;
    
`

export const Container = Styled(Grid)`
    padding: 40px;
    margin-bottom: 40px;
    justify-content: space-around;
    flex:1;
    display: flex;
`

export const Menu = Styled(Grid)`
    margin-top: 30px;
    font-size: 1.1em;
    font-family: 'Oxanium', cursive;

`

export const Link = Styled.a`
    padding: 15px;
    text-decoration: 'none'
`
