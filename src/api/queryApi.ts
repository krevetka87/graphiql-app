import axios, { AxiosResponse } from 'axios';
import { Endpoints, baseURL } from '../constants/url';
import { GraphQLRequest } from '../types/api';

const getQueryResult = async (requestData: GraphQLRequest): Promise<AxiosResponse> => {
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
