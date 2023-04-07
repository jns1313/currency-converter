import React from 'react'
import { Line } from 'react-chartjs-2'

export default function ChartLine({chartData}) {
  return (
    <div className="chart-container">
        <Line 
            data={chartData}
            options={{
                plugins: {
                  title: {
                    display: true,
                    text: "USD to EUR currency history in the last 30 days"
                  },
                  legend: {
                    display: false
                  }
                }
              }}
        />
    </div>
  )
}
