import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  responsiveFontSizes,
  Slider,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { songsTemp, titleTemporal } from '../../features/songs/songsTempSlice';
import { useMetronome } from '../../hooks/useMetronome';

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

theme = responsiveFontSizes(theme);

export const CustomTempBPM = () => {
  const songsTempList = useSelector(songsTemp);
  const temporalTitle = useSelector(titleTemporal);

  const [musicList, setMusicList] = useState([]);
  const [copyMusicList, setCopyMusicList] = useState([]);
  const [musicItem, setMusicItem] = useState('');
  const [counter, setCounter] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  //----------- BPM ELEMENTS ---------------

  const { bpm, setBpm, isPlaying, setIsPlaying } = useMetronome();

  const getRandomNumber = (min, max) => {
    let stepOne = max - min;
    let stepTwo = Math.random() * stepOne;
    let result = Math.floor(stepTwo) + min;
    return result;
  };

  const getSong = () => {
    if (musicList.length === 0) {
      setMusicItem('');
    } else {
      setIsButtonPressed(true);
      let randomIndex = getRandomNumber(0, musicList.length);
      let randomSong = musicList[randomIndex];

      setMusicList(
        musicList.filter((music) => music.title !== randomSong.title)
      );

      setMusicItem(randomSong);
      setCounter(counter + 1);
    }
  };

  const startOver = () => {
    setMusicList(copyMusicList);
    setCounter(0);
    setMusicItem('');
    setIsButtonPressed(false);
  };

  // console.log('CUStomTempBPM', songsTempList);

  useEffect(() => {
    if (songsTempList) {
      setMusicList(songsTempList);
      setCopyMusicList(songsTempList);
    }
  }, []);

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
                    Play random songs with BPM. ({temporalTitle})
                  </Typography>
                </Box>

                <Box width='100%' paddingTop={2}>
                  <Typography
                    variant='h4'
                    component='div'
                    textAlign='center'
                    className='gr_welcome_title'
                  >
                    You have <strong>{copyMusicList.length}</strong> songs on
                    your list. Songs Played: <strong>{counter}</strong>
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
            {musicItem?.extraInfo && (
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
                    {musicItem?.extraInfo}
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
                  {musicItem && (
                    <>
                      <Box
                        width='100%'
                        paddingY={2}
                        className='gr_song_info_box'
                      >
                        <Typography
                          variant='h5'
                          component='div'
                          textAlign='center'
                          fontWeight='700'
                          className='gr_info_text'
                        >
                          Song: {musicItem?.title}
                        </Typography>
                        <Typography
                          variant='h5'
                          component='div'
                          textAlign='center'
                          fontWeight='700'
                          className='gr_info_text'
                        >
                          Artist/Band: {musicItem?.artist}
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
                  )}

                  <Box width='100%' marginTop={10}>
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
                        You played all the songs on your list. Do you want to
                        start over?
                      </Typography>
                    )}

                    <Button
                      variant='contained'
                      fullWidth
                      style={{ marginTop: '15px' }}
                      className='gr_next_btn'
                      onClick={
                        copyMusicList.length === counter ? startOver : getSong
                      }
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
                          : 'PLAY'}
                      </Typography>
                    </Button>
                  </Box>
                </Container>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
