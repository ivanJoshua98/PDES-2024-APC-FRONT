import React from 'react'
import Skeleton from '@mui/material/Skeleton';

const LoadingScreenOptions = () => {
  return (
    <Skeleton variant="rectangular" width={370} height={370} sx={{marginTop: '1rem'}}/>
  )
}

export default LoadingScreenOptions
