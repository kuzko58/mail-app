import type { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { fetchClient } from '@/api/client';
import { Box, CircularProgress, Typography } from '@mui/material';
import { QueryClientSuccess, QueryClientError } from '@/types/global.types';
import { IMessageStats } from '@/types/messages.types';
import { useEffect } from 'react';
import { setMessageStats } from '@/store/inbox.slice';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const inboxStats = useSelector((state: RootState) => state.inbox.stats);
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery<
    QueryClientSuccess<{
      received: IMessageStats;
    }>,
    QueryClientError
  >({
    queryKey: ['message-stats'],
    queryFn: () => fetchClient('/messages/stats'),
  });

  useEffect(() => {
    if (data?.data.received) {
      dispatch(setMessageStats(data.data.received));
    }
  }, [data, dispatch]);

  if (isLoading && !inboxStats) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        padding: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography fontSize={32}>
        Hello {user?.firstName},{' '}
        {inboxStats ? (
          <>
            you have {inboxStats.total} messages and {inboxStats.unread} unread messages
          </>
        ) : (
          ''
        )}
      </Typography>
    </Box>
  );
};

export default Dashboard;
