import _lodash from 'lodash';
import { FETCH_CONTACTS, FETCH_FAVOURITES } from '../actions/types';
import { getFavouritesList } from '../helpers/helper';

const INITIAL_STATE = {
  contacts: {},
  favourites: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: { ..._lodash.mapKeys(action.payload, 'id') } };
    case FETCH_FAVOURITES:
      return { ...state, favourites: [...getFavouritesList(Object.values(state.contacts))] };
    default:
      return state;
  }
};
