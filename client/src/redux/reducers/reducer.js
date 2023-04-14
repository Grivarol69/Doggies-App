import { GET_BREEDS, GET_BREED } from '../actions/actions';

const initialState = {
  dogs: []
}

const rootReducer = (state=initialState, action) => {
  switch (action.type) {
    case GET_BREEDS: 
      return { ...state, dogs: action.payload }

    case GET_BREED:
      return { ...state, } 
    default:
      return { ...state };
  }
}

export default rootReducer;