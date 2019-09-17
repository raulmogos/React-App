import { FETCH_CONTACTS } from '../actions/types';
import { arrayToObject } from '../helpers/helper';
import randomContactsList from '../data/data';

const initialState = {
  contacts: {},
  favourites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: arrayToObject(randomContactsList) };
    default:
      return state;
  }
};
