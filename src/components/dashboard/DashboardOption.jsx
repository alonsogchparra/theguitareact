import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

export const DashboardOption = ({ linkTo, optionText, Icon }) => {
  return (
    <Grid
      xs={12}
      md={6}
      lg={3}
      justifyContent='center'
      alignItems='center'
      className='gr_option_container'
    >
      <Link style={{ textDecoration: 'none' }} to={`/${linkTo}`}>
        <Box className='gr_box_options'>
          <Grid
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <Icon />
            <Typography
              variant='body1'
              component='div'
              className='gr_text_choice'
            >
              {optionText}
            </Typography>
          </Grid>
        </Box>
      </Link>
    </Grid>
  );
};
