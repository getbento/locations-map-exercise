import React from 'react';
import PropTypes from 'prop-types';

class NavigationButton extends React.Component {
  render() {
    const { active, onClick, text } = this.props;
    const activeStyle = { height: '30px', width: '30px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.9)', marginRight: '15px' };
    const inactiveStyle = { height: '30px', width: '30px', borderRadius: '15px', backgroundColor: 'rgba(255, 255, 255, 0.3)', marginRight: '15px' };
    return (
      <button
        style={active ? activeStyle : inactiveStyle}
        onClick={() => {
          if (active) onClick();
        }}>
        <p style={{ margin: '0' }}>{text}</p>
      </button>
    );
  }
}

NavigationButton.propTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default NavigationButton;
