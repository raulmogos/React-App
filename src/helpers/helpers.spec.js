import {
  validateInput,
  areContactsEqual,
  isContactUnique,
  getFavouritesList
} from './helper';
import { REGEX } from '../constants/constants';

const dataToTest = {
  pass: {
    name: 'Ana',
    url: 'https://google.com'
  },
  fail: {
    name: 'Ana$',
    url: 'aasdfasda'
  }
};

const mockContactsList = [
  {
    firstName: 'Ana',
    lastName: 'Maria',
    image: 'https://google.com',
    likes: 3
  },
  {
    firstName: 'Alex',
    lastName: 'Popescu',
    image: 'https://google.com',
    likes: 1
  },
  {
    firstName: 'Cristi',
    lastName: 'Fanea',
    image: 'https://fb.com',
    likes: 5
  },
  {
    firstName: 'George',
    lastName: 'George',
    image: 'https://aaaaaaaaa.com',
    likes: 3
  }
];

describe('validateInput', () => {
  test('should return true when name is valid', () => {
    expect(validateInput(dataToTest.pass.name, REGEX.NAME)).toBeTruthy();
  });
  test('should return false when name is NOT valid', () => {
    expect(validateInput(dataToTest.fail.name, REGEX.NAME)).toBeFalsy();
  });
  test('should return true when url is valid', () => {
    expect(validateInput(dataToTest.pass.url, REGEX.URL)).toBeTruthy();
  });
  test('should return false when url is NOT valid', () => {
    expect(validateInput(dataToTest.fail.url, REGEX.URL)).toBeFalsy();
  });
});

describe('areContactsEqual', () => {
  test('should return true when names are equal', () => {
    expect(areContactsEqual(mockContactsList[0], {
      firstName: 'Ana',
      lastName: 'Maria',
      image: 'https://asdas.com'
    })).toBeTruthy();
  });
  test('should return true when urls are equal', () => {
    expect(areContactsEqual(mockContactsList[0], {
      firstName: 'Maria',
      lastName: 'Ioana',
      image: 'https://google.com'
    })).toBeTruthy();
  });
  test('should return false when urls and names are NOT equal', () => {
    expect(areContactsEqual(mockContactsList[1], mockContactsList[2])).toBeFalsy();
  });
});

describe('isContactUnique', () => {
  test('should return true when contact is unique', () => {
    expect(isContactUnique(mockContactsList, {
      firstName: 'Alex',
      lastName: 'Viorel',
      image: 'https://cvv.com',
      likes: 1
    })).toBeTruthy();
  });
  test('should return false when contact is NOT unique', () => {
    expect(isContactUnique(mockContactsList, {
      firstName: 'Alex',
      lastName: 'Popescu',
      image: 'https://cvv.com',
      likes: 1
    })).toBeFalsy();
    expect(isContactUnique(mockContactsList, {
      firstName: 'Alex',
      lastName: 'Viorel',
      image: 'https://google.com',
      likes: 1
    })).toBeFalsy();
  });
});

describe('getFavouritesList', () => {
  test('should return top 3 contacts sorted by likes', () => {
    expect(getFavouritesList(mockContactsList)).toEqual([
      {
        firstName: 'Cristi',
        lastName: 'Fanea',
        image: 'https://fb.com',
        likes: 5
      },
      {
        firstName: 'Ana',
        lastName: 'Maria',
        image: 'https://google.com',
        likes: 3
      },
      {
        firstName: 'George',
        lastName: 'George',
        image: 'https://aaaaaaaaa.com',
        likes: 3
      },
      {
        firstName: 'Alex',
        lastName: 'Popescu',
        image: 'https://google.com',
        likes: 1
      }
    ]);
  });
});
