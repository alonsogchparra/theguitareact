import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  InputAdornment,
  responsiveFontSizes,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { login } from '../../features/auth/userSlice';
import { signInTypography } from '../../utils/typographySelection';

let theme = signInTypography();

theme = responsiveFontSizes(theme);

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHidePwd, setShowHidePwd] = useState(false);
  const [isSignInWrong, setIsSignInWrong] = useState(false);

  const dispatch = useDispatch();

  const currentTheme = useSelector(theCurrentTheme);

  const handlerShowHidePwdHandler = () => {
    setShowHidePwd(!showHidePwd);
  };

  const signInHandler = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        setIsSignInWrong(false);
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
      })
      .catch((err) => {
        console.log('SIGN IN ERROR', err);
        setIsSignInWrong(true);
      });
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth='sm' className='animate__animated animate__fadeIn'>
          <Grid paddingTop={5}>
            <Grid display='flex' justifyContent='space-between'>
              <Typography
                component='div'
                variant='h3'
                textAlign='center'
                className='gr_add_song_title'
                display='flex'
                justifyContent='center'
                alignSelf='center'
              >
                Sign In
              </Typography>
              <Icon
                width='80px'
                fill={
                  currentTheme === 'blackYellow'
                    ? '#FEEA36'
                    : currentTheme === 'yellowBlack'
                    ? '#1D1D1D'
                    : currentTheme === 'blueWhite'
                    ? '#61DAFB'
                    : currentTheme === 'whiteBlue'
                    ? '#10374A'
                    : currentTheme === 'redDark'
                    ? '#FF3434'
                    : currentTheme === 'red'
                    ? '#4F0303'
                    : ''
                }
              />
            </Grid>

            <Box
              component='form'
              onSubmit={(e) => signInHandler(e)}
              marginTop={1}
            >
              <div>
                <TextField
                  id='email_input'
                  label='Email'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  type='email'
                  className='gr_email_input'
                  onChange={(e) => {
                    setIsSignInWrong(false);
                    setEmail(e.target.value);
                  }}
                />
                <TextField
                  id='password_input'
                  label='Password'
                  variant='standard'
                  fullWidth
                  margin='normal'
                  autoComplete='off'
                  className='gr_password_input'
                  type={!showHidePwd ? 'password' : 'text'}
                  onChange={(e) => {
                    setIsSignInWrong(false);
                    setPassword(e.target.value);
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position='end'
                        className='gr_icon_text_container'
                      >
                        <IconButton onClick={handlerShowHidePwdHandler}>
                          {showHidePwd ? (
                            <VisibilityOffIcon className='gr_icon_textfield' />
                          ) : (
                            <VisibilityIcon className='gr_icon_textfield' />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </div>

              {isSignInWrong && (
                <Box paddingTop={7}>
                  <Typography
                    variant='body1'
                    component='div'
                    textAlign='center'
                    className='gr_welcome_title'
                  >
                    Something is wrong. Check if you added the email and
                    password correctly. Or try later.
                  </Typography>
                </Box>
              )}

              <Button
                fullWidth
                variant='contained'
                style={{ marginTop: '80px' }}
                className='gr_add_button'
                type='submit'
              >
                <Typography component='div' variant='h4'>
                  SIGN IN
                </Typography>
              </Button>
            </Box>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
