import React from 'react'
import { useSelector } from 'react-redux';
import Card from '../Card/Card';
import styles from './CardsContainer.module.css'

const CardsContainer = () => {

  const data = useSelector(state => state.dogs);
  
  return (
    <div className={styles.container}>
      { data.map((dato) => {
        return <Card
          id={dato.id}
          key={dato.id}
          image={dato.image}
          name={dato.name}
          weightMin={dato.weightMin}
          weightMax={dato.weightMax}
          heightMin={dato.heightMin}
          heightMax={dato.heightMax}
          life_span={dato.life_span}
          temperament={dato.temperament}
        />
      })}
    </div>
  )
}

export default CardsContainer
