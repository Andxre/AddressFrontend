import React, { useState, useEffect } from 'react';
import Select from 'react-select';

function CountrySelector() {

  const [countryISO, setCountryISO] = useState(0)
  const [options, setOptions] = useState([
    {value: 840, label: 'United States of America'}
  ])

  useEffect( () => {
    // GET /Country
    fetch("http://localhost:5001/Country", {
      method: 'GET'
    })
      .then(res => res.json())
      .then( (result) => {
        console.log(result);
      })
  }, [])


  return (
    <div className='country-dropdown'>
      <Select placeholder="Country" options={options} />
    </div>
  )
}

export default CountrySelector