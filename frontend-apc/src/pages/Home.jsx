import React from 'react'
import Searcher from '../components/Searcher'
import { Box } from '@mui/material'
import Navbar from '../components/Navbar'

const Home = () => {

  return (
    <div>
        <Navbar></Navbar>
        <Box sx={{  height: {
                    xs: "10em",
                    md: "20em"},
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'}}>
            <Box sx={{  display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        height: '100%',
                        width: '60%'}}>
                <Searcher/>  
            </Box>
        </Box>
    </div>
  )
}

export default Home
