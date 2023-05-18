import axios from 'axios';
import { parse, print } from 'graphql';
import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';
import { URL } from '../constants/common';

export async function getGraphQLSchema() {
  try {
    const response = await axios.post(URL, {
      query: print(parse(getIntrospectionQuery())),
    });
    const schema = buildClientSchema(response.data.data);
    return schema;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}
