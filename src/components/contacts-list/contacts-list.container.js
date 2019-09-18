import { connect } from 'react-redux';
import { fetchContacts } from '../../actions';
import ContactsList from './contacts-list';

const mapStateToProps = state => ({
  contacts: Object.values(state.data.contacts)
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
