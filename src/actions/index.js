import { FETCH_CONTACTS, FETCH_FAVOURITES } from './types';
import data from '../data/data';

export function fetchContacts() {
  return {
    type: FETCH_CONTACTS,
    payload: data
  };
}

export function fetchFavourites() {
  return {
    type: FETCH_FAVOURITES
  };
}
