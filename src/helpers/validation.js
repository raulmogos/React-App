import { REGEX } from '../constants/constants';

export const validateName = (name) => {
  const regex = REGEX.NAME;
  if (regex.test(name)) return true;
  return false;
};

export const validateImageUrl = (imageUrl) => {
  const pattern = REGEX.URL;
  if (pattern.test(imageUrl)) return true;
  return false;
};
