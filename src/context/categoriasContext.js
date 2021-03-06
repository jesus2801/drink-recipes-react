import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

// crear el context
export const CategoriasContext = createContext();

// provider: Donde se encuentran las funciones y el state

const CategoriasProvider = props => {
  // state del context
  const [categorys, saveCategorys] = useState([]);

  //ejecutar el llamado a la API
  useEffect(() => {
    const obtenerCategorias = async () => {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

      const categorias = await axios.get(url);

      saveCategorys(categorias.data.drinks);
    };
    obtenerCategorias();
  }, []);

  return (
    <CategoriasContext.Provider
      value={{
        categorys,
      }}
    >
      {props.children}
    </CategoriasContext.Provider>
  );
};

export default CategoriasProvider;
