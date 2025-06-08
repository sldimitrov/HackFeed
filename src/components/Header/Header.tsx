import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Box } from '@mui/material';
import hacksoftLogo from '../../assets/hacksoftLogo.png';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile } from '../../hooks/useProfile.ts';
import defaultAvatar from '../../assets/defaultAvatar.jpeg';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, logout } = useAuthStore();
  const { data: profile } = useUserProfile(user?.id);
  const navigate = useNavigate();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleCloseMenu();
    navigate('/profile');
  };

  const handleLogout = async () => {
    handleCloseMenu();
    await logout();
    navigate('/auth');
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'white',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" px={3} py={1}>
        <Box display="flex" alignItems="center" gap={2}>
          <Link to="/">
            <img src={hacksoftLogo} alt="HackSoft logo" className="h-10" />
          </Link>
        </Box>

        <Box>
          {user && (
            <>
              <IconButton onClick={handleOpenMenu}>
                <Avatar src={profile?.avatar_url || defaultAvatar} alt="Profile Avatar" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Box>
      </Box>
    </header>
  );
};

export default Header;
