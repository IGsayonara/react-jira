import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

import type { ICard, IColumn } from '@/packages/Jira/interfaces/jira.interface';

interface JiraContextType {
  columns: IColumn[];
}

// Create the context
const JiraContext = createContext<JiraContextType | undefined>(undefined);

// Create the provider
function JiraProvider({ children }: { children: ReactNode }) {
  const columns = useSelector((state: RootState) => state.jira.columns);

  const contextValue = useMemo(
    () => ({
      columns,
    }),
    [columns]
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
