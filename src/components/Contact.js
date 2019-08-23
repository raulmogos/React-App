import React from 'react';
import PropTypes from 'prop-types';
import './Contact.css';
import InLineSpinner from './InLineSpinner';
import Avatar from './Avatar';
import Button from './Button';
import Checkbox from './Checkbox';
import { LIKES } from '../constants/constants';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    const { contact } = this.props;
    this.state = { contact };
  }

  // eslint-disable-next-line class-methods-use-this
  get createFavouriteContactJSX() {
    return <div>getFavouriteContactJSX</div>;
  }

  get createNormalContactJSX() {
    const { contact } = this.state;
    return (
      <div className="ui eight column equal width center aligned grid">
        <div className="column align-middle">
          <Checkbox isChecked={contact.isChecked} action={() => this.changeIsCheckedStatus()} />
        </div>
        <div className="column">
          <Button
            customType="like"
            onClickAction={() => this.increaseLikes()}
            isDisabled={this.isNumberLikesBiggerThanMax()}
          />
        </div>
        <div className="column">
          <div className="ui olive big circular label"> {contact.likes} </div>
        </div>
        <div className="column">
          <Button
            customType="dislike"
            onClickAction={() => this.decreaseLikes()}
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
    const { isFavourite } = this.props;
    const { contact } = this.state;
    if (!contact) return <InLineSpinner />;
    if (isFavourite) return this.createFavouriteContactJSX;
    return this.createNormalContactJSX;
  }

  changeIsCheckedStatus = () => {
    this.setState((prevState) => {
      const contact = { ...prevState.contact };
      contact.isChecked = !contact.isChecked;
      return { contact };
    });
  }

  isNumberLikesBiggerThanMax = () => {
    const { contact } = this.state;
    return contact.likes >= LIKES.MAX;
  }

  increaseLikes = () => {
    if (this.isNumberLikesBiggerThanMax()) return;
    this.setState((prevState) => {
      const contact = { ...prevState.contact };
      contact.likes += 1;
      return { contact };
    });
  }

  isNumberLikesLowerThanMin = () => {
    const { contact } = this.state;
    return contact.likes <= LIKES.MIN;
  }

  decreaseLikes = () => {
    if (this.isNumberLikesLowerThanMin()) return;
    this.setState((prevState) => {
      const contact = { ...prevState.contact };
      contact.likes -= 1;
      return { contact };
    });
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
  isFavourite: PropTypes.bool.isRequired
};

export default Contact;
