import React from 'react';

import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { DashboardOption } from './DashboardOption';

const PlayCircleFilledWhiteIconComponent = () => {
  return (
    <PlayCircleFilledWhiteIcon
      style={{
        width: '5rem',
        height: '5rem',
        marginBottom: '1rem',
      }}
      className='gr_icon_choice'
    />
  );
};

const PlayCircleOutlineIconComponent = () => {
  return (
    <PlayCircleOutlineIcon
      style={{
        width: '5rem',
        height: '5rem',
        marginBottom: '1rem',
      }}
      className='gr_icon_choice'
    />
  );
};

const AddCircleIconComponent = () => {
  return (
    <AddCircleIcon
      style={{
        width: '5rem',
        height: '5rem',
        marginBottom: '1rem',
      }}
      className='gr_icon_choice'
    />
  );
};

const PlaylistAddIconComponent = () => {
  return (
    <PlaylistAddIcon
      style={{
        width: '5rem',
        height: '5rem',
        marginBottom: '1rem',
      }}
      className='gr_icon_choice'
    />
  );
};

export const DashboardOptions = () => {
  return (
    <>
      <Box width='100%'>
        <Grid container spacing={6} paddingTop={5}>
          <DashboardOption
            linkTo={'random-songs-with-bpm'}
            optionText={'Play random songs with BPM (All)'}
            Icon={PlayCircleFilledWhiteIconComponent}
          />
          <DashboardOption
            linkTo={'random-videos'}
            optionText={'Play random videos (All)'}
            Icon={PlayCircleOutlineIconComponent}
          />
          <DashboardOption
            linkTo={'add-song'}
            optionText={'Add songs to your list'}
            Icon={AddCircleIconComponent}
          />
          <DashboardOption
            linkTo={'custom-lists'}
            optionText={'Create a custom list'}
            Icon={PlaylistAddIconComponent}
          />
        </Grid>
      </Box>
    </>
  );
};
