import { useState } from 'react';
import { Avatar, IconButton, Menu, MenuItem, Box } from '@mui/material';
import hacksoftLogo from '../../assets/hacksoftLogo.png';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
          <img src={hacksoftLogo} alt="HackSoft logo" className="h-10" />
        </Box>

        <Box>
          <IconButton onClick={handleOpenMenu}>
            <Avatar alt="User" src="https://i.pravatar.cc/150?img=13" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
          </Menu>
        </Box>
      </Box>
    </header>
  );
};

export default Header;
