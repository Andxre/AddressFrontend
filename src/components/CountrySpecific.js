import { findByLabelText } from '@testing-library/react'
import React, { useState } from 'react'
import Select from 'react-select'
import convert from '../util'
import '../App.css'

const CountrySpecificForm = () => {
  // Layout String parsed into a 2D Array 
  // Each index represents a line (Div)
  // Render each Input or Select based on the value and map it's placeholder to it's label
  const labels = { // This will be a useState()
    firstName: "First Name",
    lastName: "Last Name",
    address1: "Street Address",
    address2: "Apt./Suite/etc. No.",
    zone: "State",
    city: "City",
    postalCode: "Zip Code"
  }

  const layout1 = "{firstName}{lastName}_{address1}_{address2}_{city}_{zone}_{postalCode}"
  const layout2 = "{firstName}{lastName}_{address1}_{address2}_{postalCode}{city}{zone}"

  const styles = {
    container: css => ({ ...css, width: '100%', padding: '5px' }),
    control: css => ({...css, width: '100%'}),
    input: css => ({...css}),
    option: css => ({...css})
};

  // FormValues is affected by CountryISO
  const [formValues, setFormValues] = useState([])
  const [countries, setCountries] = useState([
    {value: 840, label: 'United States of America'},
    {value: 827, label: 'United Kingdom' }
  ])

  const [addressData, setAddressData] = useState({
    countryISO: 0,
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zone: "",
    city: "",
    postalCode: ""
  })

  const options = [ // This will be a UseState
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
    if (label === "countryISO") {
      changeLayout(e.value)
    }
    let updatedState = {}
    updatedState[label] = e.value;
    setAddressData({
      ...addressData,
      ...updatedState
    })
  }

  let changeLayout = (ISO) => {
    console.log(ISO)
    if (ISO === 840)
      setFormValues(convert(layout1))
    else 
      setFormValues(convert(layout2))
  }

  let handleSubmit = (event) => {
      event.preventDefault();

      // Pass addressData to resultForm then redirect and make a GET request in ResultForm

      alert(JSON.stringify(addressData));
  }

  return (
<div className="country-specific">
  <div className="country-select">
    <Select
      styles={styles}
      placeholder="Country"
      options={countries}
      onChange={(e) => handleChangeDrop("countryISO", e)}
    />
  </div>
  <div className="addressForm">
    <form onSubmit={handleSubmit}>
      {formValues.map((element, index) => (
        <div className="form-inline" key={index}>
          {element.map((label, ind) => (
            <>
              {label !== "zone" ? (
                <input
                  type="text"
                  name="name"
                  placeholder={labels[label]}
                  value={addressData[label] || ""}
                  onChange={(e) => handleChangeInput(label, e)}
                  key={ind}
                />
              ) : (
                <Select
                  styles={styles}
                  options={options}
                  placeholder={labels[label]}
                  onChange={(e) => handleChangeDrop(label, e)}
                  key={ind}
                />
              )}
            </>
          ))}
        </div>
      ))}
      {formValues.length > 0 ? (
        <div className="button-section">
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </form>
  </div>
</div>
  )
}

export default CountrySpecificForm;