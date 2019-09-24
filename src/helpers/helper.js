import faker from 'faker';
import { TOP } from '../constants/constants';

export const generateId = faker.random.uuid;

export const validateInput = (input, regex) => (input ? regex.test(input) : true);

export const getFavouritesList = (contactsList) => {
  const favourites = contactsList.filter(contact => contact.likes);
  // sort by likes
  favourites.sort((c1, c2) => c2.likes - c1.likes);
  const favsMap = {};
  // construct the favs map
  favourites.forEach((item) => {
    const { likes } = item;
    if (!favsMap[likes]) {
      favsMap[likes] = [];
    }
    favsMap[likes].push(item);
  });
  let rank = 1;
  const rankMap = {};
  // construct the rank map
  Object.keys(favsMap)
    .map(x => Number(x))
    .sort((a, b) => b - a)
    .forEach((key, index) => {
      if (index >= TOP) {
        return;
      }
      rankMap[rank] = favsMap[key].sort((c1, c2) => {
        const fullName1 = c1.firstName + c1.lastName;
        const fullName2 = c2.firstName + c2.lastName;
        return fullName1 > fullName2 ? 1 : -1;
      });
      rank += 1;
    });
  let result = [];
  for (let i = 1; i <= TOP; i++) {
    // check if i is in rankMap keys
    if (!Object.keys(rankMap).find(x => Number(x) === i)) {
      break;
    }
    result = result.concat(rankMap[i]);
  }
  return result;
};

const areContactsEqual = (c1, c2) => `${c1.firstName}${c1.lastName}` === `${c2.firstName}${c2.lastName}`
  || c1.image === c2.image;

export const isContactUnique = (contactsList, contact) => !contactsList.some(c => areContactsEqual(c, contact));

export const getRandomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min) + min);
