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

const mockListOfContacts = [
  {
    id: 'd1db34a6-89c4-4394-ad83-081dd028a787',
    firstName: 'Kamryn',
    lastName: 'Hane',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/iamsteffen/128.jpg',
    likes: 2,
    isChecked: false
  },
  {
    id: 'd6e89a21-be7c-4053-8fed-aee4adb81801',
    firstName: 'Jody',
    lastName: 'Rodriguez',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/aroon_sharma/128.jpg',
    likes: 3,
    isChecked: true
  },
  {
    id: 'e3844048-c3bb-4260-9710-c2b8b946cad8',
    firstName: 'Zena',
    lastName: 'Gulgowski',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/joki4/128.jpg',
    likes: 2,
    isChecked: false
  },
  {
    id: '4c4c28a5-ecf0-4b32-922d-e5c15f0be9d0',
    firstName: 'Gabe',
    lastName: 'Carter',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/vaughanmoffitt/128.jpg',
    likes: 5,
    isChecked: false
  },
  {
    id: '8f3b8903-d211-4bd6-bd56-ba844327b0b4',
    firstName: 'Israel',
    lastName: 'Skiles',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/nacho/128.jpg',
    likes: 9,
    isChecked: true
  },
  {
    id: 'db365db8-8e2a-4a5f-af9a-e934b4b828ab',
    firstName: 'Nils',
    lastName: 'Koelpin',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/nacho/128.jpg',
    likes: 5,
    isChecked: true
  },
  {
    id: 'c05048e5-868f-4d93-a762-15ab27de853f',
    firstName: 'Oran',
    lastName: 'Sawayn',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/blakesimkins/128.jpg',
    likes: 0,
    isChecked: true
  },
  {
    id: '0ce492ed-3fc3-4e05-972c-75d2c6e7128e',
    firstName: 'Michale',
    lastName: 'Runolfsson',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kazaky999/128.jpg',
    likes: 3,
    isChecked: true
  },
  {
    id: '92a84e70-e9b5-4160-addb-8bea680704d5',
    firstName: 'Isaias',
    lastName: 'Sawayn',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/necodymiconer/128.jpg',
    likes: 3,
    isChecked: false
  },
  {
    id: '04cf8f74-fde9-472b-9e23-c2a7bd181377',
    firstName: 'Carlo',
    lastName: 'Considine',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/low_res/128.jpg',
    likes: 0,
    isChecked: true
  }
];

const mockListOFavourits = [
  {
    id: '8f3b8903-d211-4bd6-bd56-ba844327b0b4',
    firstName: 'Israel',
    lastName: 'Skiles',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/nacho/128.jpg',
    likes: 9,
    isChecked: true
  },
  {
    id: '4c4c28a5-ecf0-4b32-922d-e5c15f0be9d0',
    firstName: 'Gabe',
    lastName: 'Carter',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/vaughanmoffitt/128.jpg',
    likes: 5,
    isChecked: false
  },
  {
    id: 'db365db8-8e2a-4a5f-af9a-e934b4b828ab',
    firstName: 'Nils',
    lastName: 'Koelpin',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/nacho/128.jpg',
    likes: 5,
    isChecked: true
  },
  {
    id: '92a84e70-e9b5-4160-addb-8bea680704d5',
    firstName: 'Isaias',
    lastName: 'Sawayn',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/necodymiconer/128.jpg',
    likes: 3,
    isChecked: false
  },
  {
    id: 'd6e89a21-be7c-4053-8fed-aee4adb81801',
    firstName: 'Jody',
    lastName: 'Rodriguez',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/aroon_sharma/128.jpg',
    likes: 3,
    isChecked: true
  },
  {
    id: '0ce492ed-3fc3-4e05-972c-75d2c6e7128e',
    firstName: 'Michale',
    lastName: 'Runolfsson',
    image: 'https://s3.amazonaws.com/uifaces/faces/twitter/kazaky999/128.jpg',
    likes: 3,
    isChecked: true
  }
];

describe('contactsReducer with id param', () => {

  const state = {
    contacts: mockListOfContacts,
    favourites: []
  };
  let randomContactIndex;
  let randomContact;

  beforeEach(() => {
    randomContactIndex = 4;
    randomContact = { ...state.contacts[randomContactIndex] };
  });

  test('should increased likes', () => {
    const newState = contactsReducer(state, increaseLikes(randomContact.id));
    expect(newState.contacts[randomContactIndex].likes).toEqual(randomContact.likes + 1);
  });

  test('should decreased likes', () => {
    const newState = contactsReducer(state, decreaseLikes(randomContact.id));
    expect(newState.contacts[randomContactIndex].likes).toEqual(randomContact.likes - 1);
  });

  test('should change isChecked', () => {
    const newState = contactsReducer(state, changeIsChecked(randomContact.id));
    expect(newState.contacts[randomContactIndex].isChecked).toEqual(!randomContact.isChecked);
  });

  test('should delete selected contact', () => {
    const newState = contactsReducer(state, deleteContact(randomContact.id));
    expect(newState.contacts.length).toEqual(state.contacts.length - 1);
    expect(newState.contacts.find(x => x.id === randomContact.id)).toEqual(undefined);
  });

});

describe('contacts reducer with NO params', () => {

  const state = {
    contacts: mockListOfContacts,
    favourites: []
  };

  test('should fetch contacts', () => {
    const newState = contactsReducer({ contacts: [], favourites: [] }, fetchContacts());
    expect(newState).toEqual({
      contacts: randomContactsList,
      favourites: []
    });
  });

  test('should fetch favourites, no list contacts list', () => {
    const newState = contactsReducer({ contacts: [], favourites: [] }, fetchFavourites());
    expect(newState).toEqual({
      contacts: [],
      favourites: []
    });
  });

  test('should fetch favourites', () => {
    const newState = contactsReducer(state, fetchFavourites());
    expect(newState).toEqual({
      contacts: state.contacts,
      favourites: mockListOFavourits
    });
  });

  test('should delete selcted contacts', () => {
    const newState = contactsReducer(state, deleteSelectedContacts());
    expect(newState).toEqual({
      contacts: state.contacts.filter(item => !item.isChecked),
      favourites: []
    });
  });

  test('should clear selcted contacts', () => {
    const newState = contactsReducer(state, clearContacts());
    expect(newState).toEqual({
      contacts: state.contacts.map(item => ({ ...item, likes: 0 })),
      favourites: []
    });
  });

  test('should add contact', () => {
    const newContact = {
      firstName: 'Mogos',
      lastName: 'Raul',
      image: 'https://www.jquery-az.com/git-commands/'
    };
    const newState = contactsReducer(state, addContact(newContact));
    expect(newState.contacts.length).toEqual(state.contacts.length + 1);
    expect(newState.contacts.some(x => x.firstName === newContact.firstName)).toEqual(true);
  });

  test('sould return previous state when no good type', () => {
    const newState = contactsReducer(state, { type: 'some string' });
    expect(newState).toEqual({ ...state });
  });

});
