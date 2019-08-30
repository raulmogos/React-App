import faker from 'faker';

const generateImage = faker.image.avatar;
const generateFirstName = faker.name.firstName;
const generateLastName = faker.name.lastName;
const generateId = faker.random.uuid;

const data = [];

const ramdomData = (number) => {
  for (let i = 0; i < number; i++) {
    data.push({
      id: generateId(),
      firstName: generateFirstName(),
      lastName: generateLastName(),
      image: generateImage(),
      likes: 0,
      isChecked: false
    });
  }
};

ramdomData(10);

export default data;
