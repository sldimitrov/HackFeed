import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useAuthStore } from '../../store/useAuthStore.ts';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AuthFormData, AuthFormProps } from '../../types/auth.ts';
import { authSchema } from '../../schemas/authSchema.ts';
import { useState } from 'react';

export const AuthForm = ({ isRegister, setIsRegister }: AuthFormProps) => {
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuthStore();
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: yupResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isRegister) {
        await register(data.email, data.password);
        reset();
        setIsRegister(false);
      } else {
        await login(data.email, data.password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      // Placeholder for toast
    }
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <TextField
            label="Email"
            fullWidth
            {...formRegister('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            {...formRegister('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          {error && (
            <Typography variant="body2" color="error" align="center" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
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
      </form>
    </Box>
  );
};
