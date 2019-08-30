import React from 'react';
import PropTypes from 'prop-types';
import './Contact.css';
import InLineSpinner from './InLineSpinner';
import Avatar from './Avatar';
import Button from './Button';
import Checkbox from './Checkbox';
import { LIKES } from '../constants/constants';

class Contact extends React.Component {

  changeIsCheckedStatus = () => {
    const { contactMethods, contact } = this.props;
    contactMethods.changeIsChecked(contact.id);
  }

  increaseLikes = () => {
    const { contactMethods, contact } = this.props;
    if (contact.likes >= LIKES.MAX) return;
    contactMethods.updateLikes(contact.id, 1);
  }

  decreaseLikes = () => {
    const { contactMethods, contact } = this.props;
    if (contact.likes <= LIKES.MIN) return;
    contactMethods.updateLikes(contact.id, -1);
  }

  deleteContact = () => {
    const { contactMethods, contact } = this.props;
    contactMethods.deleteContact(contact.id);
  }

  renderContact() {
    const { contact, isFavourite } = this.props;
    return (
      <div className="ui eight column center aligned grid">
        { !isFavourite && (
          <div className="column align-middle">
            <Checkbox isChecked={contact.isChecked} action={this.changeIsCheckedStatus} />
          </div>
        )}
        { !isFavourite && (
          <div className="column">
            <Button
              customType="like"
              onClickAction={this.increaseLikes}
              isDisabled={contact.likes >= LIKES.MAX}
            />
          </div>
        )}
        <div className="column">
          <div className="ui olive big circular label"> {contact.likes} </div>
        </div>
        { !isFavourite && (
          <div className="column">
            <Button
              customType="dislike"
              onClickAction={this.decreaseLikes}
              isDisabled={contact.likes <= LIKES.MIN}
            />
          </div>
        )}
        <div className="column"> <Avatar image={contact.image} /> </div>
        <div className="column align-middle"> { contact.firstName } </div>
        <div className="column align-middle"> { contact.lastName } </div>
        { !isFavourite && (
          <div className="column"> <Button customType="trash" onClickAction={this.deleteContact} /> </div>
        )}
      </div>
    );
  }

  render() {
    const { contact } = this.props;
    return (
      !contact
        ? <InLineSpinner />
        : this.renderContact()
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool.isRequired
  }).isRequired,
  isFavourite: PropTypes.bool.isRequired,
  contactMethods: PropTypes.exact({
    updateLikes: PropTypes.func,
    changeIsChecked: PropTypes.func,
    deleteContact: PropTypes.func
  }).isRequired
};

export default Contact;
