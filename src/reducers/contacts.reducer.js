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
      return { ...state, favourites: getFavouritesList(state.contacts) };
    case INCREASE_LIKES:
      const newContacts = state.contacts.map(item => ({ ...item }));
      newContacts.find(item => item.id === action.payload).likes += 1;
      return { ...state, contacts: newContacts };
    case DECREASE_LIKES:
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.payload) {
            // eslint-disable-next-line no-param-reassign
            item.likes -= 1;
            return { ...item };
          }
          return { ...item };
        })
      };
    case CHANGE_IS_CHECKED:
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.payload) {
            // eslint-disable-next-line no-param-reassign
            item.isChecked = !item.isChecked;
            return { ...item };
          }
          return { ...item };
        })
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(item => item.id !== action.payload)
      };
    case ADD_CONTACT:
      return { ...state, contacts: [] };

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
