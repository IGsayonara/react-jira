/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

import cloneDeep from 'lodash/cloneDeep';

import type { CreateCardPayload, ICard, IColumn } from '@/packages/Jira/interfaces/jira.interface';

export interface IJiraState {
  columns: IColumn[];
}

const initialState: IJiraState = {
  columns: [
    {
      title: 'Column 1',
      cards: [
        { id: '1', title: 'Card 1', description: 'Jira card text 1', columnId: 'Column 1' },
        { id: '2', title: 'Card 2', description: 'Jira card text 2', columnId: 'Column 2' },
      ],
    },
    { title: 'Column 2', cards: [] },
    { title: 'Column 3', cards: [] },
    { title: 'Column 4', cards: [] },
  ],
};

const jiraSlice = createSlice({
  name: 'jira',
  initialState,
  reducers: {
    setColumns: (state: IJiraState, { payload }: { payload: IColumn[] }) => {
      state.columns = cloneDeep(payload);
    },
    addColumn: (state: IJiraState, { payload }: { payload: IColumn }) => {
      const { title } = payload;
      const existingColumnTitles = state.columns.map((col) => col.title);
      if (existingColumnTitles.includes(title)) {
        throw new Error('Column with such title exists');
      }
      state.columns.push(payload);
    },
    addCard: (state: IJiraState, { payload }: { payload: CreateCardPayload }) => {
      const card: ICard = { id: Date.now().toString(), ...payload };
      const columnToInsert = state.columns.find((col) => col.title === card.columnId);

      columnToInsert?.cards.push(card);
    },
    editCard: (state: IJiraState, { payload }: { payload: ICard }) => {
      const cards = state.columns.map((col) => col.cards).flat(Infinity) as ICard[];
      const cardToEdit = cards.find((card) => card.id === payload.id);
      if (!cardToEdit) {
        throw new Error('Card not found');
      }

      Object.assign(cardToEdit, payload);
    },
  },
});

export const { setColumns, addColumn, addCard, editCard } = jiraSlice.actions;
export default jiraSlice.reducer;
