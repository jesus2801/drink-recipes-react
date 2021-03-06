import React from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import ListaRecetas from './components/ListaRecetas';

import CategoriasProvider from './context/categoriasContext';
import RecetasContext from './context/RecetasContext';
import ModalContext from './context/ModalContext';

function App() {
  return (
    <CategoriasProvider>
      <RecetasContext>
        <ModalContext>
          <Header />
          <div className="container mt-5">
            <div className="row">
              <Formulario />
            </div>

            <ListaRecetas />
          </div>
        </ModalContext>
      </RecetasContext>
    </CategoriasProvider>
  );
}

export default App;
