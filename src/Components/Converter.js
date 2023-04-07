import React from 'react'

export default function Converter({currencyOptions, selectedCurrency, onChangeCurrency}) {
  return (
    <article className="converter">
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map((currency, index) => {
              return <option key={index}>{currency}</option>
            })}
        </select>
    </article>        
  )
}
