import React from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

export const BPMController = ({
  title,
  artist,
  changeBPMHandler,
  isTicking,
  stopMetronome,
  startMetronome,
  addBPM,
  addBeatsPM,
}) => {
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

      <Box width='100%' paddingTop={1}>
        {/* NEW METRONOME */}
        <div>
          <TextField
            id='song-title'
            label='BPM'
            variant='standard'
            fullWidth
            margin='normal'
            autoComplete='off'
            name='bpm'
            value={addBPM}
            className='gr_bpm_textfield'
            onChange={(e) => changeBPMHandler(e)}
            placeholder='Change BPM'
            type='number'
          />
          <TextField
            id='song-title'
            label='Beats per measure'
            variant='standard'
            fullWidth
            margin='normal'
            autoComplete='off'
            name='bpmeasure'
            value={addBeatsPM}
            className='gr_bpm_textfield'
            onChange={(e) => changeBPMHandler(e)}
            placeholder='Change beats per measure'
            type='number'
          />
          <Grid display='flex' justifyContent='center' paddingY={2}>
            <IconButton onClick={isTicking ? stopMetronome : startMetronome}>
              {isTicking ? (
                <PauseCircleIcon
                  style={{ width: '3rem', height: '3rem' }}
                  className='gr_song_action'
                />
              ) : (
                <PlayCircleIcon
                  style={{ width: '3rem', height: '3rem' }}
                  className='gr_song_action'
                />
              )}
            </IconButton>
            <IconButton onClick={() => setSounds([click2, click1])}>
              <ChangeCircleIcon
                style={{ width: '3rem', height: '3rem' }}
                className='gr_song_action'
              />
            </IconButton>
          </Grid>
        </div>
      </Box>
    </>
  );
};
