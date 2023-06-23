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
import { selectUser } from '../../features/auth/userSlice';
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import { LoadingAll } from '../layouts/LoadingAll';
import { videoTypography } from '../../utils/typographySelection';
import { ExtraInfoVideo } from './videoElements/ExtraInfoVideo';
import { VideoSelection } from './videoElements/VideoSelection';
import { PlayNextVideo } from './videoElements/PlayNextVideo';
import { VideoPlayer } from './videoElements/VideoPlayer';
import { useRandomSongs } from '../../hooks/useRandomSongs';

let theme = videoTypography();

theme = responsiveFontSizes(theme);

export const Videos = () => {
  const user = useSelector(selectUser);
  const { data: songs, isLoading, isError, error } = useFetchSongsQuery();

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
    setSelectedVideo,
  } = useRandomSongs();

  const onSelectedVideo = (video) => setSelectedVideo(video);

  const videoSrc = selectedVideo
    ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
    : null;

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
    return () => {};
  }, [songs, user.uid]);

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
                <Box width='100%'>
                  <Typography
                    variant='h4'
                    component='div'
                    textAlign='center'
                    className='gr_welcome_title'
                    fontWeight='700'
                  >
                    Play random Videos
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
                    <VideoPlayer
                      videos={videos}
                      videoSrc={videoSrc}
                      onSelectedVideo={onSelectedVideo}
                    />
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
              <ExtraInfoVideo extraInfo={musicItem.extraInfo} />
            )}
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};
