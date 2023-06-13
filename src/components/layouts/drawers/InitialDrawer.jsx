import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { NavLink } from 'react-router-dom';

export const InitialDrawer = ({changeThemeHandler}) => {
  return (
    <>
      <Box sx={{ width: 270 }}>
        <List>
          <Grid
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
            height='90vh'
            overflow='hidden'
          >
            <Box>
              <ListItem>
                <NavLink
                  to='signin'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Sign in
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to='signup'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Sign Up
                  </Typography>
                </NavLink>
              </ListItem>
            </Box>

            <Box>
              <ListItem
                className='gr_ct_container_drawer'
                onClick={changeThemeHandler}
              >
                <Typography variant='h6' component='div'>
                  Change Theme
                </Typography>
              </ListItem>
              <ListItem
                className='gr_vms_container_drawer'
                onClick={() =>
                  window.open('https://alonsogchparra.web.app/', '_blank')
                }
              >
                <Typography variant='h6' component='div'>
                  Visit my website
                </Typography>
              </ListItem>
            </Box>
          </Grid>
        </List>
      </Box>
    </>
  );
};
