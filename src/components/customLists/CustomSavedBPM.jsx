import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';
import { songsList, titleList } from '../../features/songs/songsSavedSlice';
import { customSavedBPMTypography } from '../../utils/typographySelection';
import { useRandomSongs } from '../../hooks/useRandomSongs';
import { BPMController } from '../randoms/bpmElements/BPMController';
import { ExtraInfo } from '../randoms/bpmElements/ExtraInfo';
import { PlayNextButton } from '../randoms/bpmElements/PlayNextButton';

let theme = customSavedBPMTypography();

theme = responsiveFontSizes(theme);

export const CustomSavedBPM = () => {
  const listSongs = useSelector(songsList);
  const listTitle = useSelector(titleList);

  const {
    setMusicList,
    copyMusicList,
    setCopyMusicList,
    addBPM,
    addBeatsPM,
    counter,
    musicItem,
    isTicking,
    stopMetronome,
    startMetronome,
    changeBPMHandler,
    isButtonPressed,
    startOver,
    getSong,
    setBpm,
    setBeatsPerMeasure,
  } = useRandomSongs();

  useEffect(() => {
    if (listSongs) {
      setMusicList(listSongs);
      setCopyMusicList(listSongs);
    }
  }, []);

  useEffect(() => {
    setBpm(addBPM);
    setBeatsPerMeasure(addBeatsPM);
  }, [addBPM, addBeatsPM]);

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
                    Play random songs with BPM. ({listTitle})
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
    </>
  );
};
