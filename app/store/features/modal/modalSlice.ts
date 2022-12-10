import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export interface ModalState {
  wordGridModalVisible: boolean;
  wordGridModalValue: string;
}

const initialState: ModalState = {
  wordGridModalVisible: false,
  wordGridModalValue: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    wordGridModalToggle: (state, action: PayloadAction<boolean>) => {
      state.wordGridModalVisible = action.payload;
    },
    setWordGridModaValue: (state, action: PayloadAction<string>) => {
      state.wordGridModalValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {wordGridModalToggle, setWordGridModaValue} = modalSlice.actions;

export const selectWordGridModalVisibilty = (s: {modal: ModalState}) =>
  s.modal.wordGridModalVisible;
export const selectWordGridValue = (s: {modal: ModalState}) =>
  s.modal.wordGridModalValue;

export default modalSlice.reducer;
