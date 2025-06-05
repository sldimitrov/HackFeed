import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert, Stack } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useNavigate } from 'react-router-dom';

interface AuthFormProps {
  isRegister: boolean;
  setIsRegister: (value: boolean) => void;
}

export const AuthForm = ({ isRegister, setIsRegister }: AuthFormProps) => {
  const { login, register } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      if (isRegister) {
        await register(email, password);
        resetForm();
        setIsRegister(false);
      } else {
        await login(email, password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setLoading(false);
  };

  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          disabled={loading}
        >
          {isRegister ? 'Sign Up' : 'Log In'}
        </Button>

        <Typography
          variant="body2"
          align="center"
          sx={{ cursor: 'pointer', mt: 1 }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Already have an account? Log in' : "Don't have an account? Sign up"}
        </Typography>
      </Stack>
    </Box>
  );
};
