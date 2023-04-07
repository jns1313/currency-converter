import React from 'react'

export default function ConvertResult({result, toCurrency, fromCurrency, exchangeRate}) {

  return (
    // Math.round is here just an alternative method for toFixed, because it caused problems
    <div className="result-container">
      <p>{Math.round(result * 100) / 100} {toCurrency}</p>
      <span>1 {fromCurrency} = {Math.round(exchangeRate * 100) / 100} {toCurrency}</span>
    </div>
  )
}

