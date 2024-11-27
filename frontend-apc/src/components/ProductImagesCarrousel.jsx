import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const ProductImagesCarrousel = (props) => {

    const pictures = props.pictures;

    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);

    const maxSteps = pictures.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };    

  return (
    <Box>
      <Box justifySelf='center'>
        <img srcSet={`${pictures[activeStep]}`}
                        src={`${pictures[activeStep]}`}  
                        alt='product image'
                        loading="lazy" 
                        width='370px' 
                        height='370px'
                        style={{objectFit: 'scale-down'}}/>
      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Siguiente
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Anterior
          </Button>
        }/>
    </Box>
  );
}

export default ProductImagesCarrousel;