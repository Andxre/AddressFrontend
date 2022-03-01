import React from 'react'
import './App.css'
import CountrySpecificForm from './components/CountrySpecific'
import CrossCountryForm from './components/CrossCountry'
import { BrowserRouter, Routes, Route, Link} from "react-router-dom";

const App = () => {
  return (
    <nav
    style={{
      borderBottom: "solid 1px",
      paddingBottom: "1rem",
    }}
    >
    <Link to="/cross">Cross Country</Link> |{" "}
    <Link to="/specific">Country Specific</Link>
    </nav>
  )
}

export default App;

