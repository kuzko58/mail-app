import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { Mail as MailIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchClient } from '@/api/client';
import { setUser } from '@/store/user.slice';
import { QueryClientSuccess, QueryClientError } from '@/types/global.types';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutMutation = useMutation<QueryClientSuccess<null>, QueryClientError>({
    mutationFn: async () => {
      return fetchClient('/auth/logout', {
        method: 'PATCH',
      });
    },
  });

  const navigateHome = () => {
    navigate('/');
  };

  const handleInboxClick = () => {
    handleMenuClose();
    navigate('/inbox');
  };

  const handleLogoutClick = async () => {
    logoutMutation.mutate();
    dispatch(setUser(null));
    navigate('/login');
    handleMenuClose();
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            cursor: 'pointer',
          }}
          onClick={navigateHome}
        >
          Mail App
        </Typography>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleMenuOpen}
          aria-controls={open ? 'user-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Avatar sx={{ width: 32, height: 32 }} />
        </IconButton>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleInboxClick}>
            <ListItemIcon>
              <MailIcon fontSize="small" />
            </ListItemIcon>
            Inbox
          </MenuItem>
          <MenuItem onClick={handleLogoutClick}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
