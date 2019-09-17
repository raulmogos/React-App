import { connect } from 'react-redux';
import { fetchContacts, fetchFavourites } from '../../actions';
import ContactsList from './ContactsList';

function mapStateToProps(state) {
  return {
    contacts: state.data.contacts,
    favourites: state.data.favourites
  };
}

export default connect(mapStateToProps, { fetchContacts, fetchFavourites })(ContactsList);
