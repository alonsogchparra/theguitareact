import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';

export const VideoVersionButton = ({ btnTitle, typeVideo, setVideoType }) => {
  return (
    <Button
      variant='contained'
      fullWidth
      className='gr_start_btn'
      onClick={() => setVideoType(typeVideo)}
    >
      <Box width='100%'>
        <Grid container display='flex' flexDirection='row'>
          <Grid
            display='flex'
            justifyContent='center'
            alignItems='center'
            flex={1}
          >
            <Typography
              variant='body1'
              component='div'
              textAlign='center'
              fontFamily='Outfit'
              fontWeight='700'
              sx={{
                fontSize: { xs: '0.8rem', md: '1rem' },
              }}
            >
              {btnTitle}
            </Typography>
          </Grid>
          <Grid
            justifyContent='flex-start'
            alignItems='center'
            sx={{ display: { xs: 'none', lg: 'flex' } }}
          >
            <OndemandVideoIcon
              style={{
                width: '1.2rem',
                height: '1.2rem',
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Button>
  );
};
