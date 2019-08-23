import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import ContactsPage from './ContactsPage';
import Header from './Header';
import Menu from './Menu';
import { NAV } from '../constants/constants';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Menu />
          <Route path={NAV.HOME} exact component={Home} />
          <Route path={NAV.CONTACTS} component={ContactsPage} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
