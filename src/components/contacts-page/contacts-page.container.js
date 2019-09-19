import { connect } from 'react-redux';
import ContactsPage from './contacts-page.component';
import { deleteSelectedContacts, fetchFavourites, clearContacts } from '../../actions';

const mapStateToProps = state => ({
  contacts: Object.values(state.data.contacts)
});

const mapDispatchToProps = dispatch => ({
  _deleteSelectedContacts: () => {
    dispatch(deleteSelectedContacts());
    dispatch(fetchFavourites());
  },
  _clearContacts: () => {
    dispatch(clearContacts());
    dispatch(fetchFavourites());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage);
