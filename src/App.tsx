import { Route, Routes } from 'react-router-dom';

import ThemeProvider from './store/ThemeProvider';

import Jira from './views/JiraView/Jira';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route index element={<Jira />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
