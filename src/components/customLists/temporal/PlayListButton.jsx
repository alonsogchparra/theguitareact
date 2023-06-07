import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, ListItem, Typography } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export const PlayListButton = ({ handleOpenModal }) => {
  return (
    <ListItem className='gr_btn_container'>
      <Button
        variant='contained'
        fullWidth
        className='gr_play_list_btn'
        onClick={handleOpenModal}
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
              justifyContent='flex-start'
              alignItems='center'
              padding={0}
            >
              <PlayCircleOutlineIcon
                style={{ width: '2.5rem', height: '2.5rem' }}
              />
            </Grid>
            <Grid
              display='flex'
              justifyContent='center'
              alignItems='center'
              margin='auto'
            >
              <Typography textAlign='center' component='div' variant='h5'>
                PLAY LIST
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Button>
    </ListItem>
  );
};
