import { FETCH_CONTACTS, FETCH_FAVOURITES } from './types';

export function fetchContacts() {
  return {
    type: FETCH_CONTACTS
  };
}

export function fetchFavourites() {
  return {
    type: FETCH_FAVOURITES
  };
}
