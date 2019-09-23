import {
  FETCH_CONTACTS,
  FETCH_FAVOURITES,
  INCREASE_LIKES,
  DECREASE_LIKES,
  CHANGE_IS_CHECKED,
  DELETE_CONTACT,
  ADD_CONTACT,
  DELETE_SELECTED_CONTACTS,
  CLEAR_CONTACTS
} from '../actions/types';
import { getFavouritesList, isContactUnique } from '../helpers/helper';
import randomContactsList from '../data/data';

const initialState = {
  contacts: [],
  favourites: []
};

export default (state = initialState, action) => {
  let newContacts;
  switch (action.type) {
    case FETCH_CONTACTS:
      return { ...state, contacts: randomContactsList };
    case FETCH_FAVOURITES:
      return { ...state, favourites: getFavouritesList(state.contacts) };
    case INCREASE_LIKES:
      newContacts = state.contacts.map(item => ({ ...item }));
      newContacts.find(item => item.id === action.payload).likes += 1;
      return { ...state, contacts: newContacts };
    case DECREASE_LIKES:
      newContacts = state.contacts.map(item => ({ ...item }));
      newContacts.find(item => item.id === action.payload).likes -= 1;
      return { ...state, contacts: newContacts };
    case CHANGE_IS_CHECKED:
      newContacts = state.contacts.map(item => ({ ...item }));
      const contact = newContacts.find(item => item.id === action.payload);
      contact.isChecked = !contact.isChecked;
      return { ...state, contacts: newContacts };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== action.payload)
      };
    case ADD_CONTACT:
      newContacts = state.contacts.map(item => ({ ...item }));
      if (!isContactUnique(state.contacts, action.payload)) return state;
      newContacts.unshift(action.payload);
      return { ...state, contacts: newContacts };
    case DELETE_SELECTED_CONTACTS:
      return {
        ...state,
        contacts: state.contacts.filter(item => !item.isChecked)
      };
    case CLEAR_CONTACTS:
      return {
        ...state,
        contacts: state.contacts.map(item => ({ ...item, likes: 0 }))
      };
    default:
      return state;
  }
};
