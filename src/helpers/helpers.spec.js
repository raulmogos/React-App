import { validateInput } from './helper';
import { REGEX } from '../constants/constants';

const dataToTest = {
  pass: {
    name: 'Ana',
    contact: {
      firstName: 'Ana',
      lastName: 'Maria',
      image: 'https:'
    }
  },
  fail: {
    name: 'Ana$'
  }
};

describe('validateInput', () => {
  test('name to pass', () => {
    expect(validateInput(dataToTest.pass.name, REGEX.NAME)).toBeTruthy();
  });
  test('name to fail', () => {
    expect(validateInput(dataToTest.fail.name, REGEX.NAME)).toBeFalsy();
  });
});

describe('areContactsEqual', () => {
  test('areContactsEqual', () => {

  });
});
