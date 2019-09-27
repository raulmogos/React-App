import faker from 'faker';
import { generateId } from '../helpers/helper';
import { DEFAULT_NUMBER_OF_CONTACTS } from '../constants/constants';

const generateImage = faker.image.avatar;
const generateFirstName = faker.name.firstName;
const generateLastName = faker.name.lastName;

const ramdomData = (number) => {
  const data = [];
  for (let i = 0; i < number; i++) {
    data.push({
      id: generateId(),
      firstName: generateFirstName(),
      lastName: generateLastName(),
      image: generateImage(),
      likes: Math.floor(Math.random() * 10),
      isChecked: Boolean(Math.floor(Math.random() * 10) % 2)
    });
  }
  return data;
};

export default ramdomData(DEFAULT_NUMBER_OF_CONTACTS);
