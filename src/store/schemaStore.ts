import { GraphQLSchema } from 'graphql';

import { action, makeObservable, observable } from 'mobx';
import { getGraphQLSchema } from '../api/api';

interface OpenState {
  query: boolean;
}

class SchemaStore {
  schema: GraphQLSchema | null = null;

  defaultOpened: OpenState = {
    query: false,
  };

  headerText = 'Docs';

  opened: OpenState = { ...this.defaultOpened, query: true };

  constructor() {
    makeObservable(this, {
      schema: observable,
      defaultOpened: observable,

      headerText: observable,

      opened: observable,

      loadSchema: action,
    });
  }

  async loadSchema() {
    const schema = await getGraphQLSchema();
    this.schema = schema || null;
  }
}

export default SchemaStore;
