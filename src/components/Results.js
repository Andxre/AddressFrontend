import React, { useState, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import '../App.css'

const ResultPage = () => {
  const location = useLocation();
  const addressData = location.state;
  const [result, setResult] = useState([]) 

  useEffect( () => {
    const queryString = convertToQuery(addressData)
    fetch(`https://localhost:5001/address?${queryString}`)
    .then(res => res.json())
    .then((result) => {
      setResult(result)
    })

  })

  function convertToQuery(addressData) {
    let countryParam;

    if (Array.isArray(addressData.countryISO)) {
      countryParam = new URLSearchParams(addressData.countryISO.map(id => ['country', id]));
    } else {
      countryParam = new URLSearchParams({country: addressData.countryISO});
    }

    const params = new URLSearchParams({
      firstName: addressData.firstName,
      lastName: addressData.lastName,
      address1: addressData.address1,
      address2: addressData.address2,
      zone: addressData.zone,
      city: addressData.city,
      postalCode: addressData.postalCode
    });

    return countryParam.toString() + '&' + params.toString()
  }


  return (
    <div className='results'>
    { result.map((obj, index) => (
      <address className = 'address-result' key={index}> 
        <span>{obj.firstName} {obj.lastName}</span><br />
        <span>{obj.address1}</span><br />
        {obj.address2 !== "" && 
          <><span>{obj.address2}</span><br /></>
        }
        <span>{obj.zone} {obj.city} {obj.postalCode}</span><br />
      </address>
    ))}

    </div>
  )
}

export default ResultPage