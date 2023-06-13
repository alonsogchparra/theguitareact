import React from 'react';
import { Box, List, ListItem, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, NavLink } from 'react-router-dom';

export const NavbarDrawer = ({ changeThemeHandler, logoutHandler }) => {
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
                  to='add-song'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Add Song
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to='songs-list'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Songs List
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to='custom-lists'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Custom List
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to='random-songs-with-bpm'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Random All Songs with BPM
                  </Typography>
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to='random-videos'
                  style={({ isActive }) => ({
                    textDecoration: isActive ? 'underline' : 'none',
                  })}
                  className='gr_items_drawer'
                >
                  <Typography variant='h6' component='div'>
                    Random All Videos
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

            <Box>
              <ListItem className='gr_logout_container_drawer'>
                <Link
                  style={{ textDecoration: 'none' }}
                  onClick={logoutHandler}
                >
                  <Typography variant='h6' component='div'>
                    Logout
                  </Typography>
                </Link>
              </ListItem>
            </Box>
          </Grid>
        </List>
      </Box>
    </>
  );
};
