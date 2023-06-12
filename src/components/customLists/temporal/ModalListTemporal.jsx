import React from 'react';
import {
  Box,
  Container,
  Fade,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import CancelIcon from '@mui/icons-material/Cancel';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

export const ModalListTemporal = ({
  openModal,
  handleCloseModal,
  temporalTitle,
}) => {
  return (
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
                    sx={{
                      width: { xs: '2rem', md: '3rem' },
                      height: { xs: '2rem', md: '3rem' },
                    }}
                  />
                </IconButton>
              </Grid>

              <Grid sx={{ marginBottom: { xs: 1, md: 5 } }}>
                <Typography
                  component='div'
                  variant='h3'
                  textAlign='center'
                  className='gr_modal_text_one'
                  paddingBottom={3}
                  style={{ textDecoration: 'underline' }}
                  sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
                >
                  Temporal List
                </Typography>
                <Typography
                  component='div'
                  variant='h4'
                  textAlign='center'
                  className='gr_modal_text_one'
                  sx={{ fontSize: { xs: '1.2rem', md: '1.5625rem' } }}
                >
                  You chose {temporalTitle}
                </Typography>
                <Typography
                  component='div'
                  variant='h3'
                  textAlign='center'
                  className='gr_modal_text_two'
                  sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
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
                            marginBottom: '1rem',
                          }}
                          className='gr_icon_choice_modal'
                          sx={{
                            width: { xs: '3rem', md: '5rem' },
                            height: { xs: '3rem', md: '5rem' },
                          }}
                        />
                        <Typography
                          variant='body1'
                          component='div'
                          className='gr_text_choice_modal'
                          sx={{ fontSize: { xs: '0.9rem', md: '1rem' } }}
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
                            marginBottom: '1rem',
                          }}
                          className='gr_icon_choice_modal'
                          sx={{
                            width: { xs: '3rem', md: '5rem' },
                            height: { xs: '3rem', md: '5rem' },
                          }}
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
  );
};
