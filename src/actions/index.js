import {
  FETCH_CONTACTS,
  FETCH_FAVOURITES,
  INCREASE_LIKES,
  CHANGE_IS_CHECKED,
  DELETE_CONTACT,
  ADD_CONTACT,
  DECREASE_LIKES,
  DELETE_SELECTED_CONTACTS,
  CLEAR_CONTACTS
} from './types';
import { generateId } from '../helpers/helper';

export const fetchContacts = () => ({
  type: FETCH_CONTACTS
});

export const fetchFavourites = () => ({
  type: FETCH_FAVOURITES
});

export const increaseLikes = id => ({
  type: INCREASE_LIKES,
  payload: id
});

export const decreaseLikes = id => ({
  type: DECREASE_LIKES,
  payload: id
});

export const changeIsChecked = id => ({
  type: CHANGE_IS_CHECKED,
  payload: id
});

export const deleteContact = id => ({
  type: DELETE_CONTACT,
  payload: id
});

export const addContact = formValues => ({
  type: ADD_CONTACT,
  payload: {
    ...formValues,
    likes: 0,
    id: generateId(),
    isChecked: false
  }
});

export const deleteSelectedContacts = () => ({
  type: DELETE_SELECTED_CONTACTS
});

export const clearContacts = () => ({
  type: CLEAR_CONTACTS
});
