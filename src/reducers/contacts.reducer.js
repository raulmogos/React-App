import { FETCH_CONTACTS, FETCH_FAVOURITES } from '../actions/types';
import { getFavouritesList } from '../helpers/helper';
import randomContactsList from '../data/data';

const initialState = {
  contacts: [],
  favourites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: randomContactsList };
    case FETCH_FAVOURITES:
      return { ...state, favourites: [...getFavouritesList(state.contacts)] };
    default:
      return state;
  }
};
