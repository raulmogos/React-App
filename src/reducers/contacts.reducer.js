import {
  FETCH_CONTACTS,
  FETCH_FAVOURITES,
  INCREASE_LIKES,
  DECREASE_LIKES,
  CHANGE_IS_CHECKED,
  DELETE_CONTACT,
  ADD_CONTACT
} from '../actions/types';

import { arrayToObject, getFavouritesList, generateId } from '../helpers/helper';
import randomContactsList from '../data/data';

const initialState = {
  contacts: {},
  favourites: []
};

export default (state = initialState, action) => {
  let obj;
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: arrayToObject(randomContactsList) };
    case FETCH_FAVOURITES:
      return { ...state, favourites: [...getFavouritesList(Object.values(state.contacts))] };
    case INCREASE_LIKES:
      obj = { ...state.contacts[action.payload] };
      obj.likes += 1;
      return { ...state, contacts: { ...state.contacts, [action.payload]: obj } };
    case DECREASE_LIKES:
      obj = { ...state.contacts[action.payload] };
      obj.likes -= 1;
      return { ...state, contacts: { ...state.contacts, [action.payload]: obj } };
    case CHANGE_IS_CHECKED:
      obj = { ...state.contacts[action.payload] };
      obj.isChecked = !obj.isChecked;
      return { ...state, contacts: { ...state.contacts, [action.payload]: obj } };
    case DELETE_CONTACT:
      const newContacts = { ...state.contacts };
      delete newContacts[action.payload];
      return { ...state, contacts: newContacts };
    case ADD_CONTACT:
      const newId = generateId();
      const newContact = {
        ...action.payload,
        likes: 0,
        isChecked: false,
        newId
      };
      return { ...state, contacts: { ...state.contacts, [newId]: newContact } };
    default:
      return state;
  }
};
