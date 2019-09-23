import { connect } from 'react-redux';
import Contact from './contact.component';
import {
  changeIsChecked,
  deleteContact,
  increaseLikes,
  decreaseLikes,
  fetchFavourites
} from '../../actions';

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

export default connect(null, mapDispatchToProps)(Contact);
