import React from 'react';
import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { NavbarOption } from './NavbarOption';

export const NavbarOptions = () => {
  return (
    <Box>
      <Grid display='flex' justifyContent='space-between'>
        <NavbarOption linkTo={'add-song'} titleLink={'Add Song'} />
        <NavbarOption linkTo={'songs-list'} titleLink={'Songs List'} />
        <NavbarOption linkTo={'custom-lists'} titleLink={'Custom List'} />
        <NavbarOption
          linkTo={'random-songs-with-bpm'}
          titleLink={'Random All Songs with BPM'}
        />
        <NavbarOption
          linkTo={'random-videos'}
          titleLink={'Random All Videos'}
        />
      </Grid>
    </Box>
  );
};
