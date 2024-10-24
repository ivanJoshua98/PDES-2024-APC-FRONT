import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AttributeController from '../controller/AttributeController';
import {Box, IconButton, Tooltip } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AttributesTable = (props) => {

    const id = props.productId;

    const [attributes, setAttributes] = useState([]);

    const [rows, setRows] = useState(5);

    const [collapseAttributeButton, setCollapseAttributeButton] = useState(false);

    const showMoreAttributes = () => {
        var n = attributes.length;
        setRows(n);
        setCollapseAttributeButton(true)
    }


    const collapseAttributes = () => {
        setRows(5);
        setCollapseAttributeButton(false)
    }

    useEffect(() => {
        AttributeController.getProductAttributesByProductId(id).then(res => {
            setAttributes(res.data);
        }).catch(error => console.log('error:', error));
    }, [id]);
    

  return (
    <TableContainer component={Paper} sx={{width: '80%', marginBottom: '1rem'}}>
        <Toolbar sx={{backgroundColor: 'black'}}>
            <AnalyticsIcon fontSize='large' sx={{color: 'white'}}/>
            <Typography variant="h5" component="div" fontWeight='bold' color='white'>
                Caracteristicas
            </Typography>
        </Toolbar>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableBody>
                {attributes.slice(0, rows).map((row) => (
                    <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                            {row.name}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row" align="center">
                            {row.value}
                        </StyledTableCell>
                    </StyledTableRow>
                ))}
            </TableBody>
      </Table>
      <Box sx={{display:'flex', justifyContent: 'center'}}>
        {collapseAttributeButton ? 
        <Tooltip title='Ocultar caracteristicas'>
            <IconButton onClick={collapseAttributes}>
                <ExpandLessIcon fontSize='medium'/>
            </IconButton> 
        </Tooltip> :
        <Tooltip title='Mostrar mas caracteristicas'>
            <IconButton onClick={showMoreAttributes}>
                <ExpandMoreIcon fontSize='medium'/>
            </IconButton>                         
        </Tooltip>  }
      </Box>
    </TableContainer>
  );
}

export default AttributesTable
