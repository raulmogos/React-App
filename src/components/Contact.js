import React from 'react';
import PropTypes from 'prop-types';
import './Contact.css';
import InLineSpinner from './InLineSpinner';
import Avatar from './Avatar';
import Button from './Button';
import Checkbox from './Checkbox';
import LikesLabel from './LikesLabel';
import { LIKES } from '../constants/constants';

class Contact extends React.Component {

  get createFavouriteContactJSX() {
    const { contact } = this.props;
    return (
      <div className="ui eight column center aligned grid">
        <div className="column">
          <LikesLabel likes={contact.likes} />
        </div>
        <div className="column"> <Avatar image={contact.image} /> </div>
        <div className="column align-middle"> { contact.firstName } </div>
        <div className="column align-middle"> { contact.lastName } </div>
      </div>
    );
  }

  get createNormalContactJSX() {
    const { contact } = this.props;
    return (
      <div className="ui eight column equal width center aligned grid">
        <div className="column align-middle">
          <Checkbox isChecked={contact.isChecked} action={this.changeIsCheckedStatus} />
        </div>
        <div className="column">
          <Button
            customType="like"
            onClickAction={this.increaseLikes}
            isDisabled={this.isNumberLikesBiggerThanMax()}
          />
        </div>
        <div className="column">
          <LikesLabel likes={contact.likes} />
        </div>
        <div className="column">
          <Button
            customType="dislike"
            onClickAction={this.decreaseLikes}
            isDisabled={this.isNumberLikesLowerThanMin()}
          />
        </div>
        <div className="column"> <Avatar image={contact.image} /> </div>
        <div className="column align-middle"> { contact.firstName } </div>
        <div className="column align-middle"> { contact.lastName } </div>
        <div className="column"> <Button customType="trash" /> </div>
      </div>
    );
  }
  
  get getAppropriateJSX() {
    const { isFavourite, contact } = this.props;
    if (!contact) return <InLineSpinner />;
    if (isFavourite) return this.createFavouriteContactJSX;
    return this.createNormalContactJSX;
  }

  changeIsCheckedStatus = () => {
    const { methods, contact } = this.props;
    methods.changeIsChecked(contact.id);
  }

  isNumberLikesBiggerThanMax = () => {
    const { contact } = this.props;
    return contact.likes >= LIKES.MAX;
  }

  increaseLikes = () => {
    if (this.isNumberLikesBiggerThanMax()) return;
    const { methods, contact } = this.props;
    methods.increaseLikes(contact.id);
  }

  isNumberLikesLowerThanMin = () => {
    const { contact } = this.props;
    return contact.likes <= LIKES.MIN;
  }

  decreaseLikes = () => {
    if (this.isNumberLikesLowerThanMin()) return;
    const { methods, contact } = this.props;
    methods.decreaseLikes(contact.id);
  }

  render() {
    return (
      <div className="ui olive segment">
        {this.getAppropriateJSX}
      </div>
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
  methods: PropTypes.exact({
    increaseLikes: PropTypes.func,
    decreaseLikes: PropTypes.func,
    changeIsChecked: PropTypes.func
  }).isRequired
};

export default Contact;
