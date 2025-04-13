import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, IMessageStats } from '@/types/messages.types';

interface MessageState {
  messages: {
    [page: string]: IMessage[];
  };
  stats: IMessageStats | null;
}

const initialState: MessageState = {
  messages: {},
  stats: null,
};

const inboxSlice = createSlice({
  name: 'inbox',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<{ messages: IMessage[]; page: number }>) => {
      state.messages[action.payload.page] = action.payload.messages;
    },

    setMessageStats: (state, action: PayloadAction<IMessageStats | null>) => {
      state.stats = action.payload;
    },
  },
});

export const { setMessages, setMessageStats } = inboxSlice.actions;
export default inboxSlice.reducer;
