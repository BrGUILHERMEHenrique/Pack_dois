import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Container, Menu } from './styles'
import Logo from '../../assets/pack.svg'
import Empresas from '../../pages/Empresas';
import Grid from '@material-ui/core/Grid';

const Header = () => {

    const [menuActivity, setMenuActivity] = useState(false);
    
    const menu = [
        {
            pagina: 'Empresas',
            rota: '/empresas'
        },
        {
            pagina: 'Funcionários',
            rota: '/funcionarios'
        },
        {
            pagina: 'Horários',
            rota: '/horarios'
        },
        {
            pagina: 'Apontamentos',
            rota: '/apontamentos'
        },
        {
            pagina: 'Ponto',
            rota: '/ponto'
        }
        

    ] 

    const ativo = {
        color:'#CE0E2D'
        }
    
    const styles = {
        color: 'black',
        
        }

    const resizeMenu = () => {
        if (window.scrollY >= 80) {
            setMenuActivity(true)
        } else {
            setMenuActivity(false);
        }
    }

    window.addEventListener('scroll', resizeMenu);

    const activeMenuImage = {
        width: '10%'
    }

    const inactiveMenuImage = {
        width: '25%'
    }

    const activeMenuContainer = {
        backgroundColor: '#fff',
        padding: '0.9%'
    }

    const inactiveMenuContainer = {
        padding: '2%',
        marginBottom: '4%'
        
    }

    const activeMenuLink = {
       color: '#7B7B7B',
       textDecoration: 'none',
       fontSize: '0.9em',
       padding: '15px'

    }

    const inactiveMenuLink = {
        textDecoration: 'none',
        padding: '15px',
        color: '#7B7B7B'
    }


    return (
        <Container 
        style={!menuActivity ?  inactiveMenuContainer : activeMenuContainer }
            container 
            direction="row"
            alignItems="center"
        >
            <Image
            style={!menuActivity ?  inactiveMenuImage : activeMenuImage }
            src = {Logo} />
            <Menu>
                { menu.map(s => (
                    <NavLink style={menuActivity ? activeMenuLink : inactiveMenuLink }
                            activeStyle={ativo} exact to={s.rota}>
                        {s.pagina}
                    </NavLink>
                ))}
                <a style={menuActivity ? activeMenuLink : inactiveMenuLink }>
                    Sair
                </a>
            </Menu>
        </Container>
    )

}

export default Header;