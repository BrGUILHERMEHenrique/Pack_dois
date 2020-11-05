import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/ponto.svg';
import { Image, Container, Menu, ativo, activeMenuImage, inactiveMenuImage, activeMenuContainer, inactiveMenuContainer, activeMenuLink, inactiveMenuLink } from './styles';

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
                    <NavLink key={s.rota}
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