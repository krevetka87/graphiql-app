import axios from 'axios';
import { parse, print } from 'graphql';
import { buildClientSchema, getIntrospectionQuery } from 'graphql/utilities';

export async function getGraphQLSchema() {
  try {
    const response = await axios.post('https://rickandmortyapi.com/graphql', {
      query: print(parse(getIntrospectionQuery())),
    });
    const schema = buildClientSchema(response.data.data);
    return schema;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

export async function sendGraphQLQuery(query: string) {
  const response = await fetch('https://rickandmortyapi.com/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
    credentials: 'same-origin',
  });

  const data = await response.json();
  return data;
}
