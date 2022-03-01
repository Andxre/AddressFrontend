import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import Select from 'react-select'
import convert from '../util'
import '../App.css'

const CountrySpecificForm = () => {
  const styles = {
    container: css => ({ ...css, width: '100%', padding: '5px' }),
    control: css => ({...css, width: '100%'}),
    input: css => ({...css}),
    option: css => ({...css})
  };

  const navigate = useNavigate();
  const [currentCountry, setCurrentCountry] = useState(0)
  const [formValues, setFormValues] = useState([])
  const [countries, setCountries] = useState([])
  const [labels, setLabels] = useState({})
  const [zones, setZones] = useState([])


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

  // Layout and Zones
  useEffect(() => {
    fetch(`https://localhost:5001/Country/layout/${currentCountry}`)
    .then(res => res.json())
    .then( (result) => {
      setLabels({
        firstName: result["firstName"],
        lastName: result["lastName"],
        address1: result["address1"],
        address2: result["address2"],
        zone: result["zone"],
        city: result["city"],
        postalCode: result["postalCode"]
      })
      setFormValues(convert(result["layoutString"]));
    })

    fetch(`https://localhost:5001/Country/${currentCountry}`)
    .then(res => res.json())
    .then((result) => {
      let zoneDivisionString = result["zoneDivision"]
      if (zoneDivisionString === null) {
        setZones([])
        return
      }
      const zones = JSON.parse(zoneDivisionString)
      const zoneOptions = zones.map((obj) => {
        return {
          value: obj.name,
          label: obj.name
        }
      })
      setZones(zoneOptions)
    })

  }, [currentCountry])

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
      setCurrentCountry(e.value);
    }
    let updatedState = {}
    updatedState[label] = e.value;
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
              {label === "zone" && zones.length > 0 ? (
                <Select
                  styles={styles}
                  options={zones}
                  placeholder={labels[label]}
                  onChange={(e) => handleChangeDrop(label, e)}
                  key={ind}
                />
              ) : (
                <input
                  type="text"
                  name="name"
                  placeholder={labels[label]}
                  value={addressData[label] || ""}
                  onChange={(e) => handleChangeInput(label, e)}
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