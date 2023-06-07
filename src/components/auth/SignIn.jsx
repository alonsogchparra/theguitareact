import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Container,
  CssBaseline,
  responsiveFontSizes,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { ReactComponent as Icon } from '../../assets/guitareact_logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { theCurrentTheme } from '../../features/theme/themeSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { login } from '../../features/auth/userSlice';
import { signInTypography } from '../../utils/typographySelection';
import { SignInForm } from './SignInForm';

let theme = signInTypography();

theme = responsiveFontSizes(theme);

export const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showHidePwd, setShowHidePwd] = useState(false);
  const [isSignInWrong, setIsSignInWrong] = useState(false);

  const dispatch = useDispatch();

  const currentTheme = useSelector(theCurrentTheme);

  const handlerShowHidePwd = () => {
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

            <SignInForm
              showHidePwd={showHidePwd}
              isSignInWrong={isSignInWrong}
              signInHandler={signInHandler}
              setIsSignInWrong={setIsSignInWrong}
              setEmail={setEmail}
              setPassword={setPassword}
              handlerShowHidePwd={handlerShowHidePwd}
            />
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  );
};
