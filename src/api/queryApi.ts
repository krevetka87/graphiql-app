import axios, { AxiosError, AxiosResponse } from 'axios';
import { Endpoints, baseURL } from '../constants/url';
import { IGraphQLRequest } from '../types/api';

const getQueryResult = async (requestData: IGraphQLRequest): Promise<unknown> => {
  const { query, variables } = requestData;
  let { headers } = requestData;

  if (typeof headers === 'string') {
    headers = {};
  }

  return axios
    .post(
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
    )
    .then((data: AxiosResponse) => data.data)
    .catch((err: AxiosError) => err.response?.data);
};

export { getQueryResult };
