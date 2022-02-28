import React, { useState } from 'react'
import Select from 'react-select'
import './App.css'
import CountrySelector from './components/CountrySelector'
import CountrySpecificForm from './components/CountrySpecific'
import CrossCountryForm from './components/CrossCountry'

const App = () => {
  // Layout String parsed into a 2D Array 
  // Each index represents a line (Div)
  // Render each Input or Select based on the value and map it's placeholder to it's label
  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    address1: "Street Address",
    address2: "Apt./Suite/etc. No.",
    zone: "State",
    city: "City",
    postalCode: "Zip Code"
  }

  const styles = {
    container: css => ({ ...css, width: '100%', padding: '5px' }),
    control: css => ({...css, width: '100%'}),
    input: css => ({...css}),
    option: css => ({...css})
};

  const [formValues, setFormValues] = useState([["firstName", "lastName"], ["address1"], ["address2"], ["zone", "city", "postalCode"]])

  const [addressData, setAddressData] = useState({
    coutryISO: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zone: "",
    city: "",
    postalCode: ""
  })

  const options = [
    { value: 'arkansas', label: 'Arkansas' },
    { value: 'washington', label: 'Dominican Republic'} 
  ]

  let handleChangeInput = (label, e) => {
    let updatedState = {}
    updatedState[label] = e.target.value;
    setAddressData({
      ...addressData,
      ...updatedState
    })
  }

  let handleChangeDrop = (label, e) => {
    let updatedState = {}
    updatedState[label] = e.value;
    setAddressData({
      ...addressData,
      ...updatedState
    })
  }

  let handleSubmit = (event) => {
      event.preventDefault();
      alert(JSON.stringify(addressData));
  }

  return (
  <div className="App">
    <CountrySpecificForm />

  </div>
  )
}

export default App;
