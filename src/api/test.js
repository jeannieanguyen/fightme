import axios from 'axios';
import apiConfig from 'webpack-config-loader!../config'; 

let instance = axios.create({
  baseURL: apiConfig.apiBase,
  headers: { 
  }
});

export default instance;
