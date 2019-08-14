import React from 'react';
import { Link } from 'react-router-dom';

import { NAV } from '../constants/constants';


function Menu() {
  return (
    <div className="ui two item menu">
      <Link to={NAV.HOME} className="item">Home</Link>
      <Link to={NAV.CONTACTS} className="item">Contacts</Link>
    </div>
  );
}

export default Menu;
