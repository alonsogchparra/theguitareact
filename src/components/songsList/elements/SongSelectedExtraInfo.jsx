import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export const SongSelectedExtraInfo = ({ extraInfo }) => {
  return (
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
        <Typography
          component='div'
          variant='h4'
          textAlign='center'
          className='gr_add_song_title'
        >
          <strong>Extra Info:</strong>
        </Typography>

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
  );
};
