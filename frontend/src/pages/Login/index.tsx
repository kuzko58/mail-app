import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { fetchClient } from '@/api/client';
import type { QueryClientSuccess, QueryClientError } from '@/types/global.types';
import type { IUser } from '@/types/user.types';
import { formatYupError } from '@/utils';
import { setUser } from '@/store/user.slice';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: yup.string().required('Email is required').email('Invalid email address'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const navigate = useNavigate();

  const handleOpenSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage('');
    setOpenSnackbar(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const loginMutation = useMutation<
    QueryClientSuccess<{ user: IUser }>,
    QueryClientError,
    FormData
  >({
    mutationFn: (data: FormData) => {
      return fetchClient('/auth/signin', {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    onSuccess: (data) => {
      dispatch(setUser(data.data.user));
      navigate('/');
    },
    onError: (err) => {
      handleOpenSnackbar(err.message || 'An error occurred');
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    schema
      .validate(inputs, { abortEarly: false })
      .then((data) => {
        loginMutation.mutate(data);
      })
      .catch((err) => {
        const errorData = formatYupError(err);
        setErrors((prev) => ({
          ...prev,
          ...errorData,
        }));
      });
  };

  return (
    <Box mt={10} maxWidth={400} mx="auto">
      <Typography variant="h4" mb={2}>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            name="email"
            label="Email"
            fullWidth
            value={inputs.email}
            error={!!errors.email}
            helperText={errors.email}
            onChange={handleInputChange}
          />
        </Box>
        <Box mb={2}>
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={inputs.password}
            error={!!errors.password}
            helperText={errors.password}
            onChange={handleInputChange}
          />
        </Box>
        <Button variant="contained" type="submit" fullWidth disabled={loginMutation.isPending}>
          {loginMutation.isPending ? (
            <>
              <CircularProgress
                color="inherit"
                size={16}
                sx={{
                  marginRight: 1,
                }}
              />
              <span>Logging in</span>
            </>
          ) : (
            'Login'
          )}
        </Button>
      </form>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Login;
