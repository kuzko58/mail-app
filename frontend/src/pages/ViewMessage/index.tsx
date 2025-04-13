import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Typography, CircularProgress, Avatar } from '@mui/material';
import { fetchClient } from '@/api/client';
import { QueryClientSuccess, QueryClientError } from '@/types/global.types';
import type { IMessage } from '@/types/messages.types';

const ViewMessage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [message, setMessage] = useState<IMessage | null>(null);

  const { isLoading, isError, data } = useQuery<
    QueryClientSuccess<{
      message: IMessage;
    }>,
    QueryClientError
  >({
    enabled: !!id,
    queryKey: ['view-message'],
    queryFn: () => fetchClient(`/messages/received-message/${id}/view`),
  });

  useEffect(() => {
    if (data) {
      setMessage(data.data.message);
    }
  }, [data]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !message) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <Typography color="error">Failed to load the message.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        {message.subject}
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ mr: 2 }}>{message.sender.firstName.charAt(0)}</Avatar>
        <Box>
          <Typography variant="subtitle1">
            {message.sender.firstName} {message.sender.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {new Date(message.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>
      <Typography variant="body1">{message.content}</Typography>
    </Box>
  );
};

export default ViewMessage;
