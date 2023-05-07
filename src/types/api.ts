type TVariables = { [key: string]: string | number };

interface IGraphQLRequest {
  query: string | undefined;
  variables?: TVariables | string;
  headers?: TVariables | string;
}

export type { IGraphQLRequest, TVariables };
