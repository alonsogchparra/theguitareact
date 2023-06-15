import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { songSelectedBPMTypography } from '../../utils/typographySelection';
import { useRandomSongs } from '../../hooks/useRandomSongs';
import { ExtraInfo } from '../randoms/bpmElements/ExtraInfo';
import { BPMController } from '../randoms/bpmElements/BPMController';

let theme = songSelectedBPMTypography();

export const SongSelectedBPM = () => {
  const {
    state: {
      artist,
      title,
      extraInfo,
      beatPerMinute = 120,
      beatsPerMeasure: beatsPM = 4,
    },
  } = useLocation();

  const {
    addBPM,
    addBeatsPM,
    isTicking,
    stopMetronome,
    startMetronome,
    changeBPMHandler,
    setBpm,
    setBeatsPerMeasure,
  } = useRandomSongs();

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
            {extraInfo && <ExtraInfo extraInfo={extraInfo} />}

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
                  <BPMController
                    title={title}
                    artist={artist}
                    changeBPMHandler={changeBPMHandler}
                    isTicking={isTicking}
                    stopMetronome={stopMetronome}
                    startMetronome={startMetronome}
                    addBPM={beatPerMinute}
                    addBeatsPM={beatsPM}
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
