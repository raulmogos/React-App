import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {

  get getAppropriateJSX() {
    const { isChecked } = this.props;
    if (!isChecked) return <i className="circle icon" style={{ margin: '0 auto', display: 'center' }} />;
    return <i className="check icon" style={{ margin: '0 auto' }} />;
  }

  render() {
    const { action } = this.props;
    return (
      <div className="ui olive circular label" onClick={action}>
        {this.getAppropriateJSX}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  isChecked: false,
  action: null
};

Checkbox.propTypes = {
  isChecked: PropTypes.bool,
  action: PropTypes.func
};

export default Checkbox;
