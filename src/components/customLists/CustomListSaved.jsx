import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/userSlice';

export const CustomListSaved = ({
  customList,
  deleteCustomListHandler,
  songListSavedOpenModalHandler,
}) => {
  const user = useSelector(selectUser);
  return (
    <>
      {user.uid === customList.uid && (
        <Grid xs={12} md={6} lg={4}>
          <List className='gr_list_container' key={customList?.id}>
            <ListItem
              secondaryAction={
                <>
                  <IconButton
                    onClick={() => deleteCustomListHandler(customList.id)}
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
                  <ListItem key={song.id}>
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
      )}
    </>
  );
};
