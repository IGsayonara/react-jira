import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useContext, useMemo, useState } from 'react';

import type { ICard, IColumn } from '@/packages/Jira/interfaces/jira.interface';

// Define the initial state
const initialColumns: IColumn[] = [
  {
    title: 'Column 1',
    cards: [
      { id: '1', title: 'Card 1', description: 'Jira card text 1', columnId: 'Column 1' },
      { id: '2', title: 'Card 2', description: 'Jira card text 2', columnId: 'Column 2' },
    ],
  },
  { title: 'Column 2', cards: [] },
  { title: 'Column 3', cards: [] },
  // Add more columns as needed
];

// Define the context type
interface JiraContextType {
  columns: IColumn[];
  setColumns: Dispatch<SetStateAction<IColumn[]>>;
  openedCard: ICard | null;
  setOpenedCard: (cardId: string | null) => void;
}

// Create the context
const JiraContext = createContext<JiraContextType | undefined>(undefined);

// Create the provider
function JiraProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<IColumn[]>(initialColumns);
  const [openedCard, setOpenedCard] = useState<ICard | null>(null);

  const contextValue = useMemo(
    () => ({
      columns,
      setColumns,
      openedCard,
      setOpenedCard: (cardId: string | null) => {
        const foundCard = columns.flatMap((col) => col.cards).find((card) => card.id === cardId);
        setOpenedCard(foundCard || null);
      },
    }),
    [columns, openedCard]
  );

  return <JiraContext.Provider value={contextValue}>{children}</JiraContext.Provider>;
}

// Create a custom hook for using the context
const useJiraContext = (): JiraContextType => {
  const context = useContext(JiraContext);

  if (!context) {
    throw new Error('useJiraContext must be used within a JiraProvider');
  }

  return context;
};

export { JiraProvider, useJiraContext };
