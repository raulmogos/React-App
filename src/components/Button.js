import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import { CUSTOM_TYPES_BUTTONS, STYLE, DEFAULT_BUTTON_TYPE } from '../constants/constants';

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { extraClass: STYLE.BUTTON.standard };
  }

  onButtonHover = () => this.setState({ extraClass: STYLE.BUTTON.hover });

  onButtonLeave = () => this.setState({ extraClass: STYLE.BUTTON.standard });

  render() {
    const { customType, onClickAction, isDisabled } = this.props;
    const { extraClass } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <button
        className={`circular ui icon button ${(isDisabled ? STYLE.BUTTON.disabled : extraClass)} no-margin`}
        type="button"
        onMouseOver={this.onButtonHover}
        onMouseLeave={this.onButtonLeave}
        onClick={onClickAction}
      >
        <i className={CUSTOM_TYPES_BUTTONS[customType]} />
      </button>
    );
  }
}

Button.defaultProps = {
  customType: DEFAULT_BUTTON_TYPE,
  onClickAction: null,
  isDisabled: false
};

Button.propTypes = {
  customType: PropTypes.string,
  onClickAction: PropTypes.func,
  isDisabled: PropTypes.bool
};

export default Button;
