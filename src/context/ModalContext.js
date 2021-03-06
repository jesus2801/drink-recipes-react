import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = props => {
  //state del provider
  const [idreceta, setidreceta] = useState(null);
  const [info, setreceta] = useState({});

  useEffect(() => {
    if (!idreceta) return;
    const consultAPI = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;

      const response = await axios.get(url);

      setreceta(response.data.drinks[0]);
    };
    consultAPI();
  }, [idreceta]);

  return (
    <ModalContext.Provider
      value={{
        info,
        setidreceta,
        setreceta,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
