import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [acumulado, setAcumulado] = useState(0);
    const [uno, setUno] = useState(1);
    const [dos, setDos] = useState(2);
    const [tres, setTres] = useState(3);
    const [cuatro, setCuatro] = useState(4);
    const [cinco, setCinco] = useState(5);
    const [seis, setSeis] = useState(6);
    const [mas, setMas] = useState(7);
    const [superMas, setSuperMas] = useState(8);
    const [advert1, setAdvert1] = useState();
    const [advert1Name, setAdvert1Name] = useState();
    const [advert1Content, setAdvert1Content] = useState();
    const [advert2, setAdvert2] = useState();
    const [advert2Name, setAdvert2Name] = useState();
    const [advert2Content, setAdvert2Content] = useState();
    const [advert3, setAdvert3] = useState();
    const [advert3Name, setAdvert3Name] = useState();
    const [advert3Content, setAdvert3Content] = useState();

    useEffect(() => {
        FetchingNumeros();
      }, [])
  
      const FetchingNumeros = async () => {      
          const url = `https://sheetdb.io/api/v1/boby9tv7bf1xs`;
      
          try {
              const response = await axios.get(url);
              if (response.data) {
                  const data = response.data;
                  const acc = response.data[0].acumulado;
                  setUno(response.data[0].Uno);
                  setDos(response.data[0].Dos);
                  setTres(response.data[0].Tres);
                  setCuatro(response.data[0].Cuatro);
                  setCinco(response.data[0].Cinco);
                  setSeis(response.data[0].Seis);
                  setMas(response.data[0].mas);
                  setSuperMas(response.data[0].super);
                  setAcumulado(acc);
                  setAdvert1Name(data[0].advert1);
                  setAdvert1(data[1].advert1);
                  setAdvert1Content(data[2].advert1);
                  setAdvert2Name(data[0].advert1);
                  setAdvert2(data[1].advert1);
                  setAdvert2Content(data[2].advert1);
                  setAdvert3Name(data[0].advert1);
                  setAdvert3(data[1].advert1);
                  setAdvert3Content(data[2].advert1);
                  console.log(data);
              } else {
                  console.log('Response data is empty or not as expected.');
              }
          } catch (err) {
              console.log('Error:', err.message);
              console.log('Error response data:', err.response && err.response.data);
          }
      };


    return (
        <AuthContext.Provider value={{acumulado, uno, dos, tres, cuatro, cinco, seis, mas, superMas,
            advert1, advert1Name, advert1Content, advert2, advert2Name, advert2Content, advert3, advert3Name, advert3Content
        }}>
            {children}
        </AuthContext.Provider>
    )
}