import React, { useEffect, useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  createTheme,
  Hidden,
  IconButton,
  List,
  ListItem,
  Drawer,
} from '@mui/material';
import { Box } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTheme,
  selectThemes,
  theCurrentTheme,
} from '../../features/theme/themeSlice';
import { logout } from '../../features/auth/userSlice';
import { auth } from '../../firebase';
import { navbarTypography } from '../../utils/typographySelection';

const theme = navbarTypography();

export const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const themes = useSelector(selectThemes);
  const currentTheme = useSelector(theCurrentTheme);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    auth.signOut();
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const setTheme = () => {
    const theme = themes[currentTheme];

    Object.keys(theme).forEach((key) => {
      const cssKey = `--${key}`;
      const cssValue = theme[key];

      document.body.style.setProperty(cssKey, cssValue);
    });
  };

  const changeThemeHandler = () => {
    dispatch(changeTheme(currentTheme));
  };

  useEffect(() => {
    setTheme();
  }, [currentTheme]);

  const drawer = (
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='xl'>
          <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            paddingTop={1}
          >
            <Box>
              <NavLink
                to='/'
                style={{ textDecoration: 'none' }}
                className='gr_nav_tittle'
              >
                <Typography variant='h5' component='div'>
                  GuitaReact
                </Typography>
              </NavLink>
            </Box>
            <Hidden lgDown>
              <Box>
                <Grid display='flex' justifyContent='space-between'>
                  <NavLink
                    to='add-song'
                    style={({ isActive }) => ({
                      paddingLeft: 10,
                      paddingRight: 10,
                      textDecoration: isActive ? 'underline' : 'none',
                    })}
                    className={({ isActive }) =>
                      isActive ? 'gr_nav_item_selected' : 'gr_nav_item'
                    }
                  >
                    <Typography variant='h6' component='div'>
                      Add Song
                    </Typography>
                  </NavLink>
                  <NavLink
                    to='songs-list'
                    style={({ isActive }) => ({
                      paddingLeft: 10,
                      paddingRight: 10,
                      textDecoration: isActive ? 'underline' : 'none',
                    })}
                    className={({ isActive }) =>
                      isActive ? 'gr_nav_item_selected' : 'gr_nav_item'
                    }
                  >
                    <Typography variant='h6' component='div'>
                      Songs List
                    </Typography>
                  </NavLink>
                  <NavLink
                    to='custom-lists'
                    style={({ isActive }) => ({
                      paddingLeft: 10,
                      paddingRight: 10,
                      textDecoration: isActive ? 'underline' : 'none',
                    })}
                    className={({ isActive }) =>
                      isActive ? 'gr_nav_item_selected' : 'gr_nav_item'
                    }
                  >
                    <Typography variant='h6' component='div'>
                      Custom List
                    </Typography>
                  </NavLink>
                  <NavLink
                    to='random-songs-with-bpm'
                    style={({ isActive }) => ({
                      paddingLeft: 10,
                      paddingRight: 10,
                      textDecoration: isActive ? 'underline' : 'none',
                    })}
                    className={({ isActive }) =>
                      isActive ? 'gr_nav_item_selected' : 'gr_nav_item'
                    }
                  >
                    <Typography variant='h6' component='div'>
                      Random All Songs with BPM
                    </Typography>
                  </NavLink>
                  <NavLink
                    to='random-videos'
                    style={({ isActive }) => ({
                      paddingLeft: 10,
                      paddingRight: 10,
                      textDecoration: isActive ? 'underline' : 'none',
                    })}
                    className={({ isActive }) =>
                      isActive ? 'gr_nav_item_selected' : 'gr_nav_item'
                    }
                  >
                    <Typography variant='h6' component='div'>
                      Random All Videos
                    </Typography>
                  </NavLink>
                </Grid>
              </Box>

              <Box>
                <Link
                  style={{ textDecoration: 'none' }}
                  onClick={logoutHandler}
                >
                  <Typography
                    variant='h6'
                    component='div'
                    className='gr_nav_item'
                  >
                    Logout
                  </Typography>
                </Link>
              </Box>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                edge='start'
                onClick={handleDrawerToggle}
              >
                <MenuIcon className='gr_menu_drawer' />
              </IconButton>
            </Hidden>
          </Grid>
        </Container>

        {/* Drawer */}
        <nav>
          <Hidden lgUp>
            <Drawer
              variant='temporary'
              anchor='right'
              open={isDrawerOpen}
              onClose={handleDrawerToggle}
              // className='gr_bg_drawer'
            >
              <Grid container justifyContent='space-between'>
                <Box display='flex' alignItems='center' justifyContent='center'>
                  <NavLink
                    to='/'
                    style={({ isActive }) => ({
                      textDecoration: 'none',
                      paddingLeft: 10,
                    })}
                    className='gr_title_drawer'
                  >
                    <Typography variant='h5' component='div'>
                      GuitarReact
                    </Typography>
                  </NavLink>
                </Box>
                <Box>
                  <IconButton onClick={handleDrawerToggle}>
                    <CancelSharpIcon
                      fontSize='large'
                      className='gr_close_drawer'
                    />
                  </IconButton>
                </Box>
              </Grid>
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      </ThemeProvider>
    </>
  );
};
