import React from 'react';
import { ArrowDropDown, NotificationsNone } from "@mui/icons-material";
import { AppBar, Avatar, Button, IconButton, Toolbar, Link, Chip } from '@mui/material';
import './AppToolbar.css'
import { useCurrentUser } from '../../../core/auth';
import Logo from '../Logo';
import ThemeButton from '../ThemeButton';

const AppToolbar = () => {
  const me = useCurrentUser();
  const menuAnchorRef = React.createRef()

  const getFirstName = (displayName) => {
    return displayName && displayName.split(" ")[0];
  }

  return (
    <AppBar
    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, padding: "0 24px", mb: 2}}
    elevation={1}
    >
      <Toolbar>
        <Link 
          href="/" 
          variant="h6"
          edge="start"
          color="inherit" 
          underline="none">
          <Logo />
        </Link>
        <span style={{ flexGrow: 1 }} />
        {me !== undefined && <ThemeButton sx={{ mr: 1 }} />}
        {me && (
          <Chip
            sx={{
              height: 40,
              borderRadius: 20,
              fontWeight: 600,
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              ".MuiChip-avatar": { width: 32, height: 32 },
            }}
            href="/"
            avatar={
              <Avatar
                alt={me?.displayName || (me?.isAnonymous ? "Anonymous" : "")}
                src={me?.photoURL || undefined}
              />
            }
            label={getFirstName(
              me?.displayName || (me?.isAnonymous ? "Anonymous" : ""),
            )}
          />
        )}
        {me && (
          <IconButton
            sx={{
              marginLeft: (x) => x.spacing(1),
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              width: 40,
              height: 40,
            }}
            // onClick={openNotificationsMenu}
          >
            <NotificationsNone />
          </IconButton>
        )}
        {me && (
          <IconButton
            ref={menuAnchorRef}
            sx={{
              marginLeft: (x) => x.spacing(1),
              backgroundColor: (x) =>
                x.palette.mode === "light"
                  ? x.palette.grey[300]
                  : x.palette.grey[700],
              width: 40,
              height: 40,
            }}
            // onClick={openUserMenu}
          >
            <ArrowDropDown />
          </IconButton>
        )}
        {me === null && (
          <Button
            variant="text"
            href="/login"
            color="inherit"
          >
            Log in
          </Button>
        )}
        {me === null && (
          <Button
            variant="outlined"
            href="/register"
            color="inherit"
          >
            Create an account
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default AppToolbar;
