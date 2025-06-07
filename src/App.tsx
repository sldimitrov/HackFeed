import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Feed from './pages/Feed/Feed';
import Auth from './pages/Auth/Auth.tsx';
import { useAuthStore } from './store/useAuthStore.ts';
import './index.css';
import type { JSX } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Profile from './pages/Profile/Profile.tsx';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }
  return user ? children : <Navigate to="/auth" />;
}

function App() {
  return (
    <Router>
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
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
