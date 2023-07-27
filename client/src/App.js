import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [symbol, setSymbol] = useState('AAPL');
  const [date, setDate] = useState('2023-07-24');
  const [stockData, setStockData] = useState({});

  useEffect(()=>{
	handleSubmit();
  }, [])

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    // Prepare the request body
    const requestBody = {
      symbol: symbol?.toUpperCase(),
      date: date,
    };

    try {
      // Make the POST request to the server
      const response = await fetch('http://localhost:5000/api/fetchStockData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
		setStockData({});
        throw new Error('Network response was not ok');
      }

      // server response
      const stockData = await response.json();
	  setStockData(stockData.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <h1>Stock Data Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="symbol">Symbol:</label>
        <input
          type="text"
          id="symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          required
        />

        <label htmlFor="date">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Get Stock Data</button>
      </form>

	  {Object.keys(stockData).length ? (
        <table>
          <tbody>
            {Object.entries(stockData).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>{key==="Volume" ? value : value.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
	:
	<div className="not-found">
		Data not found
	</div>
	}
    </div>
  );
}

export default App;
