type TVariables = { [key: string]: string | number };

interface IGraphQLRequest {
  query: string | undefined;
  variables?: TVariables | string;
}

export type { IGraphQLRequest, TVariables };
