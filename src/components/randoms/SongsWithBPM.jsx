import React, { useEffect, useState } from 'react';
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
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import { selectUser } from '../../features/auth/userSlice';
import { useSelector } from 'react-redux';
import { useMetronome } from '../../hooks/useMetronome';
import { LoadingAll } from '../layouts/LoadingAll';
import Metronome from '@kevinorriss/react-metronome';

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

export const SongsWithBPM = () => {
  const user = useSelector(selectUser);
  const { data: songs, isLoading, isError, error } = useFetchSongsQuery();
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

  useEffect(() => {
    if (songs) {
      let tempSongs = songs
        .filter((song) => song.uid === user.uid)
        .map(({ id, artist, title, extraInfo }) => ({
          id,
          artist,
          title,
          extraInfo,
        }));
      setMusicList(tempSongs);
      setCopyMusicList(tempSongs);
    }
  }, [songs, user.uid]);

  // console.log('SONGS BPM', songs);
  // console.log('USER', user);
  // console.log('musicList', musicList);
  // console.log('COPYmusicList', copyMusicList);
  // console.log('MusicITem', musicItem);

  return (
    <>
      {isLoading ? (
        <LoadingAll />
      ) : (
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Container
            maxWidth='xl'
            style={{ height: '100vh' }}
            className='animate__animated animate__fadeIn'
          >
            <Grid
              container
              display='flex'
              justifyContent='center'
              paddingTop={2}
            >
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
                      Play random songs with BPM
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
                          <div className='gr_metronome_container'>
                            <Metronome
                              volumen={1}
                              playPauseStyle={{
                                backgroundColor: `var(--youHaveAddedContainer)`,
                                color: `var(--youHaveAddedText)`,
                              }}
                              bpmStyle={{
                                color: `var(--welcomeTitle)`,
                                fontFamily: [
                                  'Outfit',
                                  'Roboto',
                                  'Oxygen',
                                  'Ubuntu',
                                ].join(','),
                              }}
                              bpmTagStyle={{
                                color: `var(--welcomeTitle)`,
                                opacity: '0.6',
                                fontFamily: [
                                  'Plus Jakarta Sans',
                                  'Roboto',
                                  'Oxygen',
                                  'Ubuntu',
                                ].join(','),
                              }}
                              plusStyle={{
                                backgroundColor: `var(--youHaveAddedContainer)`,
                                color: `var(--youHaveAddedText)`,
                              }}
                              minusStyle={{
                                backgroundColor: `var(--youHaveAddedContainer)`,
                                color: `var(--youHaveAddedText)`,
                              }}
                              handleStyle={{
                                backgroundColor: `var(--youHaveAddedText)`,
                                borderColor: `var(--youHaveAddedContainer)`,
                              }}
                              trackStyle={{
                                backgroundColor: `var(--youHaveAddedContainer)`,
                              }}
                              railStyle={{
                                backgroundColor: `var(--bpmBarHover)`,
                              }}
                            />
                          </div>
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
      )}
    </>
  );
};
