import React from 'react';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const NavbarOption = ({ linkTo, titleLink }) => {
  return (
    <NavLink
      to={`${linkTo}`}
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
        {titleLink}
      </Typography>
    </NavLink>
  );
};
