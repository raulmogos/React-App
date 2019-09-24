import faker from 'faker';
import { generateId } from '../helpers/helper';

const generateImage = faker.image.avatar;
const generateFirstName = faker.name.firstName;
const generateLastName = faker.name.lastName;

const data = [];

const ramdomData = (number) => {
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
};

ramdomData(10);

export default data;
