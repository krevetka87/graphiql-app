type TParsedJson = { [key: string]: string };

interface IGraphQLRequest {
  query: string | undefined;
  variables?: TParsedJson | string;
  headers?: TParsedJson | string;
}

export type { IGraphQLRequest, TParsedJson };
