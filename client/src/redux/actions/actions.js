import axios from 'axios';

export const GET_BREEDS = "GET_BREEDS";
export const GET_BREED = "GET_BREED";

export const getBreeds = () => {
  return async function (dispatch) {
    const getData = await axios.get('http://localhost:3001/dogs');
    const dogs = getData.data;
    dispatch({type: GET_BREEDS, payload: dogs});
  }
}

export const getBreed = (id) => {
  return async function (dispatch) {
    const getDataById = axios.get(`http://localhost:3001/dogs/${id}`);
    const dog = (await getDataById).data;
    dispatch({type: GET_BREED, payload: dog});
  }
}

export default getBreeds;