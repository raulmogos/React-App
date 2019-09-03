import React from 'react';
import PropTypes from 'prop-types';
import { REGEX } from '../constants/constants';
import { validateInput } from '../helpers/helper';
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
    this.setState({ firstName: newFirstName }, () => {
      const { firstName } = this.state;
      this.setState({ firstNameError: !validateInput(firstName, REGEX.NAME) });
    });
  }

  onLastNameInputChange = (event) => {
    const { target } = event;
    const newLastName = target.value.trim();
    this.setState({ lastName: newLastName }, () => {
      const { lastName } = this.state;
      this.setState({ lastNameError: !validateInput(lastName, REGEX.NAME) });
    });
  }

  onImageUrlInputChange = (event) => {
    const { target } = event;
    const newImageUrl = target.value.trim();
    this.setState({ imageUrl: newImageUrl }, () => {
      const { imageUrl } = this.state;
      this.setState({ imageUrlError: !validateInput(imageUrl, REGEX.URL) });
    });
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

  renderErrorMessage() {
    const {
      firstNameError,
      lastNameError,
      imageUrlError
    } = this.state;
    if (firstNameError || lastNameError || imageUrlError) {
      return (
        <div className="ui error message">
          <div className="header">We had some issues</div>
          <ul className="list">
            {firstNameError && <li>Your FIRST NAME has special characters.</li>}
            {lastNameError && <li>Your LAST NAME has special characters.</li>}
            {imageUrlError && <li>Your IMAGE is not an url.</li>}
          </ul>
        </div>
      );
    }
    return null;
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
          <div className="ui equal width error form">
            <h1 className="ui header center aligned">Add Contact</h1>
            <div className="inline fields">
              <div className={`wide field ${firstNameError && 'error'}`}>
                <label>First Name</label>
                <input
                  className="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.onFirstNameInputChange}
                />
              </div>
              <div className={`wide field ${lastNameError && 'error'}`}>
                <label>Last Name</label>
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
            { this.renderErrorMessage() }
          </div>
        </div>
        <div className="align-center">
          <div className="three wide column">
            <button
              className="ui submit massive button"
              disabled={this.isButtonDisabled()}
              type="submit"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

AddContactForm.propTypes = {
  onSubmitAction: PropTypes.func.isRequired
};

export default AddContactForm;
