import React from 'react';
import PropTypes from 'prop-types';
import InLineSpinner from './InLineSpinner';
import Avatar from './Avatar';
import Button from './Button';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contact: null };
  }

  componentDidMount() {
    const { contact } = this.props;
    this.setState({ contact });
  }

  // eslint-disable-next-line class-methods-use-this
  get getFavouriteContactFSX() {
    return (
      <div>getFavouriteContactFSX</div>
    );
  }

  get getNormalContactJSX() {
    const { contact } = this.state;
    return (
      <div className="ui eight column equal width center aligned grid">
        
        <div className="column">
          <Button customType="like" />
        </div>

        <div className="column">
          <div className="ui olive big circular label">
            {contact.likes}
          </div>
        </div>

        <div className="column">
          <Button customType="dislike" />
        </div>

        <div className="column">
          <Avatar image={contact.image} />
        </div>

        <div className="column">
          <div className="ui olive large label "> {contact.firstName} </div>
        </div>
        <div className="column">
          <div className="ui label "> {contact.lastName} </div>
        </div>
      </div>
    );
  }
  
  get getAppropriateJSX() {
    const { contact } = this.state;
    const { isFavourite } = this.props;
    if (!contact) return <InLineSpinner />;
    if (isFavourite) return this.getFavouriteContactFSX;
    return this.getNormalContactJSX;
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
