import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

const Searcher = () => {

    const navigate = useNavigate();

    const [keyWords, setKeyWords] = useState("heladera");

    const handleSubmit = () => {
      if(keyWords){
        navigate('/search-result/'.concat(keyWords.replace(/ /g, "%20")));
      }
    };

    const handleClick = () => {
      navigate('/search-result/'.concat(keyWords.replace(/ /g, "%20")));
    };
    

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width:'70%' }} >
            <TextField id="filled-basic-sercher"  
                       variant="outlined" 
                       placeholder='Busca productos marcas y mas...'
                       onChange={(event) => setKeyWords(event.target.value)}
                       slotProps={{
                        input: {
                          startAdornment: (
                            <InputAdornment position="start"  id='ejecute-search'>
                              <IconButton onClick={handleClick}>  
                                <SearchIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                        }}/>
    </Box>
  )
}

export default Searcher
