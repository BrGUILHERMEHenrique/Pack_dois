import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Image, Container, Menu } from './styles'
import Logo from '../../assets/ponto.svg'
import Empresas from '../../pages/Empresas';
import Grid from '@material-ui/core/Grid';

const ativo = {
    color:'#942a37'
    }
const activeMenuImage = {
    width: '10%'
}

const inactiveMenuImage = {
    width: '25%'
}

const activeMenuContainer = {
    padding: '0.9%',
    boxShadow: '1px 1px 2px 2px rgba(0, 0, 0, 0.1)'
}

const inactiveMenuContainer = {
    padding: '2%'
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

    const resizeMenu = () => {
        if (window.scrollY >= 70) {
            setMenuActivity(true)
        } else {
            setMenuActivity(false);
        }
    }

    window.addEventListener('scroll', resizeMenu);

    return (
        <Container 
            style={
                !menuActivity ?  
                inactiveMenuContainer 
                : 
                activeMenuContainer 
            }
            container 
            direction="row"
            alignItems="center"
        >
            <Image
                style={
                    !menuActivity ?  
                    inactiveMenuImage 
                    : 
                    activeMenuImage 
                }
                src = {Logo} 
            />
            <Menu>
                { menu.map(s => (
                    <NavLink 
                        style={
                            menuActivity ? 
                            activeMenuLink 
                            : 
                            inactiveMenuLink 
                        }
                        activeStyle={ativo} 
                        exact to={s.rota}
                    >
                        {s.pagina}
                    </NavLink>
                ))}
            </Menu>
        </Container>
    )

}

export default Header;