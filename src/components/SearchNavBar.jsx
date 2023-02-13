import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useState } from "react";
import { AppBar, Avatar, Box, Divider, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from "@mui/material"
import { Clear, Email, Logout, Person, PersonAdd, Settings } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



const SearchNavBar = ({ keyWord, setKeyWord }) => {

  const avatarStyle = { backgroundColor: '#2149e4', width: 32, height: 32 }
  const menuItemStyle = { mr: "1rem" }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const location = useLocation()
  const isLoginPage = location.pathname.search('login') !== -1


  const handleClear = () => setKeyWord("")

  const handleSearchChange = (e) => setKeyWord(e.target.value)

  const handleKeyUp = (e) => e.keyCode == 27 && setKeyWord("")

  const handleMenuClick = (e) => setAnchorEl(e.currentTarget)

  const handleMenuClose = () => setAnchorEl(null)

  let user = {}
  const auth = localStorage.getItem("react-demo-token")
  if (auth) {
    user = JSON.parse(localStorage.getItem("react-demo-user"))
  }

  const logout = () => {
    localStorage.removeItem('react-demo-token')
    localStorage.removeItem('react-demo-user')
    // setTimeout(() => {
    window.location.reload()
    // }, 2000)
  }



  return (
    <>
      <Box sx={{ flexGrow: 1, mb: 3 }}>
        <AppBar position="static">
          <Toolbar>
            {
              !isLoginPage && (
                <>
                  <IconButton
                    sx={{ ml: 2, mr: 3 }}
                    onClick={handleMenuClick}
                  >
                    <Avatar sx={avatarStyle} />
                  </IconButton>
                  <Menu
                    open={open}
                    anchorEl={anchorEl}
                    onClick={handleMenuClose}>
                    <MenuItem>
                      <Email color="primary" sx={menuItemStyle} /> {user.email}
                    </MenuItem>
                    <MenuItem>
                      <Person color="primary" sx={menuItemStyle} /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <PersonAdd color="primary" sx={menuItemStyle} /> Add another account
                    </MenuItem>
                    <MenuItem>
                      <Settings color="primary" sx={menuItemStyle} /> Settings
                    </MenuItem>
                    <MenuItem onClick={logout}>
                      <Logout color="primary" sx={menuItemStyle} /> Logout
                    </MenuItem>
                  </Menu>
                </>
              )
            }
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Product Management
            </Typography>
            <Search>
              <SearchIconWrapper>
                <Search />
              </SearchIconWrapper>
              <StyledInputBase
                value={keyWord}
                placeholder="Search…"
                onChange={handleSearchChange}
                onKeyUp={handleKeyUp}
              />
              <IconButton
                onClick={handleClear}
                sx={{ color: "white", visibility: keyWord ? "visible" : "hidden" }}>
                <Clear />
              </IconButton>
            </Search>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default SearchNavBar