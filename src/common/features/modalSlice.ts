/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { CreateCardProps } from '@/packages/Jira/components/CardCreation/CreateCard';

export interface IModalProps {
  'jira/createCard': { props: CreateCardProps };
}

type PropsForComponent<T extends keyof IModalProps> = IModalProps[T]['props'];
export interface IModalState {
  modalContent: { component: keyof IModalProps; props: PropsForComponent<keyof IModalProps> } | null;
}

// Define a union type of all possible modal components
type ModalComponent = keyof IModalProps;

// Define a generic action payload for openModal
type OpenModalPayload<T extends ModalComponent> = {
  component: T;
  props: PropsForComponent<T>;
};

const initialState: IModalState = {
  modalContent: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: <T extends ModalComponent>(state: IModalState, action: PayloadAction<OpenModalPayload<T>>) => {
      state.modalContent = {
        component: action.payload.component,
        props: action.payload.props,
      };
    },
    closeModal: (state) => {
      state.modalContent = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
