import { FETCH_CONTACTS } from './types';
import data from '../data/data';

export function fetchContacts() {
  return {
    type: FETCH_CONTACTS,
    payload: data
  };
}
