import React from 'react';
import ContactsList from './ContactsList';
import data from '../data/data';
import InLineSpinner from './InLineSpinner';
import { TITLE } from '../constants/constants';

class ContactsPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contacts: [] };
  }

  componentDidMount() {
    this.setState({ contacts: [...data] });
  }

  changeIsChecked(id) {
    const { contacts } = this.state;
    const contact = contacts.find(item => item.id === id);
    contact.isChecked = !contact.isChecked;
    this.setState({ contacts });
  }

  updateLikes(id, step) {
    const { contacts } = this.state;
    contacts.find(item => item.id === id).likes += step;
    this.setState({ contacts });
  }

  renderContactsPage() {
    const { contacts } = this.state;
    if (!contacts.length) return <InLineSpinner />;
    return (
      <div className="ui two column stackable center aligned grid">
        <div className="column">
          <ContactsList
            contactsList={contacts}
            title={TITLE.CONTACTS}
            contactMethods={{
              updateLikes: (id, step) => this.updateLikes(id, step),
              changeIsChecked: id => this.changeIsChecked(id)
            }}
          />
        </div>
        <div className="column">
          <ContactsList title={TITLE.FAVOURITES} />
        </div>
      </div>
    );
  }

  render() {
    return this.renderContactsPage();
  }
}

export default ContactsPage;
