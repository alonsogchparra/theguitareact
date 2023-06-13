import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

export const SongsSelectedMobileBtn = ({ goToCustomList, songsTempList }) => {
  return (
    <Container maxWidth='md' style={{ marginTop: 20 }}>
      <Button
        variant='contained'
        className='gr_songs_selected_btn'
        fullWidth
        onClick={() => goToCustomList()}
      >
        <Box width='100%'>
          <Grid
            display='flex'
            justifyContent='space-between'
            alignItems='center'
          >
            <PlaylistAddIcon
              style={{ width: '2rem', height: '2rem' }}
              className='gr_icon_songs_selected'
            />
            <Typography
              component='div'
              variant='h5'
              className='gr_number_songs_selected'
            >
              {songsTempList.length}
            </Typography>
          </Grid>
        </Box>
      </Button>
    </Container>
  );
};
