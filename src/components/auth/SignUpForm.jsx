import React from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const SignUpForm = ({
  showHidePwd,
  showHideConPwd,
  setIsSignUpWrong,
  setFullname,
  setEmail,
  setPassword,
  setConfirmPassword,
  handlerShowHideConPwd,
  handlerShowHidePwd,
}) => {
  return (
    <div>
      <TextField
        id='full_name_input'
        label='Full name'
        variant='standard'
        fullWidth
        margin='normal'
        autoComplete='off'
        type='text'
        className='gr_email_input'
        onChange={(e) => {
          setIsSignUpWrong(false);
          setFullname(e.target.value);
        }}
        inputProps={{
          autoComplete: 'off',
        }}
      />
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
          setIsSignUpWrong(false);
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
        onChange={(e) => {
          setIsSignUpWrong(false);
          setPassword(e.target.value);
        }}
        type={!showHidePwd ? 'password' : 'text'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handlerShowHidePwd}>
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
      <TextField
        id='confirm_password_input'
        label='Confirm password'
        variant='standard'
        fullWidth
        margin='normal'
        autoComplete='off'
        className='gr_password_input'
        onChange={(e) => {
          setIsSignUpWrong(false);
          setConfirmPassword(e.target.value);
        }}
        type={!showHideConPwd ? 'password' : 'text'}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handlerShowHideConPwd}>
                {showHideConPwd ? (
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
  );
};
