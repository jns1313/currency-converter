import React, {useState, useEffect } from 'react'

const apiUrl = 'https://api.exchangerate.host/latest?base=USD&symbols=EUR,AUD,GBP,JPY,CAD,CNH,THB'

export default function Rates() {

    const [currencyData, setCurrencyData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          setCurrencyData(data);
          console.log(data);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    }, [])
    

  return (
    <section className="rates-section">
    {loading ? <p>loading...</p> : (
      <div className="rates-container">
        <h2 className="section-title">Currency Rates</h2>
        {Object.keys(currencyData.rates).map((key) => {
          return <p key={key}><span>{key}</span>: {currencyData.rates[key]}</p>
        })}
      </div>
        )}
      <small>Currency rates are based on USD</small>
    </section>
  )
}
