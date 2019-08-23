import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { CUSTOM_TYPES_BUTTONS, STYLE } from '../constants/constants';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { style: STYLE.BUTTON.standard };
  }

  onButtonHover = () => this.setState({ style: STYLE.BUTTON.hover });

  onButtonLeave = () => this.setState({ style: STYLE.BUTTON.standard });

  render() {
    const { customType } = this.props;
    const { style } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <button
        className={`${style} no-margin`}
        type="button"
        onMouseOver={this.onButtonHover}
        onMouseLeave={this.onButtonLeave}
      >
        <i className={CUSTOM_TYPES_BUTTONS[customType]} />
      </button>
    );
  }
}

Button.defaultProps = {
  customType: 'standard'
};

Button.propTypes = {
  customType: PropTypes.string
};

export default Button;
