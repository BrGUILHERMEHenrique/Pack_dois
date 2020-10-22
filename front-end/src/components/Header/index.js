import React from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Container, Menu, Link } from './styles'
import Logo from '../../assets/logo1.png'
import Empresas from '../../pages/Empresas';
import Grid from '@material-ui/core/Grid';

const Header = () => {
    
    const menu = [
        {
            pagina: 'Empresas',
            rota: '/empresas'
        },
        {
            pagina: 'Funcionarios',
            rota: '/funcionarios'
        },
        {
            pagina: 'Horarios',
            rota: '/horarios'
        }

    ] 

    const ativo = {
        color:'grey'
        }
    
    const styles = {
        color: 'black',
        textDecoration: 'none'
        }

    return (
        <Container 
            container 
            direction="row"
            alignItems="center"
        >
            <Image src = {Logo} />
            <Menu>
                { menu.map(s => (
                    <Link>
                    <NavLink style={styles} activeStyle={ativo} exact to={s.rota}>
                        {s.pagina}
                    </NavLink>
                    </Link>
                ))}
                <Link>
                    Sair
                </Link>
            </Menu>
        </Container>
    )

}

export default Header;