import { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

const useFetch = (url, cssClass, dataName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);

        const html = response.data;

        const $ = cheerio.load(html);
        // Use the class selector to target elements with the specified class
        const elementsWithClass = $(`.${cssClass}`);

        // Extract text content from each matched element
        const extractedData = elementsWithClass.map((index, element) => $(element).text()).get();

        setData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    getData();

    // Cleanup function to reset data when URL changes
    return () => {
      setData([]);
    };
  }, [url, cssClass]); // Include cssClass as a dependency if it can change

  return { [dataName]: data, loading };
};

export default useFetch;
