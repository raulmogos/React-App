/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import PropTypes from 'prop-types';
import InLineSpinner from './InLineSpinner';


class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contact: null };
  }

  componentDidMount() {
    const { contact } = this.props;
    this.setState({ contact });
  }
  
  get desiredItems() {
    const { contact } = this.state;
    console.log(contact);
    if (!contact) return <InLineSpinner />;
    return (
      <div>
        
        <button className="circular ui icon button" type="button">
          <i className="icon thumbs up" />
        </button>

        <div className="ui olive large circular label">
          {contact.likes}
        </div>

        <button className="circular ui icon button" type="button">
          <i className="icon thumbs down" />
        </button>

        <img className="ui avatar image" alt="" />

        <div className="ui olive label "> {contact.firstName} </div>
        <div className="ui label "> {contact.lastName} </div>

      </div>
    );
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
