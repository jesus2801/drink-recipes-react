import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = props => {
  const [recetas, setRecetas] = useState([]);
  const [busqueda, buscarRecetas] = useState({
    nombre: '',
    categoria: '',
  });
  const [consultar, guardarConsulta] = useState(false);

  const {nombre, categoria} = busqueda;

  useEffect(() => {
    if (consultar) {
      const obtenerRecetas = async () => {
        const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
        const response = await axios.get(url);
        setRecetas(response.data.drinks);
      };
      obtenerRecetas();
    }
    // eslint-disable-next-line
  }, [busqueda]);

  return (
    <RecetasContext.Provider
      value={{
        recetas,
        buscarRecetas,
        guardarConsulta,
      }}
    >
      {props.children}
    </RecetasContext.Provider>
  );
};

export default RecetasProvider;
