import React from 'react';
import { Link } from 'react-router-dom';
import { NAV } from '../constants/constants';

function Header() {
  return (
    <div className="ui sizer vertical segment">
      <div className="ui segment">
        <Link to={NAV.HOME}>
          <h1 className="ui center aligned header">Contacts App</h1>
        </Link>
      </div>
    </div>
  );
}

export default Header;
