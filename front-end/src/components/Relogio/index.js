import React, { useEffect, useState, useCallback } from 'react';

const relogioStyles = {
    marginTop: '50px',
    fontSize: '5em',
    color: 'rgb(103, 102, 106)'
}

const Relogio = () => {

    const [hora, setHora] = useState('');
    const [minuto, setMinuto] = useState('');
    const [segundo, setSegundo] = useState('');
    const dateNow = new Date();

    useEffect (
        () => {
            defineHora();
        }, [defineHora]
    )
    useEffect(
        () => {
            setInterval(() => {
                defineHora();
            }, 1000);
        }, [defineHora]
    ); 

    function defineHora() {
        let now     = new Date(); 
        let hour    = now.getHours();
        let minute  = now.getMinutes();
        let second  = now.getSeconds(); 
        if(hour.toString().length == 1) {
            hour = '0'+hour;
        }
        if(minute.toString().length == 1) {
            minute = '0'+minute;
        }
        if(second.toString().length == 1) {
            second = '0'+second;
        }  
        setMinuto(minute)
        setHora(hour)
        setSegundo(second)
    }

    return (
        <h2 style={relogioStyles}>{hora}:{minuto}:{segundo}</h2>
    )
}

export default Relogio;