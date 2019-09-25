import React from 'react';
import { shallow } from 'enzyme';
import AddContactForm from './add-contact-form.component';

// eslint-disable-next-line react/jsx-props-no-spreading
const setUp = (props = {}) => shallow(<AddContactForm {...props} />);

describe('add contact component', () => {
  test('should render ok', () => {
    const component = setUp();
    let form = component.find('.form');
    expect(form.length).toEqual(1);
    form = component.find('.fields');
    expect(form.length).toEqual(2);
  });
});
