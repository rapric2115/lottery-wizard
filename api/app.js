const express = require('express');
const app = express();
const port = 8000;
// Assuming you have a valid model instance here
const { RandomForestClassifier, RandomForestRegressor } = require('random-forest')
// const model = new RandomForest(); // Initialize your model here

const axios = require('axios');
const cheerio = require('cheerio');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, this is my API server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

const numbers = [];

app.get('/scrape', async (req, res) => {
    const url = 'https://www.leidsa.com/'; // Replace with the URL you want to scrape
    axios.get(url)
        .then((response) => {
            const html = response.data;
            const $ = cheerio.load(html);

            // Use Cheerio to extract data from the HTML
            const numbers = [];

            $('span.css-13o2snc').each((index, element) => {
                // Extract the text from each element and push it to the 'numbers' array
                numbers.push($(element).text().trim());
            });

            // Send the extracted data as a response
            res.json({ numbers });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while scraping.' });
        });
});

// Example input data for prediction
const inputData = {
    "features": {
        "array1": [1, 2, 3, 4, 5, 6, 7, 8],
        "array2": [9, 10, 11, 12, 13, 14, 15, 16]
    }
};

app.post('/predict', (req, res) => {
    try {
        const inputData = req.body.features; // Replace 'features' with your input field name
        const prediction = model.predict([inputData]);

        res.json({ prediction });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while making predictions.' });
    }
});





