import { connect } from 'react-redux';
import { fetchContacts } from '../../actions';
import ContactsList from './ContactsList';

function mapStateToProps(state) {
  return {
    contacts: state.contacts
  };
}

export default connect(mapStateToProps, { fetchContacts })(ContactsList);
