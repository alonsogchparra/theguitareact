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
import CancelIcon from '@mui/icons-material/Cancel';
import { SongModalOptions } from './elements/SongModalOptions';

export const SongModal = ({
  artist,
  extraInfo,
  handleCloseModal,
  id,
  openModal,
  title,
  beatPerMinute,
  beatsPerMeasure,
}) => {
  return (
    <>
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
                    variant='h4'
                    textAlign='center'
                    className='gr_modal_text_one'
                    sx={{ fontSize: { xs: '1.5rem', md: '2.0243rem' } }}
                  >
                    You chose {title}
                  </Typography>
                  <Typography
                    component='div'
                    variant='h4'
                    textAlign='center'
                    className='gr_modal_text_one'
                    sx={{ fontSize: { xs: '1.2rem', md: '2.0243rem' } }}
                  >
                    by {artist}
                  </Typography>
                  <Typography
                    component='div'
                    variant='h3'
                    textAlign='center'
                    className='gr_modal_text_two'
                    marginTop={2}
                    sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
                  >
                    What you wanna do?
                  </Typography>
                </Grid>

                <Grid container spacing={6} paddingTop={5}>
                  <SongModalOptions
                    id={id}
                    artist={artist}
                    title={title}
                    extraInfo={extraInfo}
                    beatPerMinute={beatPerMinute}
                    beatsPerMeasure={beatsPerMeasure}
                  />
                </Grid>
              </Box>
            </Grid>
          </Container>
        </Fade>
      </Modal>
    </>
  );
};
