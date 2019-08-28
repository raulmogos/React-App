import faker from 'faker';

// id generator
// returns a string
export const generateUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}-${s4()}-${s4()}-${s4()}`;
};

export const generateId = faker.random.uuid;
