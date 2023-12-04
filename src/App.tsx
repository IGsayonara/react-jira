import { Provider as ReduxProvider } from 'react-redux';
import { NavLink, Route, Routes } from 'react-router-dom';

import ThemeProvider from './store/ThemeProvider';
import store from '@/store/store';

import Jira from '@/views/JiraView/Jira';
import Nested from '@/views/NestedRoutes/Nested';

import ModalWrapper from '@/common/components/ModalWindow/ModalWrapper';

function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider>
        <div>
          <div>
            Layout: <NavLink to="/">Index</NavLink> <NavLink to="/about">About</NavLink>
          </div>
        </div>
        <Routes>
          <Route index element={<Jira />} />
          <Route path="/about" element={<Nested />} />
        </Routes>
        <ModalWrapper />
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
