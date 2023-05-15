type ParsedJson = { [key: string]: string };

interface GraphQLRequest {
  query: string | undefined;
  variables?: ParsedJson | string;
  headers?: ParsedJson | string;
}

export type { GraphQLRequest, ParsedJson };
