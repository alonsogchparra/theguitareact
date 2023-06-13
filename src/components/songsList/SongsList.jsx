import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Hidden,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useFetchSongsQuery } from '../../features/songs/songsApi';
import { SongItem } from './SongItem';
import { SongModal } from './SongModal';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTemporalSongs,
  deleteTemporalSong,
  songsTemp,
} from '../../features/songs/songsTempSlice';
import {
  addLocalSongs,
  songsLocal,
  updateLocalSongs,
} from '../../features/songs/localSongsSlice';
import { useNavigate } from 'react-router-dom';
import { LoadingAll } from '../layouts/LoadingAll';
import { songsListTypography } from '../../utils/typographySelection';
import { SongsSelectedMobileBtn } from './elements/SongsSelectedMobileBtn';
import { SongListTextField } from './elements/SongListTextField';
import { SongListTooltip } from './elements/SongListTooltip';

let theme = songsListTypography();

theme = responsiveFontSizes(theme);

export const SongsList = () => {
  const { data: songs, isLoading, isError, error } = useFetchSongsQuery();

  const [copySongs, setCopySongs] = useState([]);
  const [searchField, setSearchField] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [songSelected, setSongSelected] = useState({});

  const localSongs = useSelector(songsLocal);
  const songsTempList = useSelector(songsTemp);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const addSongTemporalHandler = (
    id,
    uid,
    artist,
    title,
    extraInfo = '',
    beatPerMinute,
    beatsPerMeasure
  ) => {
    dispatch(
      addTemporalSongs({
        id,
        uid,
        artist,
        title,
        extraInfo,
        beat_per_minute: beatPerMinute,
        beats_per_measure: beatsPerMeasure,
      })
    );
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const openModalHandler = (
    artist,
    title,
    extraInfo = '',
    id,
    beatPerMinute,
    beatsPerMeasure
  ) => {
    setOpenModal(true);
    setSongSelected({
      artist,
      title,
      extraInfo,
      id,
      beat_per_minute: beatPerMinute,
      beats_per_measure: beatsPerMeasure,
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const filteredSongsHandler = (e) => {
    e.preventDefault();
    setSearchField(e.target.value);
  };

  const deleteTemporalSongHandler = (id) => {
    dispatch(deleteTemporalSong(id));
  };

  const goToCustomList = () => {
    dispatch(updateLocalSongs(copySongs));
    navigate('/custom-lists');
  };

  // Once songs are loaded set CopySongs
  useEffect(() => {
    let auxLocalSongs;
    if (songs) {
      auxLocalSongs = songs.map((song) => ({
        ...song,
        added: false,
      }));
      setCopySongs(auxLocalSongs);
    }
  }, [songs]);

  // Once songs are loaded dispatch to addLocalSongs
  useEffect(() => {
    let auxLocalSongs;
    if (songs) {
      auxLocalSongs = songs.map((song) => ({
        ...song,
        added: false,
      }));
      dispatch(addLocalSongs(auxLocalSongs));
    }
  }, [songs]);

  // This check SongTempList Length to updated added value
  useEffect(() => {
    if (songsTempList.length > 0) {
      setCopySongs(
        copySongs.map((localSong) => {
          if (songsTempList.some((songTemp) => songTemp.id === localSong.id)) {
            return {
              ...localSong,
              added: true,
            };
          } else {
            return {
              ...localSong,
              added: false,
            };
          }
        })
      );
    } else {
      setCopySongs(
        copySongs.map((localSong) => ({ ...localSong, added: false }))
      );
    }
  }, [songsTempList]);

  // LocalSongs update CopySongs

  useEffect(() => {
    if (localSongs.length > 0) {
      setCopySongs(localSongs);
    }
  }, []);

  // Check if LocalSongs > 0 and check if songsTempList > 0
  // To updated Copysongs once you are coming back to Song List
  // This case is when you switch between CustomList to Songs List

  useEffect(() => {
    if (localSongs.length > 0 && songsTempList.length > 0) {
      setCopySongs(
        localSongs.map((song) => {
          if (songsTempList.some((songTemp) => songTemp.id === song.id)) {
            return {
              ...song,
              added: true,
            };
          } else {
            return {
              ...song,
              added: false,
            };
          }
        })
      );
    }
  }, []);

  useEffect(() => {
    let auxLocalSongs;
    if (songs) {
      auxLocalSongs = songs.map((song) => ({
        ...song,
        added: false,
      }));
      setCopySongs(auxLocalSongs);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container
          maxWidth='xl'
          className='animate__animated animate__fadeIn'
          style={{ position: 'relative' }}
        >
          {songsTempList.length > 0 && (
            <Hidden lgUp>
              <SongsSelectedMobileBtn
                goToCustomList={goToCustomList}
                songsTempList={songsTempList}
              />
            </Hidden>
          )}

          <Grid paddingTop={5}>
            <Typography
              component='div'
              variant='h3'
              textAlign='center'
              className='gr_songs_list'
            >
              Check your list
            </Typography>
          </Grid>
          <Grid
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <SongListTextField filteredSongsHandler={filteredSongsHandler} />

            <Box width='100%'>
              <Grid container spacing={3} paddingTop={5}>
                {isLoading ? (
                  <Container maxWidth='sm'>
                    <LoadingAll isSongsList={true} />
                  </Container>
                ) : (
                  copySongs &&
                  copySongs
                    .filter((song) => {
                      if (searchField === '') {
                        return song;
                      } else if (
                        song.artist
                          .toLowerCase()
                          .includes(searchField.toLocaleLowerCase()) ||
                        song.title
                          .toLowerCase()
                          .includes(searchField.toLocaleLowerCase())
                      ) {
                        return song;
                      }
                    })
                    .map((song) => (
                      <SongItem
                        key={song.id}
                        song={song}
                        uid={song.uid}
                        extraInfo={song?.extraInfo}
                        added={song.added}
                        beatPerMinute={song?.beat_per_minute}
                        beatsPerMeasure={song?.beats_per_measure}
                        handleOpenModal={handleOpenModal}
                        openModalHandler={openModalHandler}
                        handleCloseModal={handleCloseModal}
                        openModal={openModal}
                        addSongTemporalHandler={addSongTemporalHandler}
                      />
                    ))
                )}
              </Grid>
            </Box>
          </Grid>

          {songsTempList.length > 0 && (
            <Hidden lgDown>
              <SongListTooltip
                songsTempList={songsTempList}
                deleteTemporalSongHandler={deleteTemporalSongHandler}
                goToCustomList={goToCustomList}
              />
            </Hidden>
          )}

          {/* Modal */}

          <SongModal
            artist={songSelected.artist}
            extraInfo={songSelected.extraInfo}
            handleCloseModal={handleCloseModal}
            id={songSelected.id}
            openModal={openModal}
            title={songSelected.title}
            beatPerMinute={songSelected?.beat_per_minute}
            beatsPerMeasure={songSelected?.beats_per_measure}
          />

          {/* Modal */}
        </Container>
      </ThemeProvider>
    </>
  );
};
