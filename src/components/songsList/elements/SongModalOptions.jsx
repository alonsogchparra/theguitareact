import React from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

export const SongModalOptions = ({
  id,
  artist,
  title,
  extraInfo,
  beatPerMinute,
  beatsPerMeasure,
}) => {
  return (
    <>
      <Grid
        xs={12}
        md={6}
        justifyContent='center'
        alignItems='center'
        className='gr_option_container'
      >
        <Link
          style={{ textDecoration: 'none' }}
          to={`/bpm/${id}`}
          state={{
            artist,
            title,
            extraInfo,
            beatPerMinute,
            beatsPerMeasure,
          }}
        >
          <Box className='gr_box_options_modal'>
            <Grid
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
            >
              <PlayCircleFilledWhiteIcon
                style={{
                  width: '5rem',
                  height: '5rem',
                  marginBottom: '1rem',
                }}
                className='gr_icon_choice_modal'
              />
              <Typography
                variant='body1'
                component='div'
                className='gr_text_choice_modal'
              >
                Play with BPM
              </Typography>
            </Grid>
          </Box>
        </Link>
      </Grid>

      <Grid
        xs={12}
        md={6}
        justifyContent='center'
        alignItems='center'
        className='gr_option_container'
      >
        <Link
          style={{ textDecoration: 'none' }}
          to={`/video/${id}`}
          state={{
            artist,
            title,
            extraInfo,
          }}
        >
          <Box className='gr_box_options_modal'>
            <Grid
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
            >
              <PlayCircleOutlineIcon
                style={{
                  width: '5rem',
                  height: '5rem',
                  marginBottom: '1rem',
                }}
                className='gr_icon_choice_modal'
              />
              <Typography
                variant='body1'
                component='div'
                className='gr_text_choice_modal'
              >
                Play video
              </Typography>
            </Grid>
          </Box>
        </Link>
      </Grid>
    </>
  );
};
