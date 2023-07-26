// DO NOT MODIFY ANYTHING HERE, THE PLACE WHERE YOU NEED TO WRITE CODE IS MARKED CLEARLY BELOW

require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(function (req, res, next) {
    const allowedOrigins = ['http://localhost:3000'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-credentials", true);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.enable('trust proxy');

app.post('/api/fetchStockData', async (req, res) => {
    // YOUR CODE GOES HERE, PLEASE DO NOT EDIT ANYTHING OUTSIDE THIS FUNCTION

    const symbol = req.body.symbol;
    const date = req.body.date;
    const apiUrl = `https://api.polygon.io/v1/open-close/${symbol}/${date}?adjusted=true&apiKey=7GXhBRsptq9gxVoY3rzRTITOUeX86ycc`;
    try{
        // Fetch data from the API
        const data = await fetch(apiUrl);
        const stockData = await data.json();
        console.log(stockData)
        let obj = {
            Open: stockData.open,
            High: stockData.high, 
            Low: stockData.low, 
            Close: stockData.close, 
            Volume: stockData.volume
        }
        res.status(200).json({status: "success", data: obj});
    } catch(err){
        console.log(err)
        res.status(500).json({status: "error", error: err});
    }

});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));