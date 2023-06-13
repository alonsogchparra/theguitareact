import React from 'react';
import { Box, Container, Typography } from '@mui/material';

export const ExtraInfoVideo = ({ extraInfo }) => {
  return (
    <Container
      sx={{
        maxWidth: { xs: 'sm', lg: 'xl' },
      }}
    >
      <Box
        width='100%'
        paddingBottom={3}
        marginTop={4}
        className='gr_box_options'
      >
        <Typography
          component='div'
          variant='h4'
          textAlign='center'
          className='gr_add_song_title'
          paddingTop={3}
        >
          <strong>Extra Info:</strong>
        </Typography>
        <Typography
          component='div'
          variant='h4'
          textAlign='center'
          className='gr_add_song_title'
          paddingTop={3}
        >
          {extraInfo}
        </Typography>
      </Box>
    </Container>
  );
};
