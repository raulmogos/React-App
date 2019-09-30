import React from 'react';
import { shallow } from 'enzyme';
import AddContactForm from './add-contact-form.component';
import * as helpers from '../../helpers/helper';

// eslint-disable-next-line react/jsx-props-no-spreading
const setUp = (props = {}) => shallow(<AddContactForm {...props} />);

const params = {
  names: {
    firstName: 'firstName',
    lastName: 'lastName',
    imageUrl: 'imageUrl'
  },
  values: {
    firstName: 'Ana',
    lastName: 'Maria',
    imageUrl: 'https://stackoverflow.com'
  },
  valuesForErrors: {
    firstName: 'Ana!@#$',
    imageUrl: 'stackoverflowasd.com'
  }
};

const props = {
  _addContact: jest.fn(),
  contacts: []
};

describe('add contact component', () => {

  let component;
  let instance;
  
  beforeEach(() => {
    component = setUp(props);
    instance = component.instance();
  });

  describe('onFormInputChange', () => {
    test('should change firstName, no error', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.firstName,
          value: ` ${params.values.firstName} `
        }
      });
      expect(instance.state.firstName).toEqual(params.values.firstName);
      expect(instance.state.firstNameError).toBeFalsy();
    });
    test('should change firstName, with error', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.firstName,
          value: ` ${params.valuesForErrors.firstName} `
        }
      });
      expect(instance.state.firstName).toEqual(params.valuesForErrors.firstName);
      expect(instance.state.firstNameError).toBeTruthy();
    });
    test('should change iamgeUrl, no error', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.imageUrl,
          value: ` ${params.values.imageUrl} `
        }
      });
      expect(instance.state.imageUrl).toEqual(params.values.imageUrl);
      expect(instance.state.imageUrlError).toBeFalsy();
    });
    test('should change iamgeUrl, with error', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.imageUrl,
          value: ` ${params.valuesForErrors.imageUrl} `
        }
      });
      expect(instance.state.imageUrl).toEqual(params.valuesForErrors.imageUrl);
      expect(instance.state.imageUrlError).toBeTruthy();
    });
  });

  describe('isButtonDisabled', () => {
    test('should change to false', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.firstName,
          value: params.values.firstName
        }
      });
      instance.onFormInputChange({
        target: {
          name: params.names.lastName,
          value: params.values.lastName
        }
      });
      instance.onFormInputChange({
        target: {
          name: params.names.imageUrl,
          value: params.values.imageUrl
        }
      });
      expect(instance.isButtonDisabled()).toBeFalsy();
    });
    test('should change to true', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.lastName,
          value: params.values.lastName
        }
      });
      instance.onFormInputChange({
        target: {
          name: params.names.imageUrl,
          value: params.values.imageUrl
        }
      });
      expect(instance.isButtonDisabled()).toBeTruthy();
    });
    test('should change to true, with error', () => {
      instance.onFormInputChange({
        target: {
          name: params.names.firstName,
          value: params.valuesForErrors.firstName
        }
      });
      instance.onFormInputChange({
        target: {
          name: params.names.lastName,
          value: params.values.lastName
        }
      });
      instance.onFormInputChange({
        target: {
          name: params.names.imageUrl,
          value: params.values.imageUrl
        }
      });
      expect(instance.isButtonDisabled()).toBeTruthy();
    });
  });

  describe('handleSubmit', () => {
    let event;
    beforeEach(() => {
      event = {
        preventDefault: jest.fn()
      };
      instance.openDuplicateContactPopup = jest.fn();
    });
    test('should call isContactUnique, preventDefault functions and not _addContact', () => {
      helpers.isContactUnique = jest.fn().mockImplementation(() => false);
      instance.handleSubmit(event);
      expect(event.preventDefault.mock.calls.length).toBe(1);
      expect(instance.openDuplicateContactPopup.mock.calls.length).toBe(1);
      expect(props._addContact.mock.calls.length).toBe(0);
    });
    test('if contact is unique', () => {
      helpers.isContactUnique = jest.fn().mockImplementation(() => true);
      instance.handleSubmit(event);
      expect(event.preventDefault.mock.calls.length).toBe(1);
      expect(instance.openDuplicateContactPopup.mock.calls.length).toBe(0);
      expect(props._addContact.mock.calls.length).toBe(1);
    });
  });

  describe('openDuplicateContactPopup', () => {
    test('should be opened', () => {
      instance.openDuplicateContactPopup();
      expect(instance.state.showPopup).toBeTruthy();
      instance.setState = jest.fn();
      instance.openDuplicateContactPopup();
      expect(instance.setState.mock.calls.length).toBe(1);
    });
  });

  describe('closePopUp', () => {
    test('should not be opened', () => {
      instance.closePopUp();
      expect(instance.state.showPopup).toBeFalsy();
      instance.setState = jest.fn();
      instance.closePopUp();
      expect(instance.setState.mock.calls.length).toBe(1);
    });
  });
});
