import React, {useState, useEffect} from 'react'
import Converter from '../Components/Converter'
import ConvertAmount from '../Components/ConvertAmount'
import ConvertResult from '../Components/ConvertResult'
import { MdCurrencyExchange } from 'react-icons/md'

import ChartLine from '../Components/ChartLine'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

// API LINK
// https://exchangerate.host/#/#docs

const apiurl = 'https://api.exchangerate.host/latest';

const apiurl2 = 'https://api.exchangerate.host/timeseries';
const currency = 'USD';

export default function App() {

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState('');
    const [toCurrency, setToCurrency] = useState('');
    const [amount, setAmount] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    const [convertResult, setConvertResult] = useState('');

    const [chartData, setChartData] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let convertAmount, convertedAmount;

    if(amount) {
        convertAmount = amount;
        convertedAmount = amount * exchangeRate;
    }

    useEffect(() => {
        fetch(`${apiurl2}?base=${currency}&symbols=EUR&start_date=${getDate(30)}&end_date=${getDate(0)}`)
          .then((response) => response.json())
          .then((data) => {
            setIsLoading(false);
    
            const rates = data.rates;
            const chartLabels = [];
            const chartValues = [];
    
            for (let date in rates) {
              chartLabels.push(date);
              chartValues.push(rates[date]['EUR']);
            }
    
            setChartData({
              labels: chartLabels,
              datasets: [
                {
                  label: `USD to EUR exchange rate in the last 30 days`,
                  data: chartValues,
                  fill: false,
                  backgroundColor: 'rgba(75,192,192,1)',
                  borderColor: 'rgba(75,192,192,1)',
                  borderWidth: 2,
                },
              ],
            });
          })
          .catch((error) => {
            setIsLoading(false);
            setError(error);
          });
      }, []);

    function getDate(daysBack) {
        const today = new Date();
        const date = new Date(today);
        date.setDate(today.getDate() - daysBack);
        return date.toISOString().split('T')[0];
    }

    useEffect(() => {
        fetch(apiurl)
            .then(resp => resp.json())
            .then(data => {
                setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
                setToCurrency(data.base);
                setFromCurrency(Object.keys(data.rates)[149]);
                setExchangeRate(data.rates[Object.keys(data.rates)[149]]);
            })
            .catch(error => console.log(error))
    }, []);
    
    useEffect(() => {
        fetch(`${apiurl}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(resp => resp.json())
            .then(data => {
                setExchangeRate(data.rates[toCurrency]);
            })
            .catch(error => console.log(error))
    }, [fromCurrency, toCurrency]);
    


    const handleAmount = (e) => {
        setAmount(e.target.value);
    }

  return (
    <section className="main-section">
        <div className="convert-header">
            <ConvertAmount 
            amount={amount} 
            handleAmount={handleAmount}
            />
        </div>
        <div className="convert-options">
            <Converter 
            selectedCurrency={fromCurrency} 
            currencyOptions={currencyOptions}
            onChangeCurrency={(e) => setFromCurrency(e.target.value)} 
            />
            <span>
                <MdCurrencyExchange className="currency-icon" />
            </span>
            <Converter 
            selectedCurrency={toCurrency} 
            currencyOptions={currencyOptions}
            onChangeCurrency={(e) => setToCurrency(e.target.value)} 
            />
            <button className="btn" onClick={() => setConvertResult(convertedAmount)}>GO</button>
        </div>
        
        <div className="convert-footer">
            <ConvertResult 
            result={convertResult} 
            fromCurrency={fromCurrency} 
            toCurrency={toCurrency} 
            exchangeRate={exchangeRate}
            />
        </div>
        {isLoading && <div>Loading data...</div>}
        {error && <div>Failed to fetch data: {error.message}</div>}
        {!isLoading && chartData.labels && (
            <ChartLine chartData={chartData} options={{ maintainAspectRatio: false }} />
        )}
    </section>
  )
}