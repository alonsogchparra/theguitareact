import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Container,
  Fade,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';
import moment from 'moment';
import { useDeleteSongMutation } from '../../features/songs/songsApi';
import { Link, useNavigate } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import CancelIcon from '@mui/icons-material/Cancel';

export const SongItem = ({
  song: { title, displayName, artist, timestamp, id, extraInfo},
  uid,
  added,
  openModal,
  handleCloseModal,
  handleOpenModal,
  openModalHandler,
  addSongTemporalHandler,
}) => {
  const user = useSelector(selectUser);
  const [deleteSong] = useDeleteSongMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteSong(id);
    } catch (error) {
      console.log('ERROR deleting song', error);
    }
  };

  // console.log('USER', user);
  // console.log('USER.UID', user.uid);
  // console.log('UID ITEM', uid);
  // console.log('ID ITEM', id);
  // console.log('TItle', title);
  // console.log('Artist', artist);

  return (
    <>
      {user.uid === uid && (
        <Grid xs={12} md={6} lg={4} mb={3}>
          <Box className='gr_song_box'>
            <Grid
              display='flex'
              justifyContent='space-between'
              alignItems='center'
            >
              <Typography component='div' variant='h5' className='gr_song_name'>
                {title}
              </Typography>
              {/* <Link to={`/song/${id}`} state={{ artist, title, extraInfo }}> */}
              <IconButton
                onClick={() => openModalHandler(artist, title, extraInfo, id)}
              >
                <PlayCircleOutlineIcon
                  style={{ width: '3.5rem', height: '3.5rem' }}
                  className='gr_song_action'
                />
              </IconButton>
              {/* </Link> */}
            </Grid>
            <Grid>
              <Typography
                component='div'
                variant='h6'
                className='gr_song_info'
                style={{ fontWeight: '600' }}
              >
                {artist}
              </Typography>
              <Typography component='div' variant='h6' className='gr_song_info'>
                Added by {displayName}
              </Typography>
              <Typography component='div' variant='h6' className='gr_song_info'>
                {moment.unix(timestamp.seconds).format('MM/DD/YYYY')}
              </Typography>
            </Grid>
            <Grid
              display='flex'
              justifyContent='space-between'
              className='gr_top_line'
            >
              <IconButton onClick={() => deleteHandler(id)}>
                <DeleteIcon
                  className='gr_song_action'
                  style={{ width: '3rem', height: '3rem' }}
                />
              </IconButton>
              <Link to={`/update/${id}`}>
                <IconButton>
                  <EditIcon
                    className='gr_song_action'
                    style={{ width: '3rem', height: '3rem' }}
                  />
                </IconButton>
              </Link>
              <IconButton
                onClick={() =>
                  addSongTemporalHandler(id, uid, artist, title, extraInfo)
                }
                disabled={added}
              >
                <PlaylistAddIcon
                  className='gr_song_action'
                  style={{
                    width: '3rem',
                    height: '3rem',
                    opacity: added ? 0.5 : 1,
                  }}
                />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      )}
    </>
  );
};
