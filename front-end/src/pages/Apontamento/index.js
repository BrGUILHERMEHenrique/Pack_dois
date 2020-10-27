import React, { useState, useEffect, useCallback } from 'react';

import api from '../../services/api';

import { TableA } from '../../components/Table';

const Apontamento = () => {

    const [apontamentos, setApontamentos] = useState([]);


    const loadApontamentos = useCallback (
        async () => {
            try {
                const response = await api.get('apontamentos');
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
        <>
        <TableA apontamentos={apontamentos} />
        </>
    )
    
}

export default Apontamento;