import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ICharacter } from '../models/people';

export interface CheckedCardState {
  checkedCards: ICharacter[];
}

const initialCardState: CheckedCardState = {
  checkedCards: [],
};

export const checkedCardSlice = createSlice({
  name: 'checkedCards',
  initialState: initialCardState,
  reducers: {
    addCheckedCard: (state, action: PayloadAction<ICharacter>) => {
      const nextState = state;
      if (!nextState.checkedCards.find((item) => item.url === action.payload.url)) {
        nextState.checkedCards = [...nextState.checkedCards, action.payload];
      }
    },
    deleteCheckedCard: (state, action: PayloadAction<ICharacter>) => {
      const nextState = state;
      nextState.checkedCards = nextState.checkedCards.filter((item) => item.url !== action.payload.url);
    },
    clearAllCheckedCards: (state) => {
      const nextState = state;
      nextState.checkedCards = [];
    },
  },
});

export const { addCheckedCard, deleteCheckedCard, clearAllCheckedCards } = checkedCardSlice.actions;
export default checkedCardSlice.reducer;
