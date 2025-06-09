// src/router/AppRouter.tsx
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from '../components/Header/Header';
import Feed from '../pages/Feed/Feed';
import Auth from '../pages/Auth/Auth';
import { useAuthStore } from '../store/useAuthStore';
import { Box, CircularProgress } from '@mui/material';
import ScrollToTop from '../components/Routing/ScrollToTop';
import { UserProfile } from '../pages/Profile/UserProfile';
import type { JSX } from 'react';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <Box
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        zIndex={1300}
      >
        <CircularProgress />
      </Box>
    );
  }

  return user ? children : <Navigate to="/auth" />;
}

export const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />
        <Route path="/profile/:userId/:slug?" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};
