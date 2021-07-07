import React from 'react';
import { shallow } from 'enzyme';
import Contact from './contact.component';

// eslint-disable-next-line react/jsx-props-no-spreading
const setUp = (props = {}) => shallow(<Contact {...props} />);

const props = {
  contact: {
    id: '2389eh239fn2',
    firstName: 'Maria',
    lastName: 'Ioana',
    image: 'https://asdasdas',
    likes: 3,
    isChecked: false
  },
  isFavourite: false,
  _deleteContact: jest.fn(),
  _changeIsChecked: jest.fn(),
  _increaseLikes: jest.fn(),
  _decreaseLikes: jest.fn()
};

describe('contact component', () => {
  let component;
  let instance;
  beforeEach(() => {
    component = setUp(props);
    instance = component.instance();
  });
  describe('changeIsCheckedStatus', () => {
    test('if it is called', () => {
      instance.changeIsCheckedStatus();
      expect(props._changeIsChecked.mock.calls.length).toBe(1);
    });
  });
  describe('increaseLikes', () => {
    test('should increse likes', () => {
      component.setProps({ ...props, contact: { ...props.contact, likes: 5 } });
      instance.increaseLikes();
      expect(props._increaseLikes.mock.calls.length).toBe(1);
      component.setProps({ ...props, contact: { ...props.contact, likes: 9 } });
      instance.increaseLikes();
      expect(props._increaseLikes.mock.calls.length).toBe(1);
      component.setProps({ ...props, contact: { ...props.contact, likes: 23 } });
      instance.increaseLikes();
      expect(props._increaseLikes.mock.calls.length).toBe(1);
    });
  });
  describe('decreaseLikes', () => {
    test('should decrease likes', () => {
      component.setProps({ ...props, contact: { ...props.contact, likes: 5 } });
      instance.decreaseLikes();
      expect(props._decreaseLikes.mock.calls.length).toBe(1);
      component.setProps({ ...props, contact: { ...props.contact, likes: 0 } });
      instance.decreaseLikes();
      expect(props._decreaseLikes.mock.calls.length).toBe(1);
      component.setProps({ ...props, contact: { ...props.contact, likes: -2 } });
      instance.decreaseLikes();
      expect(props._decreaseLikes.mock.calls.length).toBe(1);
    });
  });
  describe('deleteContact', () => {
    test('should call deleteContact function', () => {
      instance.closePopUp = jest.fn();
      instance.deleteContact();
      expect(props._deleteContact.mock.calls.length).toBe(1);
      expect(instance.closePopUp.mock.calls.length).toBe(1);
    });
  });
  describe('openDeleteContactPopUp', () => {
    test('if it is called', () => {
      instance.openDeleteContactPopUp();
      expect(instance.state.showPopup).toBeTruthy();
      instance.setState = jest.fn();
      instance.openDeleteContactPopUp();
      expect(instance.setState.mock.calls.length).toBe(1);
    });
  });
});
