import React from 'react';
import PropTypes from 'prop-types';
import InLineSpinner from './InLineSpinner';
import Avatar from './Avatar';
import Button from './Button';
import Checkbox from './Checkbox';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    const { contact } = this.props;
    this.state = { contact };
  }

  // eslint-disable-next-line class-methods-use-this
  get createFavouriteContactFSX() {
    return (
      <div>getFavouriteContactFSX</div>
    );
  }

  get createNormalContactJSX() {
    const { contact } = this.state;
    return (
      <div className="ui eight column equal width center aligned grid">
        <div className="column" style={{ margin: 'auto' }}>
          <Checkbox isChecked={contact.isChecked} action={() => this.changeIsCheckedStatus()} />
        </div>
        <div className="column"> <Button customType="like" /> </div>
        <div className="column">
          <div className="ui olive big circular label"> {contact.likes} </div>
        </div>
        <div className="column"> <Button customType="dislike" /> </div>
        <div className="column"> <Avatar image={contact.image} /> </div>
        <div className="column" style={{ margin: 'auto' }}>{ contact.firstName }</div>
        <div className="column" style={{ margin: 'auto' }}>{ contact.lastName }</div>
        <div className="column"> <Button customType="trash" /> </div>
      </div>
    );
  }
  
  get getAppropriateJSX() {
    const { isFavourite } = this.props;
    const { contact } = this.state;
    if (!contact) return <InLineSpinner />;
    if (isFavourite) return this.createFavouriteContactFSX;
    return this.createNormalContactJSX;
  }

  changeIsCheckedStatus() {
    console.log('yas');
    this.setState((prevState) => {
      const contact = { ...prevState.contact };
      contact.isChecked = !contact.isChecked;
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
