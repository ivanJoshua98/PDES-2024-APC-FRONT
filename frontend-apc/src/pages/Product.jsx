import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ProductController from '../controller/ProductController';
import ProductImagesCarrousel from '../components/ProductImagesCarrousel';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';
import ButtonsOfProductPost from '../components/ButtonsOfProductPost';
import AttributesTable from '../components/AttributesTable';
import LoadingScreenOptions from '../components/LoadingScreenOptions';


const Product = () => {

  const [product, setProduct] = useState({
                                          id: '', 
                                          price: 0, 
                                          category_id: '', 
                                          title: '', 
                                          pictures: [], 
                                          condition: '', 
                                          link: ''});

  const [loading, setLoading] = useState(true);

  let {productId} = useParams();

  useEffect(() => {
    ProductController.getProductByIdFromML(productId).then(res => {
        setProduct(res.data);
        setLoading(false);
    }).catch(error => console.log('Error al obtener el producto:', error));
  }, [productId]);


  return (
    <div>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        {loading ? <LoadingScreenOptions/> :
        <Card sx={{width: '80%', marginTop: '1rem'}}>
          <Box sx={{ width: '100%' }}>
            <Grid container rowSpacing={1} columnSpacing={2}>
              <Grid size={6}>
                <ProductImagesCarrousel pictures={product.pictures}/>
              </Grid>
              <Grid size={6} alignContent='center'>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div" id='searched-product-title'>
                    {product.title}
                  </Typography>
                  <Typography id='product-price' variant="body2" sx={{ color: 'text.secondary', fontWeight: 'bold', fontSize: 'x-large' }}>
                      ${Intl.NumberFormat().format(product.price)}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Box>
          <ButtonsOfProductPost actualProduct={product} />
          <Box display='flex' justifyContent='center'>
            <AttributesTable productId={product.id}/>
          </Box>
        </Card>
        }
      </Box>
    </div>
  )
}

export default Product
