import axios, { AxiosResponse } from 'axios';
import { Endpoints, baseURL } from '../constants/url';
import { IGraphQLRequest } from '../types/api';

const getQueryResult = async (requestData: IGraphQLRequest): Promise<AxiosResponse> => {
  const { query, variables } = requestData;
  let { headers } = requestData;

  if (typeof headers === 'string') {
    headers = {};
  }

  return axios.post(
    `${baseURL}${Endpoints.graphql}`,
    {
      query,
      variables,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    }
  );
};

export { getQueryResult };
