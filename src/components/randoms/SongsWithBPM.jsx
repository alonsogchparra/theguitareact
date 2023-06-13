import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import { selectUser } from '../../features/auth/userSlice';
import { useSelector } from 'react-redux';
import { LoadingAll } from '../layouts/LoadingAll';
import { useMetronome } from 'react-metronome-hook';
import click1 from '../../media/sounds/click1.wav';
import click2 from '../../media/sounds/click2.wav';
import { songsWithBPMTypography } from '../../utils/typographySelection';
import { ExtraInfo } from './bpmElements/ExtraInfo';
import { BPMController } from './bpmElements/BPMController';
import { PlayNextButton } from './bpmElements/PlayNextButton';

let theme = songsWithBPMTypography();

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
                <ExtraInfo extraInfo={musicItem?.extraInfo} />
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
                      <BPMController
                        title={musicItem?.title}
                        artist={musicItem?.artist}
                        changeBPMHandler={changeBPMHandler}
                        isTicking={isTicking}
                        stopMetronome={stopMetronome}
                        startMetronome={startMetronome}
                        addBPM={addBPM}
                        addBeatsPM={addBeatsPM}
                      />
                    )}

                    <PlayNextButton
                      musicItem={musicItem}
                      counter={counter}
                      copyMusicList={copyMusicList}
                      isButtonPressed={isButtonPressed}
                      startOver={startOver}
                      getSong={getSong}
                    />
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
