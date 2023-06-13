import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';

export const PlayNextButton = ({
  musicItem,
  counter,
  copyMusicList,
  startOver,
  getSong,
  isButtonPressed,
}) => {
  return (
    <Box width='100%' marginTop={2}>
      {!musicItem && (
        <Typography
          component='div'
          variant='h5'
          textAlign='center'
          className='gr_text_start_over'
        >
          To use BPM slider, press the button to start with.
        </Typography>
      )}

      {counter === copyMusicList.length && (
        <Typography
          component='div'
          variant='h5'
          textAlign='center'
          className='gr_text_start_over'
        >
          You played all the songs on your list. Do you want to start over?
        </Typography>
      )}

      <Button
        variant='contained'
        fullWidth
        style={{ marginTop: '15px' }}
        className='gr_next_btn'
        onClick={copyMusicList.length === counter ? startOver : getSong}
      >
        <Box width='100%'>
          <Grid
            container
            display='flex'
            flexDirection='row'
            style={{ paddingTop: 7, paddingBottom: 7 }}
          >
            <Grid
              display='flex'
              justifyContent='center'
              alignItems='center'
              flex='1'
            >
              <Typography
                variant='h4'
                component='div'
                textAlign='center'
                fontFamily='Outfit'
                fontWeight='700'
              >
                {copyMusicList.length === counter
                  ? 'PLAY AGAIN'
                  : isButtonPressed
                  ? 'NEXT'
                  : 'PLAY THE BEAT'}
              </Typography>
            </Grid>

            <Grid
              display='flex'
              justifyContent='flex-start'
              alignItems='center'
              padding={0}
            >
              {copyMusicList.length === counter ? (
                <PlayCircleOutlineIcon
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
              ) : isButtonPressed ? (
                <SkipNextIcon style={{ width: '2.5rem', height: '2.5rem' }} />
              ) : (
                <PlayCircleOutlineIcon
                  style={{ width: '2.5rem', height: '2.5rem' }}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Button>
    </Box>
  );
};
