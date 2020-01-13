import { createClient, RequestInterceptor, Action } from 'react-fetching-library';
import { buildAxiosFetch } from './utils/buildAxiosFetch';
import axios from 'axios';

require("dotenv-flow").config();

export const requestHostInterceptor : RequestInterceptor = (client : any) => (async (action :  Action) => ({
    ...action,
    endpoint: `${process.env.REACT_APP_API_URL}${action.endpoint}`,
}));

export default createClient({
  requestInterceptors: [requestHostInterceptor],
  responseInterceptors: [],
  fetch: buildAxiosFetch(axios),
  // cacheProvider: cacheProvider,
});
