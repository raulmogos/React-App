import React from 'react';
import PropTypes from 'prop-types';
import {
  MESSAGE_ERROS,
  TITLE,
  PLACEHOLDERS,
  LABELS,
  GET_REGEX,
  MAX_LENGTH_NAME
} from '../../constants/constants';
import { validateInput } from '../../helpers/helper';
import './add-contact-form.style.css';

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

  onFormInputChange = (event) => {
    const { target } = event;
    const { name } = target;
    const newInput = target.value.trim();
    this.setState({
      [name]: newInput,
      [`${name}Error`]: !validateInput(newInput, GET_REGEX[name])
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

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, imageUrl } = this.state;
    const { _addContact } = this.props;
    _addContact({ firstName, lastName, image: imageUrl });
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
        {this.renderErrorMessage()}
        <div className="ui column grid">
          <div className="thirteen wide column">
            <h1 className="ui header center aligned">{TITLE.FORM}</h1>
            <div className="fields">
              <div className={`wide field ${firstNameError && 'error'}`}>
                <label>{LABELS.FIRST_NAME}</label>
                <input
                  maxLength={MAX_LENGTH_NAME}
                  placeholder={PLACEHOLDERS.FIRST_NAME}
                  value={firstName}
                  name="firstName"
                  onChange={this.onFormInputChange}
                />
              </div>
              <div className={`wide field ${lastNameError && 'error'}`}>
                <label>{LABELS.LAST_NAME}</label>
                <input
                  maxLength={MAX_LENGTH_NAME}
                  placeholder={PLACEHOLDERS.LAST_NAME}
                  value={lastName}
                  name="lastName"
                  onChange={this.onFormInputChange}
                />
              </div>
            </div>
            <div className="fields">
              <div className={`wide field ${imageUrlError && 'error'}`}>
                <label>{LABELS.IMAGE}</label>
                <input
                  placeholder={PLACEHOLDERS.URL}
                  value={imageUrl}
                  name="imageUrl"
                  onChange={this.onFormInputChange}
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
      </form>
    );
  }
}

AddContactForm.propTypes = {
  _addContact: PropTypes.func.isRequired
};

export default AddContactForm;