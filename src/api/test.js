import axios from 'axios';
import apiConfig from 'webpack-config-loader!../config';

const instance = axios.create({
  baseURL: apiConfig.apiBase,
  headers: {
  },
});

export default instance;
