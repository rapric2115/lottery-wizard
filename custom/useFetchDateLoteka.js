import { useState, useEffect } from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';

const useFetchDateLoteka = (cssClass, dataName) => {
  const [data, setData] = useState([]);
  const source = axios.CancelToken.source();

  const formatDate = (inputDate) => {
    try {
      if (inputDate) {
        const dateObject = new Date(inputDate);
        const day = dateObject.getDate().toString().padStart(2, '0');
        const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
        const year = dateObject.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return formattedDate;
      } else {
        console.error('Input date is undefined');
        return null;
      }
    } catch (error) {
      console.error('Error formatting date:', error);
      return null;
    }
  };

  const getPreviousWednesday = (today) => {
    const daysUntilWednesday = (today.getDay() - 3 + 7) % 7;
    const previousWednesday = new Date(today);
    previousWednesday.setDate(today.getDate() - daysUntilWednesday);
    return previousWednesday;
  };

  const getPreviousSaturday = (today) => {
    const daysUntilSaturday = (today.getDay() - 6 + 7) % 7;
    const previousSaturday = new Date(today);
    previousSaturday.setDate(today.getDate() - daysUntilSaturday);
    return previousSaturday;
  };

  const fetchData = async () => {
    try {
      const today = new Date();
      let previousDay;

      if (today.getDay() === 0 || today.getDay() === 1 || today.getDay() === 2) {
        previousDay = getPreviousWednesday(today);
      } else {
        previousDay = getPreviousSaturday(today);
      }

      if (!previousDay) {
        return;
      }

      const response = await axios.get(
        `https://www.conectate.com.do/loterias/loteka?date=${formatDate(previousDay)}`,
        {
          cancelToken: source.token,
        }
      );

      const html = response.data;
      const $ = cheerio.load(html);
      const elementsWithClass = $(`.${cssClass}`);
      const extractedData = elementsWithClass.map((index, element) => $(element).text()).get();

      setData(extractedData);
    } catch (error) {
      if (axios.isCancel(error)) {
        // Request was canceled, no need to handle
      } else {
        console.error('Error fetching data:', error);
      }
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      source.cancel('Request canceled due to component unmount');
    };
  }, [cssClass]); // Include cssClass as a dependency if it can change

  return { [dataName]: data };
};

export default useFetchDateLoteka;