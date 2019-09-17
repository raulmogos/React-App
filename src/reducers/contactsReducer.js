import _ from 'lodash';
import { FETCH_CONTACTS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    default:
      return state;
  }
};
