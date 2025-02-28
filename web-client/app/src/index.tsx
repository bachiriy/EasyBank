import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Clients from "./pages/clients/Clients";
import Layout from './pages/Layout';
import Accounts from './pages/accounts/Accounts';
import NewClient from './pages/clients/NewClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='*' element={<Clients />} /> 
        <Route index element={<Clients />} /> 
        <Route path="customers/new" element={<NewClient />} />
        <Route path="accounts" element={<Accounts />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
