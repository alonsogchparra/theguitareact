import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Divider,
  List,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import {
  songsLocal,
  updateLocalSongs,
} from '../../features/songs/localSongsSlice';
import {
  deleteAllSongs,
  deleteTemporalSong,
  keepTitle,
  songsTemp,
  titleTemporal,
  updateTitle,
} from '../../features/songs/songsTempSlice';
import { selectUser } from '../../features/auth/userSlice';
import {
  useAddCustomListMutation,
  useDeleteCustomListMutation,
  useFetchCustomListsQuery,
} from '../../features/customs/customsApi';
import { LoadingAll } from '../layouts/LoadingAll';
import {
  addSongsList,
  resetSongListSelection,
  songsList,
  titleList,
} from '../../features/songs/songsSavedSlice';
import { customListTypography } from '../../utils/typographySelection';
import { TitleListChanger } from './temporal/TitleListChanger';
import { ListHeader } from './temporal/ListHeader';
import { PlayListButton } from './temporal/PlayListButton';
import { NoCustomList } from './saved/NoCustomList';
import { ListContainer } from './temporal/ListContainer';
import { ListContainerSaved } from './saved/ListContainerSaved';
import { ModalListSaved } from './saved/ModalListSaved';
import { ModalListTemporal } from './temporal/ModalListTemporal';

let theme = customListTypography();

theme = responsiveFontSizes(theme);

export const CustomLists = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isTitleChanged, setIsTitleChanged] = useState(false);

  const [openSavedModal, setOpenSavedModal] = useState(false);

  const [checkCounter, setCheckCounter] = useState(0);

  const localSongs = useSelector(songsLocal);
  const songsTempList = useSelector(songsTemp);
  const temporalTitle = useSelector(titleTemporal);
  const listSongs = useSelector(songsList);
  const listTitle = useSelector(titleList);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [addCustomList] = useAddCustomListMutation();

  const [deleteCustomList] = useDeleteCustomListMutation();

  const {
    data: customLists,
    isLoading,
    isError,
    error,
  } = useFetchCustomListsQuery();

  const addCustomListHandler = async (e) => {
    e.preventDefault();
    try {
      await addCustomList({
        uid: user.uid,
        title: temporalTitle,
        songList: songsTempList,
      });
      dispatch(deleteAllSongs());
    } catch (error) {
      console.log('ERROR ADDING CUSTOM LIST', error);
    }
  };

  const songListSavedOpenModalHandler = (title, songList) => {
    dispatch(addSongsList({ title, songList }));
    setOpenSavedModal(true);
  };

  const closeModalSongListSavedHandler = () => {
    dispatch(resetSongListSelection());
    setOpenSavedModal(false);
  };

  const deleteCustomListHandler = async (id) => {
    try {
      await deleteCustomList(id);
      setCheckCounter(checkCounter - 1);
    } catch (error) {
      console.log('Error deleting Custom List', error);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const changeTitleHandler = (e) => {
    dispatch(updateTitle(e.target.value));
  };

  const keepTitleHandler = () => {
    dispatch(keepTitle());
    setIsTitleChanged(!isTitleChanged);
  };

  const deleteAllSongsHandler = () => {
    dispatch(deleteAllSongs());
  };

  const deleteTemporalSongHandler = (songID) => {
    dispatch(deleteTemporalSong(songID));
  };

  useEffect(() => {
    if (songsTempList.length === 0) {
      let auxSongs = localSongs.map((song) => ({
        ...song,
        added: false,
      }));
      dispatch(updateLocalSongs(auxSongs));
    }
  }, [songsTempList]);

  useEffect(() => {
    if (customLists) {
      customLists.map((customList) => {
        if (customList.uid === user.uid) {
          setCheckCounter(checkCounter + 1);
          return customList;
        } else {
          setCheckCounter(checkCounter);
          return customList;
        }
      });
    }
  }, [customLists]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='xl' className='animate__animated animate__fadeIn'>
          <Grid paddingTop={5}>
            <Typography
              component='div'
              variant='h3'
              textAlign='center'
              className='gr_add_song_title'
            >
              Custom List
            </Typography>
          </Grid>

          {/* Temporary List created */}

          {songsTempList.length > 0 && (
            <Box width='100%' marginTop={3} marginBottom={5}>
              <Typography
                component='div'
                variant='h4'
                textAlign='left'
                className='gr_add_song_title'
              >
                Temporary list created
              </Typography>

              <Grid container spacing={6} paddingTop={5}>
                {/* Real Temporal songs */}

                {songsTempList.length > 0 && (
                  <Grid xs={12} md={6} lg={4}>
                    <List className='gr_list_container'>
                      {isTitleChanged ? (
                        <TitleListChanger
                          temporalTitle={temporalTitle}
                          isTitleChanged={isTitleChanged}
                          keepTitleHandler={keepTitleHandler}
                          setIsTitleChanged={setIsTitleChanged}
                          changeTitleHandler={changeTitleHandler}
                        />
                      ) : (
                        <ListHeader
                          temporalTitle={temporalTitle}
                          deleteAllSongsHandler={deleteAllSongsHandler}
                          setIsTitleChanged={setIsTitleChanged}
                          isTitleChanged={isTitleChanged}
                          addCustomListHandler={addCustomListHandler}
                        />
                      )}

                      <Divider className='gr_divider_title' />

                      <ListContainer
                        songsTempList={songsTempList}
                        deleteTemporalSongHandler={deleteTemporalSongHandler}
                      />

                      <Divider className='gr_divider_title' />

                      <PlayListButton handleOpenModal={handleOpenModal} />
                    </List>
                  </Grid>
                )}

                {/* Real Temporal songs */}
              </Grid>

              <Divider style={{ marginTop: 50 }} className='gr_division' />
            </Box>
          )}

          {/* Lists Saved */}

          {isLoading ? (
            <LoadingAll />
          ) : checkCounter === 0 && songsTempList.length === 0 ? (
            <NoCustomList />
          ) : customLists.length > 0 ? (
            <ListContainerSaved
              customLists={customLists}
              deleteCustomListHandler={deleteCustomListHandler}
              songListSavedOpenModalHandler={songListSavedOpenModalHandler}
            />
          ) : (
            <></>
          )}

          {/* Modal Temporal */}

          <ModalListTemporal
            openModal={openModal}
            handleCloseModal={handleCloseModal}
            temporalTitle={temporalTitle}
          />

          {/* Modal Saved List */}
          <ModalListSaved
            listTitle={listTitle}
            openSavedModal={openSavedModal}
            closeModalSongListSavedHandler={closeModalSongListSavedHandler}
          />
        </Container>
      </ThemeProvider>
    </>
  );
};
