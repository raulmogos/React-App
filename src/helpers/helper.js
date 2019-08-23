import { TOP } from '../constants/constants';

// id generator
// returns a string
export const generateUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}-${s4()}-${s4()}-${s4()}`;
};

// refactor here
export const getFavouritesList = (array) => {
  const favourites = [...array];
  // sort by likes
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

  let k = 1;
  const ret = {};
  
  Object.keys(favsMap)
    .map(x => Number(x))
    .sort((a, b) => b - a)
    .forEach((item, index) => {
      if (index >= TOP) return;
      ret[k] = favsMap[item];
      // sort by name
      k += 1;
    });

  let result = [];
  for (let i = 1; i <= TOP; i++) {
    if (!Object.keys(ret).find(x => Number(x) === i)) break;
    result = result.concat(ret[i]);
  }

  return result;
};
