import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { VideoVersionButton } from './VideoVersionButton';

export const VideoSelection = ({ title, artist, setVideoType }) => {
  return (
    <>
      <Box width='100%' paddingY={2} className='gr_song_info_box'>
        <Typography
          variant='h5'
          component='div'
          textAlign='center'
          fontWeight='700'
          className='gr_info_text'
        >
          Song: {title}
        </Typography>
        <Typography
          variant='h5'
          component='div'
          textAlign='center'
          fontWeight='700'
          className='gr_info_text'
        >
          Artist/Band: {artist}
        </Typography>
      </Box>

      <Typography
        paddingTop={2}
        variant='h5'
        component='div'
        textAlign='center'
        className='gr_welcome_title'
      >
        Select the vesion you want:
      </Typography>

      <Grid display='flex' gap={2} marginY={2}>
        <VideoVersionButton
          btnTitle={'Original'}
          typeVideo={'original'}
          setVideoType={setVideoType}
        />
        <VideoVersionButton
          btnTitle={'Backing Track'}
          typeVideo={'backing'}
          setVideoType={setVideoType}
        />
        <VideoVersionButton
          btnTitle={'Live'}
          typeVideo={'live'}
          setVideoType={setVideoType}
        />
      </Grid>
    </>
  );
};
