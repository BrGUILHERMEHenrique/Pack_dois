import React, { useCallback, useEffect, useState } from 'react';


const FuncionarioHorario = ({ location }) => {
    const id = location.state.id;

    return(
        <h1>Id Funcionário: {id}</h1>
        
    )
}


export default FuncionarioHorario;