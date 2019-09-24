export const NAV = {
  HOME: '/',
  CONTACTS: '/contacts'
};

export const CUSTOM_TYPES_BUTTONS = {
  like: 'icon thumbs up',
  dislike: 'icon thumbs down',
  trash: 'icon trash',
  standard: 'ui button'
};

export const DEFAULT_BUTTON_TYPE = 'standard';

export const LIKES = {
  MAX: 9,
  MIN: 0
};

export const STYLE = {
  BUTTON: {
    standard: 'black',
    disabled: 'disabled',
    hover: 'olive'
  },
  CHECKBOX: {
    checked: 'check black circular icon',
    unchecked: 'circular icon'
  }
};

export const TOP = 3;

export const TITLE = {
  CONTACTS: 'Contacts',
  FAVOURITES: 'Favourites',
  FORM: 'Add Contact'
};

export const REGEX = {
  NAME: /^[A-Za-z0-9 ]+$/,
  URL: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ // eslint-disable-line
};

export const PLACEHOLDERS = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  URL: 'url'
};

export const LABELS = {
  FIRST_NAME: 'First Name',
  LAST_NAME: 'Last Name',
  IMAGE: 'Image'
};

export const MESSAGE_ERROS = {
  title: 'We had some issues',
  firstNameErrorMessage: `Your ${LABELS.FIRST_NAME} has special characters`,
  lastNameErrorMessage: `Your ${LABELS.LAST_NAME} has special characters.`,
  imageUrlErrorMessage: `Your ${LABELS.IMAGE} is not an url.`
};

export const MAX_LENGTH_NAME = '40';

export const GET_REGEX = {
  firstName: REGEX.NAME,
  lastName: REGEX.NAME,
  imageUrl: REGEX.URL
};

export const DEFAULT_IMAGE = 'https://icon-library.net/images/default-profile-icon/default-profile-icon-24.jpg';

export const HEADERS = {
  WAIT_A_SEC: 'Wait a sec ... ',
  ARE_YOU_SURE: 'Are you sure it is not a mistake ?'
};

export const IMAGE_POPUP = 'https://i.kym-cdn.com/photos/images/newsfeed/000/320/060/c38.jpg';

export const APPROVE_FLAGS = {
  CLEAR_LIKES: 'clear likes',
  DELETE_SELECTED: 'delete selected',
  DELETE_ONE: 'delete one'
};

export const WARNING_MESSAGES = {
  CLEAR_LIKES: 'Do you want to clear all these likes ?',
  DELETE_SELECTED: 'Do you want to delete all these contacts ?',
  DELETE_ONE: 'Do you want to delete this contact ?',
  DUPLICATE: 'This is a duplicate contact! Do not do this again!'
};

export const DEFAULT_NUMBER_OF_CONTACTS = 10;
