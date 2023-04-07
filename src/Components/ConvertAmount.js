import React from 'react'

export default function ConvertAmount({amount, handleAmount}) {
  return (
    <form>
        <input type="number" value={amount} onChange={handleAmount} className="amount-input" placeholder="enter amount.." />
    </form>
  )
}
