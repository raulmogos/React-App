import React from 'react';
import PropTypes from 'prop-types';
import { REGEX, MESSAGE_ERROS, TITLE } from '../constants/constants';
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
    this.setState({
      firstName: newFirstName,
      firstNameError: !validateInput(newFirstName, REGEX.NAME)
    });
  }

  onLastNameInputChange = (event) => {
    const { target } = event;
    const newLastName = target.value.trim();
    this.setState({
      lastName: newLastName,
      lastNameError: !validateInput(newLastName, REGEX.NAME)
    });
  }

  onImageUrlInputChange = (event) => {
    const { target } = event;
    const newImageUrl = target.value.trim();
    this.setState({
      imageUrl: newImageUrl,
      imageUrlError: !validateInput(newImageUrl, REGEX.URL)
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
    if (!(firstNameError || lastNameError || imageUrlError)) {
      return null;
    }
    return (
      <div className="ui error message">
        <div className="header">{MESSAGE_ERROS.title}</div>
        <ul className="list">
          {firstNameError && <li>{MESSAGE_ERROS.firstNameErrorMessage}</li>}
          {lastNameError && <li>{MESSAGE_ERROS.lastNameErrorMessage}</li>}
          {imageUrlError && <li>{MESSAGE_ERROS.imageUrlErrorMessage}</li>}
        </ul>
      </div>
    );
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
      <form className="ui equal width error form" onSubmit={this.handleSubmit}>
        <div className="ui column grid">
          <div className="thirteen wide column">
            <h1 className="ui header center aligned">{TITLE.FORM}</h1>
            <div className="inline fields">
              <div className={`wide field ${firstNameError && 'error'}`}>
                <label>First Name</label>
                <input
                  maxLength="40"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.onFirstNameInputChange}
                />
              </div>
              <div className={`wide field ${lastNameError && 'error'}`}>
                <label>Last Name</label>
                <input
                  maxLength="40"
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
                  placeholder="url"
                  value={imageUrl}
                  onChange={this.onImageUrlInputChange}
                />
              </div>
            </div>
          </div>
          <div className="align-center">
            <div className="three wide column">
              <button
                className="ui submit massive button"
                disabled={this.isButtonDisabled()}
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        {this.renderErrorMessage()}
      </form>
    );
  }
}

AddContactForm.propTypes = {
  onSubmitAction: PropTypes.func.isRequired
};

export default AddContactForm;
