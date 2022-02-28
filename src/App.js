import React, { useState } from 'react'
import Select from 'react-select'
import './App.css'

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

  const [formValues, setFormValues] = useState([["firstName", "lastName"], ["address1"], ["address2"], ["city", "zone", "postalCode" ]])

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
    { value: 'washington', label: 'Washington'} 
  ]

  let handleChangeNew = (label, e) => {
    let updatedState = {}
    updatedState[label] = e.target.value;
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
  <div className="addressForm">
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
          {element.map((label, ind) => (
            <>
              <input type="text" name="name" placeholder={labels[label]} value={ addressData[label] || ""} onChange={e => handleChangeNew(label, e)} key={ind} />
            </>
          ))}
          </div>
        ))}
        <div className="button-section">
            <button className="button submit" type="submit">Submit</button>
        </div>
    </form>
  </div>
  )
}

export default App;
