import {
  increaseLikes,
  decreaseLikes,
  deleteContact,
  deleteSelectedContacts,
  clearContacts,
  changeIsChecked,
  fetchFavourites,
  fetchContacts,
  addContact
} from '../actions';
import contactsReducer from './contacts.reducer';
import randomContactsList from '../data/data';
import { getRandomNumber, getFavouritesList } from '../helpers/helper';
import { DEFAULT_NUMBER_OF_CONTACTS as N } from '../constants/constants';

describe('contacts reducer with id param', () => {

  const state = {
    contacts: randomContactsList,
    favourites: []
  };
  let randomContactIndex;
  let randomContact;

  beforeEach(() => {
    randomContactIndex = getRandomNumber(0, N);
    randomContact = state.contacts[randomContactIndex];
  });

  test('increased likes', () => {
    const newState = contactsReducer(state, increaseLikes(randomContact.id));
    expect(newState.contacts[randomContactIndex].likes).toEqual(randomContact.likes + 1);
    expect(newState).toEqual({
      contacts: state.contacts.map((item, index) => {
        if (index === randomContactIndex) {
          return { ...item, likes: randomContact.likes + 1 };
        }
        return item;
      }),
      favourites: []
    });
  });

  test('decreased likes', () => {
    const newState = contactsReducer(state, decreaseLikes(randomContact.id));
    expect(newState.contacts[randomContactIndex].likes).toEqual(randomContact.likes - 1);
    expect(newState).toEqual({
      contacts: state.contacts.map((item, index) => {
        if (index === randomContactIndex) {
          return { ...item, likes: randomContact.likes - 1 };
        }
        return item;
      }),
      favourites: []
    });
  });

  test('is checked', () => {
    const newState = contactsReducer(state, changeIsChecked(randomContact.id));
    expect(newState.contacts[randomContactIndex].isChecked).toEqual(!randomContact.isChecked);
    expect(newState).toEqual({
      contacts: state.contacts.map((item, index) => {
        if (index === randomContactIndex) {
          return { ...item, isChecked: !randomContact.isChecked };
        }
        return item;
      }),
      favourites: []
    });
  });

  test('is deleted', () => {
    const newState = contactsReducer(state, deleteContact(randomContact.id));
    expect(newState.contacts.length).toEqual(state.contacts.length - 1);
    expect(newState.contacts.find(x => x.id === randomContact.id)).toEqual(undefined);
  });

});

describe('contacts reducer with NO params', () => {

  const state = {
    contacts: randomContactsList,
    favourites: []
  };

  test('fetch contacts', () => {
    const newState = contactsReducer({ contacts: [], favourites: [] }, fetchContacts());
    expect(newState).toEqual({
      contacts: randomContactsList,
      favourites: []
    });
  });

  test('fetch favourites, no list contacts list', () => {
    const newState = contactsReducer({ contacts: [], favourites: [] }, fetchFavourites());
    expect(newState).toEqual({
      contacts: [],
      favourites: []
    });
  });

  test('fetch favourites', () => {
    const newState = contactsReducer(state, fetchFavourites());
    expect(newState).toEqual({
      contacts: state.contacts,
      favourites: getFavouritesList(state.contacts)
    });
  });

  test('delete selcted contacts', () => {
    const newState = contactsReducer(state, deleteSelectedContacts());
    expect(newState).toEqual({
      contacts: state.contacts.filter(item => !item.isChecked),
      favourites: []
    });
  });

  test('clear selcted contacts', () => {
    const newState = contactsReducer(state, clearContacts());
    expect(newState).toEqual({
      contacts: state.contacts.map(item => ({ ...item, likes: 0 })),
      favourites: []
    });
  });

  test('add contact', () => {
    const newContact = {
      firstName: 'Mogos',
      lastName: 'Raul',
      image: 'https://www.jquery-az.com/git-commands/'
    };
    const newState = contactsReducer(state, addContact(newContact));
    expect(newState.contacts.length).toEqual(state.contacts.length + 1);
    expect(newState.contacts.some(x => x.firstName === newContact.firstName)).toEqual(true);
  });

  test('no good type', () => {
    const newState = contactsReducer(state, { type: 'some string' });
    expect(newState).toEqual({
      contacts: randomContactsList,
      favourites: []
    });
  });

});
