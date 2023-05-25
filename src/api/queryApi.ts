import axios, { AxiosResponse } from 'axios';
import { URL } from '../constants/common';
import { GraphQLRequest } from '../types/api.types';

const getQueryResult = async (requestData: GraphQLRequest): Promise<AxiosResponse> => {
  const { query, variables } = requestData;
  let { headers } = requestData;

  if (typeof headers === 'string') {
    headers = {};
  }

  return axios.post(
    URL,
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
