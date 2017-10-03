import { Observable } from 'rxjs'; 
import apiConfig from 'webpack-config-loader!../config'; 

export const socket$ = Observable.webSocket(apiConfig.socketUrl);
