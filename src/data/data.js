import faker from 'faker';
import {
  generateUniqueID
} from '../helpers/helper';

const generateImage = faker.image.avatar;
const generateFirstName = faker.name.firstName;
const generateLastName = faker.name.lastName;

// const data2 = [{
//   id: generateUniqueID(),
//   firstName: 'Alin',
//   lastName: 'Ionescu',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// },
// {
//   id: generateUniqueID(),
//   firstName: 'Leona',
//   lastName: 'Sherman',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// },
// {
//   id: generateUniqueID(),
//   firstName: 'Annette',
//   lastName: 'Carlson',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// },
// {
//   id: generateUniqueID(),
//   firstName: 'Ervin',
//   lastName: 'Watkins',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// },
// {
//   id: generateUniqueID(),
//   firstName: 'Philip',
//   lastName: 'Pope',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// },
// {
//   id: generateUniqueID(),
//   firstName: 'Viorel',
//   lastName: 'Popescu',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// },
// {
//   id: generateUniqueID(),
//   firstName: 'Elon',
//   lastName: 'Musk',
//   image: generateImage(),
//   likes: 0,
//   isChecked: false
// }];

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
