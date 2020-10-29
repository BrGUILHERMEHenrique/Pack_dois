import React, { useState, useEffect, useCallback } from 'react';
import { Container, FormModal, HeaderModal, ContainerInputs, FooterModal, SubTitulo, Row, Button} from './styles';

import api from '../../services/api';

import { TableA } from '../../components/Table';

const Apontamento = () => {

    const [apontamentos, setApontamentos] = useState([]);


    const loadApontamentos = useCallback (
        async () => {
            try {
                const response = await api.get('apontamento');
                setApontamentos(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
        }, []
    )

    useEffect(
        () => {
            loadApontamentos();
        }, [loadApontamentos]
    )

    return(
        <Container>
            <Row>
                <SubTitulo>
                    Apontamentos
                </SubTitulo>
            </Row>

        <TableA apontamentos={apontamentos} />
        </Container>
    )
    
}

export default Apontamento;