import faker from 'faker';
import {
  generateUniqueID
} from '../helpers/helper';

const generateImage = faker.image.avatar;
const generateFirstName = faker.name.firstName;
const generateLastName = faker.name.lastName;

const data = [];

for (let i = 0; i < 17; i++) {
  data.push({
    id: generateUniqueID(),
    firstName: generateFirstName(),
    lastName: generateLastName(),
    image: generateImage(),
    likes: 0,
    isChecked: false
  });
}

export default data;
