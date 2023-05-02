interface IGraphQLRequest {
  query: string | undefined;
  variables: { [key: string]: string | number };
}

export type { IGraphQLRequest };
