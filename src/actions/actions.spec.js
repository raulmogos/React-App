import {
  increaseLikes,
  decreaseLikes,
  changeIsChecked,
  fetchContacts,
  fetchFavourites,
  addContact,
  deleteContact,
  deleteSelectedContacts,
  clearContacts
} from './index';
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

const id = 'asdasdas2342342odifns';
const formValues = {
  firstName: 'Ana',
  lastName: 'Maria',
  image: 'https://ana-maria.com'
};

describe('actions', () => {
  test('fetchContacts', () => {
    expect(fetchContacts()).toEqual({
      type: FETCH_CONTACTS
    });
  });
  test('fetchFavourites', () => {
    expect(fetchFavourites()).toEqual({
      type: FETCH_FAVOURITES
    });
  });
  test('increaseLikes', () => {
    expect(increaseLikes(id)).toEqual({
      type: INCREASE_LIKES,
      payload: id
    });
  });
  test('decreaseLikes', () => {
    expect(decreaseLikes(id)).toEqual({
      type: DECREASE_LIKES,
      payload: id
    });
  });
  test('changeIsChecked', () => {
    expect(changeIsChecked(id)).toEqual({
      type: CHANGE_IS_CHECKED,
      payload: id
    });
  });
  test('deleteContact', () => {
    expect(deleteContact(id)).toEqual({
      type: DELETE_CONTACT,
      payload: id
    });
  });
  test('addContact', () => {
    expect(addContact(formValues)).toEqual({
      type: ADD_CONTACT,
      payload: { ...formValues }
    });
  });
  test('deleteSelectedContacts', () => {
    expect(deleteSelectedContacts()).toEqual({
      type: DELETE_SELECTED_CONTACTS
    });
  });
  test('clearContacts', () => {
    expect(clearContacts()).toEqual({
      type: CLEAR_CONTACTS
    });
  });
});
