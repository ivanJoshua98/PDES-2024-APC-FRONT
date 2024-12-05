import React from 'react';
import Grid from '@mui/material/Grid2';
import Skeleton from '@mui/material/Skeleton';


const LoadingScreenOptionsSearch = () => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} width='80%' marginTop='1rem'
          sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        {Array.from(Array(6)).map((_, index) => (
        <Grid key={index} >
            <Skeleton variant="rectangular" width={270} height={270} />
        </Grid>
        ))}
    </Grid>
  )
}

export default LoadingScreenOptionsSearch
