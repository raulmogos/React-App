import { TOP } from '../constants/constants';

// id generator
// returns a string
export const generateUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}-${s4()}-${s4()}-${s4()}`;
};

export const getFavouritesList = (array) => {
  const favourites = [...array];
  favourites.sort((c1, c2) => c2.likes - c1.likes);
  const favsMap = {};
  favourites.forEach((item) => {
    const { likes } = item;
    if (!likes) return;
    if (!favsMap[likes]) {
      favsMap[likes] = [];
    }
    favsMap[likes].push(item);
  });
  let rank = 1;
  const auxMap = {};
  Object.keys(favsMap)
    .map(x => Number(x))
    .sort((a, b) => b - a)
    .forEach((item, index) => {
      if (index >= TOP) return;
      auxMap[rank] = favsMap[item].sort((c1, c2) => {
        const fullName1 = c1.firstName + c1.lastName;
        const fullName2 = c2.firstName + c2.lastName;
        if (fullName1 > fullName2) return 1;
        return -1;
      });
      rank += 1;
    });
  let result = [];
  for (let i = 1; i <= TOP; i++) {
    if (!Object.keys(auxMap).find(x => Number(x) === i)) break;
    result = result.concat(auxMap[i]);
  }

  return result;
};
