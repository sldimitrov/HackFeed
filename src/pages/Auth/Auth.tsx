import { Box, Container, Paper, Typography } from '@mui/material';
import { AuthForm } from './AuthForm';
import hacksoftLogo from '../../assets/hacksoftLogo.png';
import { useState } from 'react';
import { Background } from '../../components/Base/Background.tsx';

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <Box
      position="relative"
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ bgcolor: '#f7f7f7', overflow: 'hidden' }}
    >
      {/* Background */}
      <Background />

      {/* Auth Box */}
      <Container maxWidth="xs" sx={{ zIndex: 1 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Box mb={2}>
            <img src={hacksoftLogo} alt="HackSoft logo" style={{ height: 48 }} />
          </Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Welcome to the Feed
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please {isRegister ? 'sign up' : 'sign in'} to continue.
          </Typography>

          <AuthForm isRegister={isRegister} setIsRegister={setIsRegister} />
        </Paper>
      </Container>
    </Box>
  );
};

export default Auth;
