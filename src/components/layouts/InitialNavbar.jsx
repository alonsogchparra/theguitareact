import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  CssBaseline,
  Drawer,
  Hidden,
  IconButton,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeTheme,
  selectThemes,
  theCurrentTheme,
} from '../../features/theme/themeSlice';
import Grid from '@mui/material/Unstable_Grid2';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { initialNavbarTypography } from '../../utils/typographySelection';
import { InitialDrawer } from './drawers/InitialDrawer';

const theme = initialNavbarTypography();

export const InitialNavbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const themes = useSelector(selectThemes);
  const currentTheme = useSelector(theCurrentTheme);
  const dispatch = useDispatch();

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
              <Box>
                <Grid display='flex' justifyContent='space-between'>
                  <NavLink
                    to='/signin'
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
                      Sign in
                    </Typography>
                  </NavLink>
                  <NavLink
                    to='/signup'
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
                      Sign up
                    </Typography>
                  </NavLink>
                </Grid>
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

        <nav>
          <Hidden lgUp>
            <Drawer
              variant='temporary'
              anchor='right'
              open={isDrawerOpen}
              onClose={handleDrawerToggle}
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
              <InitialDrawer changeThemeHandler={changeThemeHandler} />
            </Drawer>
          </Hidden>
        </nav>
      </ThemeProvider>
    </>
  );
};
