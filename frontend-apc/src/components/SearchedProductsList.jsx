import React, { useEffect, useState } from 'react'
import { ImageList, ImageListItem, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import ProductController from '../controller/ProductController';
import { useParams } from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';

function SearchedProductsList() {

    let {keyWords} = useParams();

    const [products, setProducts] = useState([]);

    const matches = useMediaQuery('(min-width:900px)');

    const matches2 = useMediaQuery('(min-width:750px)');


    useEffect(() => {
        ProductController.searchProductsByWords(keyWords).then(res => {
            setProducts(res.data);
        }).catch(error => console.log('error:', error));
    }, [keyWords]);


    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
      }),
    }));

  
    const theme = createTheme({
      components: {
        // Name of the component
        MuiImageListItem: {
          styleOverrides: {
            // Name of the slot
            root: {
              objectFit: 'scale-down',
              width: '270px',
              height: '270px',
              backgroundColor: 'white',
            },
            img: {
              // Some CSS
              objectFit: 'scale-down',
              width: '270px',
              height: '270px',
              backgroundColor: 'white',
            },
          },
        },
      },
    });


  return (
    <Box sx={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'}}>

      <ImageList cols={matches ? 3 : (matches2 ? 2 : 1)} >
            {products.map((item) => (
                <ThemeProvider theme={theme} key={item.id}>
                  <ImageListItem key={Object.keys(item.pictures)[1]} 
                                sx={{border: '1px solid #afafaf', 
                                      margin: 1,
                                      }}>
                      <img srcSet={`${item.pictures[0]}`}
                        src={`${item.pictures[0]}`}  
                        alt={item.title}
                        loading="lazy"/>
                      <Box sx={{ width: '100%' }}>
                        <Grid container rowSpacing={1} columnSpacing={2}>
                          <Grid size={12}>
                            <Item elevation={0} sx={{fontSize: 'medium', fontWeight: 'bold'}}>{item.title}</Item>
                          </Grid>
                          <Grid size={6}>
                            <Item elevation={0} sx={{fontSize: 'larger', fontWeight: 'bold'}}>${item.price}</Item>
                          </Grid>
                          <Grid size={6} sx={{display: 'flex', justifyContent: 'right'}}>
                            <Chip label={item.condition.toUpperCase()} color="success" sx={{marginRight: '10px'}}/>
                          </Grid>
                        </Grid>
                      </Box>
                  </ImageListItem>
                </ThemeProvider>
            ))}
        </ImageList>
    </Box>
  );
}


export default SearchedProductsList
