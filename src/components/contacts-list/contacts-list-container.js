import { connect } from 'react-redux';
import { fetchContacts, fetchFavourites } from '../../actions';
import ContactsList from './ContactsList';

const mapStateToProps = state => ({
  contacts: Object.values(state.data.contacts),
  favourites: state.data.favourites
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(fetchContacts()),
  fetchFavourites: () => dispatch(fetchFavourites())
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
