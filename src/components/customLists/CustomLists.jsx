import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Divider,
  Fade,
  IconButton,
  List,
  ListItem,
  Modal,
  responsiveFontSizes,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
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
import { CustomListSaved } from './CustomListSaved';

let theme = createTheme({
  typography: {
    h2: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    h3: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    h4: {
      fontFamily: ['Plus Jakarta Sans', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
    h5: {
      fontFamily: ['Outfit', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 500,
    },
    h6: {
      fontFamily: ['Outfit', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 400,
    },
    body1: {
      fontFamily: ['Outfit', 'Roboto', 'Oxygen', 'Ubuntu'].join(','),
      fontWeight: 700,
    },
  },
});

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

  // console.log('CUSTOMLIST-LOCALSONGS', localSongs);
  // console.log('CUSTOMLIST-SongsTempList', songsTempList);
  // console.log('TEmporalTitle', temporalTitle);
  // console.log('USER', user);
  // console.log('CustomSONGLISTFirebase', customLists);
  // console.log('loading-CustomList', isLoading);

  // console.log('Play All Saved title', listTitle);
  // console.log('Play All Saved Songs', listSongs);

  // console.log('CHECKCOUNTER', checkCounter);

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
              Custom Lists
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
                        <ListItem
                          secondaryAction={
                            <>
                              <IconButton onClick={keepTitleHandler}>
                                <ClearIcon className='gr_edit_btn' />
                              </IconButton>
                              <IconButton>
                                <CheckIcon
                                  className='gr_edit_btn'
                                  onClick={() =>
                                    setIsTitleChanged(!isTitleChanged)
                                  }
                                />
                              </IconButton>
                            </>
                          }
                          sx={{ paddingBottom: 2 }}
                        >
                          <Box
                            component='span'
                            width='100%'
                            className='gr_change_title'
                          >
                            <TextField
                              id='title-custom'
                              variant='standard'
                              autoComplete='off'
                              value={temporalTitle}
                              name='Custom Title'
                              onChange={changeTitleHandler}
                              sx={{ width: 270 }}
                              className='gr_temporal_title'
                            />
                          </Box>
                        </ListItem>
                      ) : (
                        <ListItem
                          secondaryAction={
                            <>
                              <IconButton
                                onClick={() => dispatch(deleteAllSongs())}
                              >
                                <DeleteIcon className='gr_delete_btn' />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  setIsTitleChanged(!isTitleChanged)
                                }
                              >
                                <EditIcon className='gr_edit_btn' />
                              </IconButton>
                              <IconButton
                                onClick={(e) => addCustomListHandler(e)}
                              >
                                <SaveIcon className='gr_save_btn' />
                              </IconButton>
                            </>
                          }
                          className='gr_list_item_title'
                        >
                          <Typography
                            component='div'
                            variant='h5'
                            className='gr_custom_title'
                          >
                            {temporalTitle}
                          </Typography>
                        </ListItem>
                      )}

                      <Divider className='gr_divider_title' />

                      <Box
                        style={{
                          maxHeight: '300px',
                          height: '100vh',
                          // overflowY: 'auto',
                        }}
                        component='div'
                        className='gr_list_item_scroll_box'
                        sx={{
                          overflowY: 'auto',
                          scrollbarWidth: 'thin',
                          '&::-webkit-scrollbar': {
                            width: '0.4em',
                          },
                          '&::-webkit-scrollbar-track': {
                            background: '#f1f1f100',
                          },
                          '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#888',
                          },
                          '&::-webkit-scrollbar-thumb:hover': {
                            background: '#555',
                          },
                        }}
                      >
                        {songsTempList &&
                          songsTempList.map((songTemp) => (
                            <>
                              <ListItem
                                key={songTemp.id}
                                secondaryAction={
                                  <IconButton
                                    onClick={() =>
                                      dispatch(deleteTemporalSong(songTemp.id))
                                    }
                                  >
                                    <CancelIcon className='gr_cancel_btn' />
                                  </IconButton>
                                }
                              >
                                <Typography
                                  component='div'
                                  variant='h6'
                                  className='gr_custom_item_text'
                                >
                                  {songTemp.title}
                                </Typography>
                              </ListItem>
                              <Divider className='gr_divider' />
                            </>
                          ))}
                      </Box>

                      <Divider className='gr_divider_title' />

                      <ListItem className='gr_btn_container'>
                        <Button
                          variant='contained'
                          fullWidth
                          className='gr_play_list_btn'
                          onClick={handleOpenModal}
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
                                justifyContent='flex-start'
                                alignItems='center'
                                padding={0}
                              >
                                <PlayCircleOutlineIcon
                                  style={{ width: '2.5rem', height: '2.5rem' }}
                                />
                              </Grid>
                              <Grid
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                margin='auto'
                              >
                                <Typography
                                  textAlign='center'
                                  component='div'
                                  variant='h5'
                                >
                                  PLAY LIST
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                        </Button>
                      </ListItem>
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
            <Container
              maxWidth='xl'
              className='animate__animated animate__fadeIn'
            >
              <Typography
                component='div'
                variant='h5'
                textAlign='center'
                className='gr_add_song_title'
                paddingTop={3}
                style={{ fontWeight: 300 }}
              >
                If you don't have any song added, go to{' '}
                <Link to='/add-song' className='gr_nav_tittle'>
                  Add Song
                </Link>{' '}
                section.
              </Typography>
              <Typography
                component='div'
                variant='h5'
                textAlign='center'
                className='gr_add_song_title'
                paddingTop={3}
                style={{ fontWeight: 300 }}
              >
                Or If you have songs added go to{' '}
                <Link to='/songs-list' className='gr_nav_tittle'>
                  Songs List
                </Link>{' '}
                and create a custom songs list to play
              </Typography>
            </Container>
          ) : customLists.length > 0 ? (
            <Box width='100%'>
              <Typography
                component='div'
                variant='h4'
                textAlign='left'
                className='gr_add_song_title'
              >
                Lists Saved
              </Typography>
              <Grid container spacing={6} paddingTop={5}>
                {/* Data from Firebase */}

                {/* {customLists &&
                  customLists.map((customList) => (
                    <Grid xs={12} md={6} lg={4}>
                      <List className='gr_list_container'>
                        <ListItem
                          secondaryAction={
                            <>
                              <IconButton
                                onClick={() =>
                                  deleteCustomListHandler(customList.id)
                                }
                              >
                                <DeleteIcon className='gr_delete_btn' />
                              </IconButton>
                            </>
                          }
                          className='gr_list_item_title'
                        >
                          <Typography
                            component='div'
                            variant='h5'
                            className='gr_custom_title'
                          >
                            {customList.title}
                          </Typography>
                        </ListItem>

                        <Divider className='gr_divider_title' />

                        <Box
                          style={{
                            maxHeight: '300px',
                            height: '100vh',
                            // overflowY: 'auto',
                          }}
                          component='div'
                          className='gr_list_item_scroll_box'
                          sx={{
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            '&::-webkit-scrollbar': {
                              width: '0.4em',
                            },
                            '&::-webkit-scrollbar-track': {
                              background: '#f1f1f100',
                            },
                            '&::-webkit-scrollbar-thumb': {
                              backgroundColor: '#888',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                              background: '#555',
                            },
                          }}
                        >
                          {customList.songList.map((song) => (
                            <>
                              <ListItem>
                                <Typography
                                  component='div'
                                  variant='h6'
                                  className='gr_custom_item_text'
                                >
                                  {song.title}
                                </Typography>
                              </ListItem>
                              <Divider className='gr_divider' />
                            </>
                          ))}
                        </Box>
                        <Divider className='gr_divider_title' />

                        <ListItem className='gr_btn_container'>
                          <Button
                            variant='contained'
                            fullWidth
                            className='gr_play_list_btn'
                            onClick={() =>
                              songListSavedOpenModalHandler(
                                customList.title,
                                customList.songList
                              )
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
                                  justifyContent='flex-start'
                                  alignItems='center'
                                  padding={0}
                                >
                                  <PlayCircleOutlineIcon
                                    style={{
                                      width: '2.5rem',
                                      height: '2.5rem',
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  display='flex'
                                  justifyContent='center'
                                  alignItems='center'
                                  margin='auto'
                                >
                                  <Typography
                                    textAlign='center'
                                    component='div'
                                    variant='h5'
                                  >
                                    PLAY LIST
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </Button>
                        </ListItem>
                      </List>
                    </Grid>
                  ))} */}

                {customLists &&
                  customLists.map((customList) => (
                    <CustomListSaved
                      key={customList?.id}
                      customList={customList}
                      deleteCustomListHandler={deleteCustomListHandler}
                      songListSavedOpenModalHandler={
                        songListSavedOpenModalHandler
                      }
                    />
                  ))}
              </Grid>
            </Box>
          ) : (
            <></>
          )}

          {/* Modal Temporal */}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            closeAfterTransition
          >
            <Fade in={openModal}>
              <Container maxWidth='md' style={{ height: '100vh' }}>
                <Grid
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  style={{ height: '100vh' }}
                >
                  <Box width='100%' padding={5} className='gr_modal_box'>
                    <Grid display='flex' justifyContent='flex-end'>
                      <IconButton onClick={handleCloseModal}>
                        <CancelIcon
                          className='gr_close_modal_btn'
                          style={{
                            width: '3rem',
                            height: '3rem',
                          }}
                        />
                      </IconButton>
                    </Grid>

                    <Grid marginBottom={5}>
                      <Typography
                        component='div'
                        variant='h3'
                        textAlign='center'
                        className='gr_modal_text_one'
                        paddingBottom={3}
                        style={{ textDecoration: 'underline' }}
                      >
                        Temporal List
                      </Typography>
                      <Typography
                        component='div'
                        variant='h4'
                        textAlign='center'
                        className='gr_modal_text_one'
                      >
                        You chose {temporalTitle}
                      </Typography>
                      <Typography
                        component='div'
                        variant='h3'
                        textAlign='center'
                        className='gr_modal_text_two'
                      >
                        What you wanna do?
                      </Typography>
                    </Grid>

                    <Grid container spacing={6} paddingTop={5}>
                      <Grid
                        xs={12}
                        md={6}
                        justifyContent='center'
                        alignItems='center'
                        className='gr_option_container'
                      >
                        <Link
                          style={{ textDecoration: 'none' }}
                          to='/bpm/temporal-list'
                        >
                          <Box className='gr_box_options_modal'>
                            <Grid
                              display='flex'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='center'
                            >
                              <PlayCircleFilledWhiteIcon
                                style={{
                                  width: '5rem',
                                  height: '5rem',
                                  marginBottom: '1rem',
                                }}
                                className='gr_icon_choice_modal'
                              />
                              <Typography
                                variant='body1'
                                component='div'
                                className='gr_text_choice_modal'
                              >
                                Play random songs with BPM
                              </Typography>
                            </Grid>
                          </Box>
                        </Link>
                      </Grid>

                      <Grid
                        xs={12}
                        md={6}
                        justifyContent='center'
                        alignItems='center'
                        className='gr_option_container'
                      >
                        <Link
                          style={{ textDecoration: 'none' }}
                          to='/video/temporal-list'
                        >
                          <Box className='gr_box_options_modal'>
                            <Grid
                              display='flex'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='center'
                            >
                              <PlayCircleOutlineIcon
                                style={{
                                  width: '5rem',
                                  height: '5rem',
                                  marginBottom: '1rem',
                                }}
                                className='gr_icon_choice_modal'
                              />
                              <Typography
                                variant='body1'
                                component='div'
                                className='gr_text_choice_modal'
                              >
                                Play random videos
                              </Typography>
                            </Grid>
                          </Box>
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Container>
            </Fade>
          </Modal>

          {/* Modal Saved List */}
          <Modal
            open={openSavedModal}
            onClose={closeModalSongListSavedHandler}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
            closeAfterTransition
          >
            <Fade in={openSavedModal}>
              <Container maxWidth='md' style={{ height: '100vh' }}>
                <Grid
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  style={{ height: '100vh' }}
                >
                  <Box width='100%' padding={5} className='gr_modal_box'>
                    <Grid display='flex' justifyContent='flex-end'>
                      <IconButton onClick={closeModalSongListSavedHandler}>
                        <CancelIcon
                          className='gr_close_modal_btn'
                          style={{
                            width: '3rem',
                            height: '3rem',
                          }}
                        />
                      </IconButton>
                    </Grid>

                    <Grid marginBottom={5}>
                      <Typography
                        component='div'
                        variant='h3'
                        textAlign='center'
                        className='gr_modal_text_one'
                        paddingBottom={3}
                        style={{ textDecoration: 'underline' }}
                      >
                        List Saved
                      </Typography>
                      <Typography
                        component='div'
                        variant='h4'
                        textAlign='center'
                        className='gr_modal_text_one'
                      >
                        You chose {listTitle}
                      </Typography>
                      <Typography
                        component='div'
                        variant='h3'
                        textAlign='center'
                        className='gr_modal_text_two'
                      >
                        What you wanna do?
                      </Typography>
                    </Grid>

                    <Grid container spacing={6} paddingTop={3}>
                      <Grid
                        xs={12}
                        md={6}
                        justifyContent='center'
                        alignItems='center'
                        className='gr_option_container'
                      >
                        <Link
                          style={{ textDecoration: 'none' }}
                          to='/bpm/saved-list'
                        >
                          <Box className='gr_box_options_modal'>
                            <Grid
                              display='flex'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='center'
                            >
                              <PlayCircleFilledWhiteIcon
                                style={{
                                  width: '5rem',
                                  height: '5rem',
                                  marginBottom: '1rem',
                                }}
                                className='gr_icon_choice_modal'
                              />
                              <Typography
                                variant='body1'
                                component='div'
                                className='gr_text_choice_modal'
                              >
                                Play random songs with BPM
                              </Typography>
                            </Grid>
                          </Box>
                        </Link>
                      </Grid>

                      <Grid
                        xs={12}
                        md={6}
                        justifyContent='center'
                        alignItems='center'
                        className='gr_option_container'
                      >
                        <Link
                          style={{ textDecoration: 'none' }}
                          to='/video/saved-list'
                        >
                          <Box className='gr_box_options_modal'>
                            <Grid
                              display='flex'
                              flexDirection='column'
                              alignItems='center'
                              justifyContent='center'
                            >
                              <PlayCircleOutlineIcon
                                style={{
                                  width: '5rem',
                                  height: '5rem',
                                  marginBottom: '1rem',
                                }}
                                className='gr_icon_choice_modal'
                              />
                              <Typography
                                variant='body1'
                                component='div'
                                className='gr_text_choice_modal'
                              >
                                Play random videos
                              </Typography>
                            </Grid>
                          </Box>
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Container>
            </Fade>
          </Modal>
        </Container>
      </ThemeProvider>
    </>
  );
};
