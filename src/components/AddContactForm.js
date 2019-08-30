import React from 'react';
import PropTypes from 'prop-types';
import { validateName, validateImageUrl } from '../helpers/validation';
import './AddContactForm.css';

class AddContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      imageUrl: '',
      firstNameError: false,
      lastNameError: false,
      imageUrlError: false
    };
  }

  onFirstNameInputChange = (event) => {
    const { target } = event;
    const newFirstName = target.value.trim();
    this.setState({ firstName: newFirstName });
    if (newFirstName) {
      this.setState({ firstNameError: !validateName(newFirstName) });
    } else {
      this.setState({ firstNameError: false });
    }
  }

  onLastNameInputChange = (event) => {
    const { target } = event;
    const newLastName = target.value.trim();
    this.setState({ lastName: newLastName });
    if (newLastName) {
      this.setState({ lastNameError: !validateName(newLastName) });
    } else {
      this.setState({ lastNameError: false });
    }
  }

  onImageUrlInputChange = (event) => {
    const { target } = event;
    const newImageUrl = target.value.trim();
    this.setState({ imageUrl: newImageUrl });
    if (newImageUrl) {
      this.setState({ imageUrlError: !validateImageUrl(newImageUrl) });
    } else {
      this.setState({ imageUrlError: false });
    }
  }

  isButtonDisabled = () => {
    const {
      firstName,
      lastName,
      imageUrl,
      firstNameError,
      lastNameError,
      imageUrlError
    } = this.state;
    return !(firstName && lastName && imageUrl) || firstNameError || lastNameError || imageUrlError;
  }

  handleSubmit = () => {
    const { firstName, lastName, imageUrl } = this.state;
    const { onSubmitAction } = this.props;
    onSubmitAction(firstName, lastName, imageUrl);
    this.setState({ firstName: '', lastName: '', imageUrl: '' });
  }

  render() {
    const {
      firstName,
      lastName,
      imageUrl,
      firstNameError,
      lastNameError,
      imageUrlError
    } = this.state;
    return (
      <div className="ui column grid">
        <div className="thirteen wide column">
          <div className="ui equal width form">
            <h1 className="ui header center aligned">Add Contact</h1>
            <div className="inline fields">
              <div className={`wide field ${firstNameError && 'error'}`}>
                <label>Name</label>
                <input
                  className="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.onFirstNameInputChange}
                />
              </div>
              <div className={`wide field ${lastNameError && 'error'}`}>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.onLastNameInputChange}
                />
              </div>
            </div>
            <div className="inline fields">
              <div className={`wide field ${imageUrlError && 'error'}`}>
                <label>Image</label>
                <input
                  className="text"
                  placeholder="url"
                  value={imageUrl}
                  onChange={this.onImageUrlInputChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="three wide column align-center">
          <button
            className="ui submit massive button margin-top"
            disabled={this.isButtonDisabled()}
            type="submit"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

AddContactForm.propTypes = {
  onSubmitAction: PropTypes.func.isRequired
};

export default AddContactForm;
