import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';
import axios, { AxiosResponse } from 'axios';
import { Endpoints, baseURL } from '../constants/url';

const getApiSchema = async (): Promise<IntrospectionQuery> => {
  try {
    const res: AxiosResponse = await axios.post(
      `${baseURL}${Endpoints.graphql}`,
      {
        query: getIntrospectionQuery(),
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const { data } = res.data;
    return data;
  } catch (err) {
    throw new Error((err as Error).message);
  }
};

export default getApiSchema;
