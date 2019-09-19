import { FETCH_CONTACTS } from '../actions/types';
import randomContactsList from '../data/data';

const initialState = {
  contacts: [],
  favourites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: randomContactsList };
    default:
      return state;
  }
};
