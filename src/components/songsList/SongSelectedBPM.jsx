import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  TextField,
  IconButton
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { useMetronome } from 'react-metronome-hook';
import click1 from '../../media/sounds/click1.wav';
import click2 from '../../media/sounds/click2.wav';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

let theme = createTheme({
  typography: {
    h3: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    h4: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
    h5: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
    body1: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
  },
});

export const SongSelectedBPM = () => {
  const {
    state: { artist, title, extraInfo },
  } = useLocation();

  //----------- NEW BPM ---------------

  const {
    startMetronome,
    isTicking,
    stopMetronome,
    bpm,
    setBpm,
    setBeatsPerMeasure,
    setSounds,
  } = useMetronome(120, 4, [click1, click2]);

  //----------- BPM ELEMENTS ---------------

  // const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome();

  // console.log('SONGSELECTEDBPM', useLocation());

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth='xl'
          style={{ height: '100vh' }}
          className='animate__animated animate__fadeIn'
        >
          <Grid container display='flex' justifyContent='center' paddingTop={2}>
            <Box paddingTop={2}>
              <Grid container display='flex' justifyContent='center'>
                <Box width='100%'>
                  <Typography
                    variant='h4'
                    component='div'
                    textAlign='center'
                    className='gr_welcome_title'
                    fontWeight='700'
                  >
                    Play with BPM
                  </Typography>
                </Box>
              </Grid>
            </Box>
          </Grid>

          <Grid
            paddingTop={3}
            display='flex'
            justifyContent='space-evenly'
            sx={{
              flexDirection: {
                xs: 'column-reverse',
                md: 'row',
              },
            }}
          >
            {extraInfo && (
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
                  >
                    {extraInfo}
                  </Typography>
                </Box>
              </Grid>
            )}

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
                <Container maxWidth='sm' style={{ paddingTop: '40px' }}>
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

                    <Box width='100%' paddingTop={5}>
                      <div>
                        <TextField
                          id='song-title'
                          label='BPM'
                          variant='standard'
                          fullWidth
                          margin='normal'
                          autoComplete='off'
                          name='title'
                          // value={title}
                          className='gr_bpm_textfield'
                          onChange={(e) => setBpm(e.target.value)}
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
                          name='title'
                          // value={title}
                          className='gr_bpm_textfield'
                          onChange={(e) => setBeatsPerMeasure(e.target.value)}
                          placeholder='Change beats per measure'
                          type='number'
                        />
                        <Grid
                          display='flex'
                          justifyContent='center'
                          paddingY={2}
                        >
                          <IconButton
                            onClick={isTicking ? stopMetronome : startMetronome}
                          >
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
                          <IconButton
                            onClick={() => setSounds([click2, click1])}
                          >
                            <ChangeCircleIcon
                              style={{ width: '3rem', height: '3rem' }}
                              className='gr_song_action'
                            />
                          </IconButton>
                        </Grid>
                      </div>
                    </Box>
                  </>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
