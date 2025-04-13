import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Pagination,
  Typography,
  Badge,
} from '@mui/material';
import { fetchClient } from '@/api/client';
import { QueryClientSuccess, QueryClientError } from '@/types/global.types';
import type { IMessage, IMessageStats, IPagination } from '@/types/messages.types';
import { setMessages, setMessageStats } from '@/store/inbox.slice';
import type { RootState } from '@/store';

const Inbox = () => {
  const messages = useSelector((state: RootState) => state.inbox.messages);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [pagination, setPagination] = useState({
    totalPages: 1,
    page: 1,
  });

  const limit = 10;

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
  };

  const handleMessageClick = (id: string) => {
    navigate(`/inbox/${id}`);
  };

  const { isLoading, data } = useQuery<
    QueryClientSuccess<{
      messages: IMessage[];
      stats: IMessageStats;
      pagination: IPagination;
    }>,
    QueryClientError
  >({
    queryKey: ['inbox', pagination.page],
    queryFn: () => fetchClient(`/messages/received?page=${pagination.page}&limit=${limit}`),
  });

  useEffect(() => {
    if (data) {
      dispatch(setMessages({ messages: data.data.messages, page: data.data.pagination.page }));
      dispatch(setMessageStats(data.data.stats));
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data.pagination.totalPages,
      }));
    }
  }, [data, dispatch]);

  useEffect(() => {
    const currentPage = searchParams.get('page');
    if (currentPage) {
      setPagination((prev) => ({
        ...prev,
        page: parseInt(currentPage) || 1,
      }));
    }
  }, [searchParams]);

  const messageList = messages?.[pagination.page];

  if (isLoading && !messageList?.length) {
    return <CircularProgress />;
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
        Inbox
      </Typography>

      <List>
        {messageList?.map((msg) => (
          <ListItem
            key={msg._id}
            divider
            sx={{
              '&:hover': {
                backgroundColor: 'lightgray',
                cursor: 'pointer',
              },
            }}
            onClick={() => handleMessageClick(msg._id)}
          >
            <Badge
              color="success"
              variant="dot"
              invisible={msg.isRead}
              sx={{
                display: 'flex',
                p: 1,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ListItemText
                primary={msg.subject}
                secondary={`${msg.sender.firstName} ${msg.sender.lastName} - ${new Date(
                  msg.createdAt,
                ).toLocaleString()}`}
              />
            </Badge>
          </ListItem>
        ))}
      </List>
      <Box display="flex" justifyContent="center" mt={2}>
        <Pagination
          count={pagination.totalPages}
          page={pagination.page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Inbox;
