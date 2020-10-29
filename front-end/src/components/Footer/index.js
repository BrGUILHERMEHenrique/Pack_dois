import React from 'react';
import { Image, Container } from './styles';
import Logo from '../../assets/pack.svg';


const Footer = () => {

    const styles ={
        color: '#CE0E2D'
    }
    
    return <Container
            container
            direction="row"
            alignItems="center"
            >
                <Image src= {Logo} />
            </Container>
}

export default Footer