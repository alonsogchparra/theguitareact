import React, { useEffect } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { songsList, titleList } from '../../features/songs/songsSavedSlice';
import Grid from '@mui/material/Unstable_Grid2';
import { customSavedVideoTypography } from '../../utils/typographySelection';
import { useRandomSongs } from '../../hooks/useRandomSongs';
import { VideoPlayer } from '../randoms/videoElements/VideoPlayer';
import { PlayNextVideo } from '../randoms/videoElements/PlayNextVideo';
import { VideoSelection } from '../randoms/videoElements/VideoSelection';

let theme = customSavedVideoTypography();

theme = responsiveFontSizes(theme);

export const CustomSavedVideo = () => {
  const listSongs = useSelector(songsList);
  const listTitle = useSelector(titleList);

  const {
    setMusicList,
    copyMusicList,
    setCopyMusicList,
    counter,
    musicItem,
    isButtonPressed,
    startOver,
    getSong,
    videos,
    selectedVideo,
    videoType,
    setVideoType,
    showVideoHandler,
  } = useRandomSongs();

  const videoSrc = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
    : null;

  useEffect(() => {
    if (listSongs) {
      setMusicList(listSongs);
      setCopyMusicList(listSongs);
    }
  }, []);

  useEffect(() => {
    if (musicItem === '' || musicItem === null || musicItem === undefined) {
      return;
    } else {
      showVideoHandler(musicItem?.artist, musicItem?.title);
    }
  }, [musicItem]);

  useEffect(() => {
    showVideoHandler(musicItem?.artist, musicItem?.title);
  }, [videoType]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth='xl'
          style={{ height: '100vh' }}
          className='animate__animated animate__fadeIn'
        >
          <Grid container display='flex' justifyContent='center' paddingTop={2}>
            <Box paddingTop={2}>
              <Box width='100%'>
                <Typography
                  variant='h4'
                  component='div'
                  textAlign='center'
                  className='gr_welcome_title'
                  fontWeight='700'
                >
                  Play random Videos. ({listTitle})
                </Typography>
              </Box>
              <Box width='100%' paddingTop={2}>
                <Typography
                  variant='h4'
                  component='div'
                  textAlign='center'
                  className='gr_welcome_title'
                >
                  You have <strong>{copyMusicList.length}</strong> songs on your
                  list. Songs Played: <strong>{counter}</strong>
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Container
            sx={{
              maxWidth: { xs: 'sm', lg: !musicItem ? 'sm' : 'xl' },
              paddingTop: { xs: '0px', lg: '30px' },
            }}
          >
            <Box width='100%'>
              <Grid
                display='flex'
                justifyContent='space-around'
                gap={4}
                sx={{ flexDirection: { xs: 'column', lg: 'row-reverse' } }}
              >
                {/* Video Player */}

                {musicItem !== '' && (
                  <VideoPlayer videos={videos} videoSrc={videoSrc} />
                )}

                <Box className='gr_operator' width='100%'>
                  {/* Song Info */}

                  {musicItem && (
                    <VideoSelection
                      title={musicItem?.title}
                      artist={musicItem?.artist}
                      setVideoType={setVideoType}
                    />
                  )}

                  {/* Next Song Content */}
                  <PlayNextVideo
                    musicItem={musicItem}
                    counter={counter}
                    copyMusicList={copyMusicList}
                    startOver={startOver}
                    getSong={getSong}
                    isButtonPressed={isButtonPressed}
                  />
                </Box>
              </Grid>
            </Box>
          </Container>

          {musicItem.extraInfo && (
            <Container
              sx={{
                maxWidth: { xs: 'sm', lg: 'xl' },
              }}
            >
              <Box
                width='100%'
                paddingBottom={3}
                marginTop={4}
                className='gr_box_options'
                // sx={{ paddingTop: { xs: 0, lg: 3 } }}
              >
                <Typography
                  component='div'
                  variant='h4'
                  textAlign='center'
                  className='gr_add_song_title'
                  paddingTop={3}
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
                  {musicItem.extraInfo}
                </Typography>
              </Box>
            </Container>
          )}
        </Container>
      </ThemeProvider>
    </div>
  );
};
