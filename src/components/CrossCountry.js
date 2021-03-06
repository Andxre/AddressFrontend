import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import '../App.css'
import { useNavigate } from 'react-router-dom'

const CrossCountryForm = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([])

    // Country
    useEffect(() => {
      fetch("https://localhost:5001/Country", {
        method: 'GET',
      })
      .then(res => res.json())
      .then( (result) => {
        const countries =result.map((obj) => {
          return {
            value: obj.countryIso,
            label: obj.countryName
          }
        })
        setCountries(countries);
      })
    }, []);

  const labels = {
    firstName: "First Name",
    lastName: "Last Name",
    address1: "Street/Building/Address Line 1",
    address2: "Apt/Suite/Address Line 2",
    zone: "Zone/Province/State",
    city: "City/Town/Locality",
    postalCode: "Zip/Postal Code",
    country: "Country"
  }

  const styles = {
    container: css => ({ ...css, width: '100%', padding: '5px' }),
    control: css => ({...css, width: '100%'}),
    input: css => ({...css }),
    option: css => ({...css})
};

  const [formValues, setFormValues] = useState([["firstName", "lastName"], ["address1"], ["address2"], ["zone", "city"], ["postalCode"], ["country"]])

  const [addressData, setAddressData] = useState({
    countryISO: [],
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    zone: "",
    city: "",
    postalCode: ""
  })


  let handleChangeInput = (label, e) => {
    let updatedState = {}
    updatedState[label] = e.target.value;
    setAddressData({
      ...addressData,
      ...updatedState
    })
  }

  let handleChangeDrop = (options) => {
    let updatedState = {}
    const mapped = options.map((obj) => {
        return obj["value"]
    })
    updatedState["countryISO"] = mapped
    setAddressData({
      ...addressData,
      ...updatedState
    })
  }

  let handleSubmit = (event) => {
      event.preventDefault();
      navigate("/results", {state: addressData})
  }

  return (
  <div className="addressForm">
      <form onSubmit={handleSubmit}>
        {formValues.map((element, index) => (
          <div className="form-inline" key={index}>
          {element.map((label, ind) => (
            <>
              {label !== "country"
              ? <input type="text" name="name" placeholder={labels[label]} value={ addressData[label] || ""} onChange={e => handleChangeInput(label, e)} key={ind} />
              : <Select styles={styles} isMulti={true} options={countries} placeholder={labels[label]} onChange={e => handleChangeDrop(e)} key={ind} />
              }
            </>
          ))}
          </div>
        ))}
        <div className="button-section">
            <button className="button submit" type="submit">Search</button>
        </div>
    </form>
  </div>
  )
}

export default CrossCountryForm;