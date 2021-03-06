import React, {useContext, useState} from 'react';
import {CategoriasContext} from '../context/categoriasContext';
import {RecetasContext} from '../context/RecetasContext';

function Formulario() {
  const {categorys} = useContext(CategoriasContext);
  const {buscarRecetas, guardarConsulta} = useContext(RecetasContext);

  const [busqueda, setBusqueda] = useState({
    nombre: '',
    categoria: '',
  });

  //funcion para leer los contenidos
  const obtenerDatoRespuesta = e => {
    setBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      className="col-12"
      onSubmit={e => {
        e.preventDefault();
        guardarConsulta(true);
        buscarRecetas(busqueda);
      }}
    >
      <fieldset>
        <legend className="text-center">Search drinks for topic or ingredient</legend>
      </fieldset>

      <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            name="nombre"
            placeholder="Search for ingredient"
            className="form-control"
            onChange={obtenerDatoRespuesta}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-control"
            name="categoria"
            onChange={obtenerDatoRespuesta}
          >
            <option value="">-- Select category --</option>
            {categorys.map((categoria, index) => (
              <option key={index} value={categoria.strCategory}>
                {categoria.strCategory}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <input
            type="submit"
            value="Search drinks"
            className="btn btn-block btn-primary"
          />
        </div>
      </div>
    </form>
  );
}

export default Formulario;
