import React from 'react';
import PropTypes from 'prop-types';
import './contact.style.css';
import InLineSpinner from '../InLineSpinner';
import Avatar from '../Avatar';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { LIKES } from '../../constants/constants';

class Contact extends React.Component {

  changeIsCheckedStatus = () => {
    const { _changeIsChecked, contact } = this.props;
    _changeIsChecked(contact.id);
  }

  increaseLikes = () => {
    const { _increaseLikes, contact } = this.props;
    if (contact.likes >= LIKES.MAX) return;
    _increaseLikes(contact.id);
  }

  decreaseLikes = () => {
    const { _decreaseLikes, contact } = this.props;
    if (contact.likes <= LIKES.MIN) return;
    _decreaseLikes(contact.id, -1);
  }
  
  deleteContact = () => {
    const { _deleteContact, contact } = this.props;
    _deleteContact(contact.id);
  }

  renderContact() {
    const { contact, isFavourite } = this.props;
    return (
      <div className="ui eight column center aligned grid">
        { !isFavourite && (
          <div className="left floated clomun align-middle">
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
  _deleteContact: PropTypes.func.isRequired,
  _changeIsChecked: PropTypes.func.isRequired,
  _increaseLikes: PropTypes.func.isRequired,
  _decreaseLikes: PropTypes.func.isRequired
};

export default Contact;
