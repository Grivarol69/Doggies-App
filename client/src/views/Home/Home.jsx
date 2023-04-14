import React, { useEffect } from 'react'
import CardsContainer from '../../components/CardsContainer/CardsContainer'
import { useDispatch } from 'react-redux';
import { getBreeds } from '../../redux/actions/actions';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(getBreeds());

  },[]);

  return (
    <div>
      <h2>Home</h2>
      <CardsContainer/>
    </div>
  )
}

export default Home
