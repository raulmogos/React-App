import * as actions from '../actions';
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

  it('increased likes', () => {
    const newState = contactsReducer(state, actions.increaseLikes(randomContact.id));
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

  it('decreased likes', () => {
    const newState = contactsReducer(state, actions.decreaseLikes(randomContact.id));
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

  it('is checked', () => {
    const newState = contactsReducer(state, actions.changeIsChecked(randomContact.id));
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

  it('is deleted', () => {
    const newState = contactsReducer(state, actions.deleteContact(randomContact.id));
    expect(newState.contacts.length).toEqual(state.contacts.length - 1);
    expect(newState.contacts.find(x => x.id === randomContact.id)).toEqual(undefined);
  });

});

describe('contacts reducer with NO params', () => {

  const state = {
    contacts: randomContactsList,
    favourites: []
  };

  it('fetch contacts', () => {
    const newState = contactsReducer({ contacts: [], favourites: [] }, actions.fetchContacts());
    expect(newState).toEqual({
      contacts: randomContactsList,
      favourites: []
    });
  });

  it('fetch favourites, no list contacts list', () => {
    const newState = contactsReducer({ contacts: [], favourites: [] }, actions.fetchFavourites());
    expect(newState).toEqual({
      contacts: [],
      favourites: []
    });
  });

  it('fetch favourites', () => {
    const newState = contactsReducer(state, actions.fetchFavourites());
    expect(newState).toEqual({
      contacts: state.contacts,
      favourites: getFavouritesList(state.contacts)
    });
  });

  it('delete selcted contacts', () => {
    const newState = contactsReducer(state, actions.deleteSelectedContacts());
    expect(newState).toEqual({
      contacts: state.contacts.filter(item => !item.isChecked),
      favourites: []
    });
  });

  it('clear selcted contacts', () => {
    const newState = contactsReducer(state, actions.clearContacts());
    expect(newState).toEqual({
      contacts: state.contacts.map(item => ({ ...item, likes: 0 })),
      favourites: []
    });
  });

  it('add contact', () => {
    const newContact = {
      firstName: 'Mogos',
      lastName: 'Raul',
      image: 'https://www.jquery-az.com/git-commands/'
    };
    const newState = contactsReducer(state, actions.addContact(newContact));
    expect(newState.contacts.length).toEqual(state.contacts.length + 1);
    expect(newState.contacts.some(x => x.firstName === newContact.firstName)).toEqual(true);
  });

  it('no good type', () => {
    const newState = contactsReducer(state, { type: 'some string' });
    expect(newState).toEqual({
      contacts: randomContactsList,
      favourites: []
    });
  });

});
