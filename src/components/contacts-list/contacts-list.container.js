import { connect } from 'react-redux';
import { fetchContacts, fetchFavourites } from '../../actions';
import ContactsList from './contacts-list.component';

const mapStateToProps = state => ({
  contacts: state.contactsData.contacts,
  favourites: state.contactsData.favourites
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContacts()),
  fetchFavourites: () => dispatch(fetchFavourites())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
