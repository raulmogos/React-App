import { connect } from 'react-redux';
import AddContactForm from './AddContactForm';
import { addContact } from '../../actions';

const mapDispatchToProps = dispatch => ({
  _addContact: formValues => dispatch(addContact(formValues))
});

export default connect(null, mapDispatchToProps)(AddContactForm);
