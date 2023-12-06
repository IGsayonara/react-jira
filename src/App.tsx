import { ChakraProvider } from '@chakra-ui/react';

import { Provider as ReduxProvider } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';

import store from '@/store/store';

import Jira from '@/views/JiraView/Jira';
import Nested from '@/views/NestedRoutes/Nested';

function App() {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <div>
          <div>
            Layout: <NavLink to="/">Index</NavLink> <NavLink to="/about">About</NavLink>
          </div>
        </div>
        <Routes>
          <Route index element={<Jira />} />
          <Route path="/about" element={<Nested />} />
        </Routes>
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;
