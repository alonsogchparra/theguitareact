import React, { useEffect, useState } from 'react';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  Typography,
  Hidden,
  IconButton,
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
import { NavbarDrawer } from './drawers/NavbarDrawer';
import { NavbarOptions } from './NavbarOptions';

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
              <NavbarOptions />

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
              <NavbarDrawer
                changeThemeHandler={changeThemeHandler}
                logoutHandler={logoutHandler}
              />
            </Drawer>
          </Hidden>
        </nav>
      </ThemeProvider>
    </>
  );
};
