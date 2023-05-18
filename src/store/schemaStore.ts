import {
  GraphQLField,
  GraphQLFieldMap,
  GraphQLInputFieldMap,
  GraphQLScalarType,
  GraphQLSchema,
} from 'graphql';

import { action, makeObservable, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import { getGraphQLSchema } from '../api/schemaApi';

interface HistoryState {
  queryFields: GraphQLFieldMap<unknown, unknown> | GraphQLInputFieldMap | null;
  queryField: GraphQLField<unknown, unknown> | null;
  scalarType: GraphQLScalarType<unknown, unknown> | null;
  typeName: string;
  headerText: string;
  backText: string;
  opened: OpenState;
}

interface OpenState {
  query: boolean;
  queryFields: boolean;
  queryField: boolean;
  scalarType: boolean;
  typeName: boolean;
}

class SchemaStore {
  schema: GraphQLSchema | null = null;

  isSchemaLoading = false;

  isSchemaError = false;

  defaultOpened: OpenState = {
    query: false,
    queryFields: false,
    queryField: false,
    scalarType: false,
    typeName: false,
  };

  queryFields: GraphQLFieldMap<unknown, unknown> | GraphQLInputFieldMap | null = null;

  queryField: GraphQLField<unknown, unknown> | null = null;

  scalarType: GraphQLScalarType<unknown, unknown> | null = null;

  typeName = '';

  headerText = 'Docs';

  backText = 'Docs';

  opened: OpenState = { ...this.defaultOpened, query: true };

  history: HistoryState[] = [];

  constructor() {
    makeObservable(this, {
      schema: observable,
      isSchemaLoading: observable,
      defaultOpened: observable,
      queryFields: observable,
      queryField: observable,
      scalarType: observable,
      typeName: observable,
      headerText: observable,
      backText: observable,
      opened: observable,
      history: observable,

      loadSchema: action,
      loadPreviousState: action,
      setQueryFields: action,
      setSelectedQueryField: action,
      setSelectedScalarType: action,
      setSelectedTypeName: action,
      setOpenState: action,
      setHeaderText: action,
      setBackText: action,
      saveStateToHistory: action,
      removeLastStateFromHistory: action,
    });
  }

  async loadSchema() {
    runInAction(() => {
      this.setSchemaLoading(true);
      this.setSchemaError(false);
    });

    try {
      const schema = await getGraphQLSchema();

      runInAction(() => {
        this.schema = schema || null;
      });
    } catch (err) {
      runInAction(() => {
        this.setSchemaError(true);
      });

      toast.error((err as Error).message);
    } finally {
      runInAction(() => {
        this.setSchemaLoading(false);
      });
    }
  }

  setSchemaLoading(value: boolean) {
    this.isSchemaLoading = value;
  }

  setSchemaError(value: boolean) {
    this.isSchemaError = value;
  }

  loadPreviousState(lastAction: HistoryState) {
    this.queryFields = lastAction.queryFields;
    this.scalarType = lastAction.scalarType;
    this.typeName = lastAction.typeName;
    this.queryField = lastAction.queryField;
    this.opened = lastAction.opened;
    this.headerText = lastAction.headerText;
    this.backText = lastAction.backText;
  }

  setQueryFields(fields: GraphQLFieldMap<unknown, unknown> | GraphQLInputFieldMap | null) {
    this.queryFields = fields;
  }

  setSelectedQueryField(field: GraphQLField<unknown, unknown> | null) {
    this.queryField = field;
  }

  setSelectedScalarType(type: GraphQLScalarType<unknown, unknown> | null) {
    this.scalarType = type;
  }

  setSelectedTypeName(typeName: string) {
    this.typeName = typeName;
  }

  setOpenState(key: string) {
    this.opened = { ...this.defaultOpened, [key]: true };
  }

  setHeaderText(text: string) {
    this.headerText = text;
  }

  setBackText(text: string) {
    this.backText = text;
  }

  saveStateToHistory() {
    this.history.push({
      queryFields: this.queryFields,
      scalarType: this.scalarType,
      typeName: this.typeName,
      queryField: this.queryField,
      opened: this.opened,
      headerText: this.headerText,
      backText: this.backText,
    });
  }

  removeLastStateFromHistory() {
    this.history.pop();
  }
}

export default SchemaStore;
