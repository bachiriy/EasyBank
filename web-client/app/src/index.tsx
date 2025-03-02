import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Clients from "./pages/clients/Clients";
import Layout from './pages/Layout';
import Accounts from './pages/accounts/Accounts';
import NewClient from './pages/clients/NewClient';
import EditClient from './pages/clients/EditClient';
import NewAccount from './pages/accounts/NewAccount';

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
        <Route path="customers/:id/edit" element={<EditClient />} />

        <Route path="accounts" element={<Accounts />} />
        <Route path="accounts/new" element={<NewAccount />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
