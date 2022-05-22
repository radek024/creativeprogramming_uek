import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import  AddBill from './routes/addBill';
import BillList from './routes/billList';
import EditBill from './routes/editBill';
import Stats from './routes/stats';
import LandingPage from './routes/landingPage';
import ErrorPage from './routes/errorPage';
import Settings from './routes/settings';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  /*<React.StrictMode>*/
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<LandingPage />}/>
        <Route path="list" element={<BillList />}/>
        <Route path="add-bill" element={<AddBill />}/>
        <Route path="edit-bill/:billId" element={<EditBill />}/>
        <Route path="stats" element={<Stats />}/>
        <Route path="settings" element={<Settings />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Route>
    </Routes>
    </BrowserRouter>
  /*</React.StrictMode>*/
)