import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountrySpecificForm from './components/CountrySpecific'
import CrossCountryForm from './components/CrossCountry'
import ResultPage from './components/Results';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/cross" element={<CrossCountryForm />} />
        <Route path="/specific" element={<CountrySpecificForm />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
