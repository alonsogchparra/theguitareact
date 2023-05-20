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
  TextField,
  IconButton,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import { selectUser } from '../../features/auth/userSlice';
import { useSelector } from 'react-redux';
import { LoadingAll } from '../layouts/LoadingAll';
import { useMetronome } from 'react-metronome-hook';
import click1 from '../../media/sounds/click1.wav';
import click2 from '../../media/sounds/click2.wav';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import SkipNextIcon from '@mui/icons-material/SkipNext';

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
  const [addBPM, setAddBPM] = useState(120);
  const [addBeatsPM, setAddBeatsPM] = useState(4);

  const regex = /^[0-9\b]+$/;

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

      setAddBPM(
        randomSong?.beat_per_minute ? randomSong?.beat_per_minute : 120
      );
      setAddBeatsPM(
        randomSong?.beats_per_measure ? randomSong?.beats_per_measure : 4
      );
    }
  };

  const changeBPMHandler = (e) => {
    if (e.target.value === '' || regex.test(e.target.value)) {
      if (e.target.name === 'bpm') {
        setAddBPM(e.target.value);
      } else {
        setAddBeatsPM(e.target.value);
      }
    }
  };

  const startOver = () => {
    if (isTicking) {
      stopMetronome();
    }
    setMusicList(copyMusicList);
    setCounter(0);
    setMusicItem('');
    setIsButtonPressed(false);
  };

  useEffect(() => {
    if (songs) {
      let tempSongs = songs
        .filter((song) => song.uid === user.uid)
        .map(
          ({
            id,
            artist,
            title,
            extraInfo,
            beat_per_minute,
            beats_per_measure,
          }) => ({
            id,
            artist,
            title,
            extraInfo,
            beat_per_minute,
            beats_per_measure,
          })
        );
      setMusicList(tempSongs);
      setCopyMusicList(tempSongs);
    }
  }, [songs, user.uid]);

  useEffect(() => {
    setBpm(addBPM);
    setBeatsPerMeasure(addBeatsPM);
  }, [addBPM, addBeatsPM]);

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
                      variant='h5'
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
                    <Container maxWidth='sm' style={{ paddingTop: '40px' }}>
                      <>
                        <Box
                          width='100%'
                          paddingY={3.4}
                          className='gr_song_info_box'
                        >
                          <Typography
                            variant='h4'
                            component='div'
                            textAlign='center'
                            fontWeight='700'
                            className='gr_info_text'
                          >
                            Extra Info:
                          </Typography>
                        </Box>
                      </>
                    </Container>

                    <Typography
                      component='div'
                      variant='h4'
                      textAlign='center'
                      className='gr_add_song_title'
                      paddingTop={3}
                      style={{
                        whiteSpace: 'pre-line',
                        verticalAlign: 'bottom',
                      }}
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
                            <Grid
                              display='flex'
                              justifyContent='center'
                              paddingY={2}
                            >
                              <IconButton
                                onClick={
                                  isTicking ? stopMetronome : startMetronome
                                }
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
                    )}

                    <Box width='100%' marginTop={2}>
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
                        <Box width='100%'>
                          <Grid
                            container
                            display='flex'
                            flexDirection='row'
                            style={{ paddingTop: 7, paddingBottom: 7 }}
                          >
                            <Grid
                              display='flex'
                              justifyContent='center'
                              alignItems='center'
                              flex='1'
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
                                  : 'PLAY THE BEAT'}
                              </Typography>
                            </Grid>

                            <Grid
                              display='flex'
                              justifyContent='flex-start'
                              alignItems='center'
                              padding={0}
                            >
                              {copyMusicList.length === counter ? (
                                <PlayCircleOutlineIcon
                                  style={{ width: '2.5rem', height: '2.5rem' }}
                                />
                              ) : isButtonPressed ? (
                                <SkipNextIcon
                                  style={{ width: '2.5rem', height: '2.5rem' }}
                                />
                              ) : (
                                <PlayCircleOutlineIcon
                                  style={{ width: '2.5rem', height: '2.5rem' }}
                                />
                              )}
                            </Grid>
                          </Grid>
                        </Box>
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
