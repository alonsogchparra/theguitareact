import React from 'react';
import { Box, Container, LinearProgress } from '@mui/material';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';

export const Loading = () => {
  const currentTheme = useSelector(theCurrentTheme);

  return (
    <>
      <Container maxWidth='xs' className='animate__animated animate__fadeIn'>
        <Box width='100%' paddingY={5}>
          <Box textAlign='center' className='gr_loading_box'>
            <Icon
              width='80px'
              fill={
                currentTheme === 'blackYellow'
                  ? '#FEEA36'
                  : currentTheme === 'yellowBlack'
                  ? '#1D1D1D'
                  : currentTheme === 'blueWhite'
                  ? '#DCDCDC'
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
          <LinearProgress className='gr_loading' />
        </Box>
      </Container>
    </>
  );
};
