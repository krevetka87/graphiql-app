import axios, { AxiosResponse } from 'axios';
import { Endpoints, baseURL } from '../constants/url';

interface IRequest {
  query: string | undefined;
  variables: { [key: string]: string | number };
}

const getQueryResult = async (requestData: IRequest): Promise<unknown> => {
  const { query, variables } = requestData;
  try {
    const res: AxiosResponse = await axios.post(`${baseURL}${Endpoints.graphql}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      query,
      variables,
    });
    return res.data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export { getQueryResult };
