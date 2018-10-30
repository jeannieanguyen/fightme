import axios from 'axios';

const UFC_BASE_URL =
  'https://cors-anywhere.herokuapp.com/http://ufc-data-api.ufc.com/api/v3/us';

export const getFighters = () => axios.get(`${UFC_BASE_URL}/fighters`);
export const getChampions = () =>
  axios.get(`${UFC_BASE_URL}/fighters/title_holders`);
