import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Slider,
  ThemeProvider,
  Typography,
} from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useMetronome } from '../../hooks/useMetronome';
import Grid from '@mui/material/Unstable_Grid2';

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

  //----------- BPM ELEMENTS ---------------

  const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome();

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
                      <Typography
                        variant='h4'
                        component='div'
                        textAlign='center'
                        fontWeight='700'
                        className='gr_text_bpm'
                      >
                        BPM: {bpm}
                      </Typography>
                      <Box
                        width='100%'
                        paddingTop={2}
                        className='gr_bpm_container'
                      >
                        <Slider
                          className='gr_bpm_bar'
                          min={60}
                          max={240}
                          value={bpm}
                          onChange={(e) => setBpm(e.target.value)}
                        />
                      </Box>

                      <Button
                        variant='contained'
                        fullWidth
                        style={{ marginTop: '30px' }}
                        className='gr_start_btn'
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        <Typography
                          variant='h4'
                          component='div'
                          textAlign='center'
                          fontFamily='Outfit'
                          fontWeight='700'
                        >
                          {isPlaying ? 'STOP' : 'START'}
                        </Typography>
                      </Button>
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
