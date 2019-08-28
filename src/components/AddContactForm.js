import React from 'react';
import PropTypes from 'prop-types';

class AddContactForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { firstName: '', lastName: '', imageUrl: '' };
  }

  onFirstNameInputChange = (event) => {
    const { target } = event;
    this.setState({ firstName: target.value.trim() });
  }

  onLastNameInputChange = (event) => {
    const { target } = event;
    this.setState({ lastName: target.value.trim() });
  }

  onImageUrlInputChange = (event) => {
    const { target } = event;
    this.setState({ imageUrl: target.value.trim() });
  }

  isButtonDisabled = () => {
    const { firstName, lastName, imageUrl } = this.state;
    return !(firstName && lastName && imageUrl);
  }

  handleSubmit = (event) => {
    const { firstName, lastName, imageUrl } = this.state;
    const { onSubmitAction } = this.props;
    event.preventDefault();
    onSubmitAction(firstName, lastName, imageUrl);
    this.setState({ firstName: '', lastName: '', imageUrl: '' });
  }

  render() {
    const { firstName, lastName, imageUrl } = this.state;
    return (
      <div className="ui three column grid">
        
        <div className="thirteen wide column">

          <div className="ui equal width form">

            <div className="inline fields">

              <div className="wide field">
                <label>Name</label>
                <input
                  className="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={this.onFirstNameInputChange}
                />
              </div>

              <div className="wide field">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={this.onLastNameInputChange}
                />
              </div>

            </div>

            <div className="inline fields">

              <div className="wide field">
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

        <div className="three wide column" style={{ textAlign: 'center' }}>

          <button
            className="ui submit massive button"
            style={{ marginTop: '15px' }}
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
