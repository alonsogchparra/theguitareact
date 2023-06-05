import React from 'react';
import {
  Box,
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import { welcomeTypography } from '../../utils/typographySelection';

let theme = welcomeTypography();

theme = responsiveFontSizes(theme);

export const Welcome = () => {
  const currentTheme = useSelector(theCurrentTheme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth='xl'
          className='animate__animated animate__fadeIn animate__slower'
        >
          <Grid
            container
            display='flex'
            justifyContent='center'
            flexDirection='column'
            paddingTop={16}
          >
            <Box textAlign='center'>
              <Icon
                width='120px'
                fill={
                  currentTheme === 'blackYellow'
                    ? '#FEEA36'
                    : currentTheme === 'yellowBlack'
                    ? '#1D1D1D'
                    : currentTheme === 'blueWhite'
                    ? '#61DAFB'
                    : currentTheme === 'whiteBlue'
                    ? '#10374A'
                    : currentTheme === 'redDark'
                    ? '#FF3434'
                    : currentTheme === 'red'
                    ? '#4F0303'
                    : ''
                }
              />
            </Box>
            <Box paddingTop={2}>
              <Grid container display='flex' justifyContent='center'>
                <Box width='100%'>
                  <Typography
                    variant='h1'
                    component='div'
                    textAlign='center'
                    className='gr_welcome_title'
                  >
                    GuitaReact
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>
          <Box>
            <Typography
              variant='body1'
              component='div'
              textAlign='center'
              className='gr_welcome_title'
            >
              Developed and Desgined by: Alonso G. Ch. Parra A.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
