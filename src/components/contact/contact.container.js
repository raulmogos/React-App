import { connect } from 'react-redux';
import Contact from './contact.component';
import {
  changeIsChecked,
  deleteContact,
  increaseLikes,
  decreaseLikes,
  fetchFavourites
} from '../../actions';

const mapStateToProps = (state, ownProps) => ({
  contact: state.contactsData.contacts.find(x => x.id === ownProps.id)
});

const mapDispatchToProps = dispatch => ({
  _increaseLikes: (id) => {
    dispatch(increaseLikes(id));
    dispatch(fetchFavourites());
  },
  _decreaseLikes: (id) => {
    dispatch(decreaseLikes(id));
    dispatch(fetchFavourites());
  },
  _deleteContact: (id) => {
    dispatch(deleteContact(id));
    dispatch(fetchFavourites());
  },
  _changeIsChecked: id => dispatch(changeIsChecked(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
