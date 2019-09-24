import { connect } from 'react-redux';
import AddContactForm from './add-contact-form.component';
import { addContact } from '../../actions';

const mapStateToProps = state => ({
  contacts: state.contactsData.contacts
});

const mapDispatchToProps = dispatch => ({
  _addContact: formValues => dispatch(addContact(formValues))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddContactForm);
