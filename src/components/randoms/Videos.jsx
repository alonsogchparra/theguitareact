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
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import youtube from '../../api/youtube';
import { key } from '../../keys/youtube';
import { LoadingAll } from '../layouts/LoadingAll';
import { videoTypography } from '../../utils/typographySelection';
import { ExtraInfoVideo } from './videoElements/ExtraInfoVideo';
import { VideoSelection } from './videoElements/VideoSelection';
import { PlayNextVideo } from './videoElements/PlayNextVideo';
import { VideoPlayer } from './videoElements/VideoPlayer';

let theme = videoTypography();

theme = responsiveFontSizes(theme);

export const Videos = () => {
  const user = useSelector(selectUser);
  const { data: songs, isLoading, isError, error } = useFetchSongsQuery();
  const [musicList, setMusicList] = useState([]);
  const [copyMusicList, setCopyMusicList] = useState([]);
  const [musicItem, setMusicItem] = useState('');
  const [counter, setCounter] = useState(0);
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState('');
  const [videos, setVideos] = useState([]);
  const [videoType, setVideoType] = useState('original');

  const onSelectedVideo = (video) => setSelectedVideo(video);

  const showVideoHandler = async (artist, title) => {
    let searchTerm;

    if (videoType === 'original') {
      searchTerm = `${title} ${artist}`;
    } else if (videoType === 'backing') {
      searchTerm = `${title} ${artist} backing track`;
    } else if (videoType === 'live') {
      searchTerm = `${title} ${artist} live`;
    }

    try {
      const response = await youtube.get('search', {
        params: {
          part: 'snippet',
          maxResult: 5,
          key,
          q: searchTerm,
        },
      });
      setVideos(response.data.items);
      setSelectedVideo(response.data.items[0]);
    } catch (error) {
      console.log('ERROR SEARCHING VIDEO', error);
    }
  };

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

      // showVideoHandler(musicItem?.artist, musicItem?.title);
    }
  };

  const startOver = () => {
    setMusicList(copyMusicList);
    setCounter(0);
    setMusicItem('');
    setIsButtonPressed(false);
    // setSelectedVideo('');
    // setVideos([]);
  };

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
              <ExtraInfoVideo extraInfo={musicItem.extraInfo} />
            )}
          </Container>
        </ThemeProvider>
      )}
    </>
  );
};
