import React from 'react';
import PropTypes from 'prop-types';
import { CUSTOM_TYPES_BUTTONS } from '../constants/constants';

const configStyle = {
  standard: 'circular black ui icon button',
  hover: 'circular olive ui icon button'
};

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { style: configStyle.standard };
  }

  onButtonHover = () => {
    this.setState({ style: configStyle.hover });
  }

  onButtonLeave = () => {
    this.setState({ style: configStyle.standard });
  }

  render() {
    const { customType } = this.props;
    const { style } = this.state;
    return (
      // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
      <button
        className={style}
        style={{ margin: '0' }}
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
