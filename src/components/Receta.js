import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';

import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 450,
    overflowX: 'auto',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Receta({receta}) {
  const {setidreceta, info, setreceta} = useContext(ModalContext);

  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //muestra y formatea todos los ingredientes disponibles
  const mostrarIngredientes = (info)=>{
    let ingredientes = [];
    for(let i = 1; i <= 15; i++){
      if(info[`strIngredient${i}`]){
        ingredientes.push(
          <li>{ info[`strIngredient${i}`] } { info[`strMeasure${i}`] } </li>
        );
      }
    }
    return ingredientes;
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-header">{receta.strDrink}</div>

        <img
          src={receta.strDrinkThumb}
          alt={`imagen de ${receta.strDrink}`}
          className="card-img-top"
        />

        <div className="card-body">
          <button
            className="btn btn-block btn-primary"
            type="button"
            onClick={() => {
              setidreceta(receta.idDrink);
              handleOpen();
            }}
          >
            View recipe
          </button>
          <Modal
            open={open}
            onClose={() => {
              setidreceta(null);
              setreceta({});
              handleClose();
            }}
          >
            <div style={modalStyle} className={classes.paper}>
              <h2>{info.strDrink}</h2>
              <h3 className="mt-4">Instructions for preparation:</h3>
              <p>{info.strInstructions}</p>

              <img
                src={info.strDrinkThumb}
                alt={info.strDrink}
                className="img-fluid my-4"
              />

              <h3>ingredients and quantities</h3>
              <ul>
                { mostrarIngredientes(info) }
              </ul>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Receta;
