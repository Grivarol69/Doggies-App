import React from "react";
import styles from './Card.module.css';

const Card = (props) => {
  const {
    id,
    image,
    name,
    weightMin,
    weightMax,
    heightMin,
    heightMax,
    life_span,
    temperament,
  } = props;
  return (
    <div className={styles.card}>
      <h3>Id: {id}</h3>
      <h3>Name: {name}</h3>
      <img src={image} alt="loading..."/>
      <h4>Peso Min: {weightMin}</h4>
      <h4>Peso Max: {weightMax}</h4>
      <h4>Altura Min: {heightMin}</h4>
      <h4>Altura Max: {heightMax}</h4>
      <h3>Vida Media: {life_span}</h3>
      <h3>Temperamentos: {temperament}</h3>
    </div>
  );
};

export default Card;
