import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import styled from 'styled-components';

export const Tabela = styled(TableCell)`

`

export const TabelaRow = styled(TableRow)`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`