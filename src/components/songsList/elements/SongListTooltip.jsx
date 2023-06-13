import React from 'react';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Grid from '@mui/material/Unstable_Grid2';

export const SongListTooltip = ({
  songsTempList,
  deleteTemporalSongHandler,
  goToCustomList,
}) => {
  return (
    <Tooltip
      title={
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {songsTempList.map((songTemp) => (
              <div
                key={songTemp.id}
                style={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '10rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant='caption' noWrap>
                  {songTemp.title}
                </Typography>
                <IconButton
                  onClick={() => deleteTemporalSongHandler(songTemp.id)}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            ))}
          </div>
        </>
      }
      arrow
    >
      <Button
        variant='contained'
        style={{
          position: 'absolute',
          top: '60px',
          width: '157px',
          height: '45px',
        }}
        className='gr_songs_selected_btn'
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
    </Tooltip>
  );
};
