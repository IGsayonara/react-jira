import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import 'modern-normalize';

import App from './App';

createRoot(document.getElementById('app') as HTMLElement).render(
  <Router basename="">
    <App />
  </Router>
);
