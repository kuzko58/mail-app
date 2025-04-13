import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/client';
import { Box, CircularProgress } from '@mui/material';
import { QueryClientError, QueryClientSuccess } from '@/types/global.types';
import { IUser } from '@/types/user.types';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { setUser } from '@/store/user.slice';
import Navbar from './Navbar';

const AppLayout = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const location = useLocation();

  // Fetch authenticated user
  const { isLoading, isError, data } = useQuery<
    QueryClientSuccess<{ user: IUser }>,
    QueryClientError
  >({
    queryKey: ['me'],
    enabled: !user,
    queryFn: () => fetchClient('/auth/me'),
    // staleTime: 1000 * 60 * 5, // optional: cache for 5 minutes
    retry: 2,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUser(data.data.user));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if ((!user && !data) || isError) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          overflow: 'auto',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AppLayout;
