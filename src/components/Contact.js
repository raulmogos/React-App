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

  get composeFavourite() {
    return (
      <div>{this.isFavourite}</div>
    );
  }

  get composeNormal() {
    const { contact } = this.state;
    return (
      <div className="ui eight column stackable center aligned grid">
        
        <div className="column">
          <Button customType="like" />
        </div>

        <div className="column">
          <div className="ui olive large circular label">
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
          <div className="ui olive label "> {contact.firstName} </div>
        </div>
        <div className="column">
          <div className="ui label "> {contact.lastName} </div>
        </div>
      </div>
    );
  }
  
  get desiredItems() {
    const { contact } = this.state;
    const { isFavourite } = this.props;
    if (!contact) return <InLineSpinner />;
    if (isFavourite) return this.composeFavourite;
    return this.composeNormal;
  }

  render() {
    return (
      <div className="ui olive segment">
        {this.desiredItems}
      </div>
    );
  }
}

Contact.defaultProps = {
  contact: {
    id: 'no id',
    firstName: 'no first name',
    lastName: 'no last name',
    image: 'no image',
    likes: -1,
    isChecked: false
  },
  isFavourite: false
};

Contact.propTypes = {
  contact: PropTypes.exact({
    id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    isChecked: PropTypes.bool
  }),
  isFavourite: PropTypes.bool
};

export default Contact;
