import { GraphQLField, GraphQLFieldMap, GraphQLInputFieldMap, GraphQLSchema } from 'graphql';

import { action, makeObservable, observable } from 'mobx';
import { getGraphQLSchema } from '../api/api';

interface OpenState {
  query: boolean;
  queryFields: boolean;
  queryField: boolean;
}

class SchemaStore {
  schema: GraphQLSchema | null = null;

  defaultOpened: OpenState = {
    query: false,
    queryFields: false,
    queryField: false,
  };

  queryFields: GraphQLFieldMap<unknown, unknown> | GraphQLInputFieldMap | null = null;

  queryField: GraphQLField<unknown, unknown> | null = null;

  headerText = 'Docs';

  opened: OpenState = { ...this.defaultOpened, query: true };

  constructor() {
    makeObservable(this, {
      schema: observable,
      defaultOpened: observable,
      queryFields: observable,
      queryField: observable,

      headerText: observable,

      opened: observable,

      loadSchema: action,

      setQueryFields: action,

      setHeaderText: action,
    });
  }

  async loadSchema() {
    const schema = await getGraphQLSchema();
    this.schema = schema || null;
  }

  setQueryFields(fields: GraphQLFieldMap<unknown, unknown> | GraphQLInputFieldMap | null) {
    this.queryFields = fields;
  }

  setSelectedQueryField(field: GraphQLField<unknown, unknown> | null) {
    this.queryField = field;
  }

  setOpenState(key: string) {
    this.opened = { ...this.defaultOpened, [key]: true };
  }

  setHeaderText(text: string) {
    this.headerText = text;
  }
}

export default SchemaStore;
