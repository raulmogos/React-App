import React from 'react';
import data from '../data/data';
import List from './List';
import InLineSpinner from './InLineSpinner';


class ContactsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  componentDidMount() {
    this.setState({ contacts: [...data] });
  }
  
  checker() {
    const { contacts } = this.state;
    if (!contacts.length) return <InLineSpinner />;
    return (
      <div>
        <h1 className="ui center aligned header">
          <div className="ui two column stackable center aligned grid">
            <div className="column">
              <List array={contacts} text="Contacts" />
            </div>
            <div className="column">
              <List text="Favourites" />
            </div>
          </div>
        </h1>
      </div>
    );
  }
  
  render() {
    return this.checker();
  }
}

export default ContactsPage;
