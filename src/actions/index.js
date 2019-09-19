import { FETCH_CONTACTS, FETCH_FAVOURITES } from './types';

export const fetchContacts = () => ({
  type: FETCH_CONTACTS
});

export const fetchFavourites = () => ({
  type: FETCH_FAVOURITES
});
