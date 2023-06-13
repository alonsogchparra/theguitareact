import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const ExtraInfo = ({ extraInfo }) => {
  return (
    <>
      <Grid
        width='100%'
        sx={{
          paddingBottom: {
            xs: 5,
            md: 0,
          },
        }}
      >
        <Box width='100%'>
          <Container maxWidth='sm' style={{ paddingTop: '40px' }}>
            <>
              <Box width='100%' paddingY={3.4} className='gr_song_info_box'>
                <Typography
                  variant='h4'
                  component='div'
                  textAlign='center'
                  fontWeight='700'
                  className='gr_info_text'
                >
                  Extra Info:
                </Typography>
              </Box>
            </>
          </Container>

          <Typography
            component='div'
            variant='h4'
            textAlign='center'
            className='gr_add_song_title'
            paddingTop={3}
            style={{
              whiteSpace: 'pre-line',
              verticalAlign: 'bottom',
            }}
          >
            {extraInfo}
          </Typography>
        </Box>
      </Grid>
    </>
  );
};
