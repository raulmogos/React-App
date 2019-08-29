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

export const TITLE = {
  CONTACTS: 'Contacts',
  FAVOURITES: 'Favourites',
};

export const REGEX = {
  NAME: /^[A-Za-z0-9 ]+$/,
  URL: /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/ // eslint-disable-line
};
