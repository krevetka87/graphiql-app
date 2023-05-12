import { observable } from 'mobx';
import { IntrospectionQuery } from 'graphql';
import { IEditorTypes } from '../types/editor';
import { initValues } from '../constants/editor';

interface IEditorsValueStore {
  values: IEditorTypes;
  schema: IntrospectionQuery | null;
  activeTab: string;
  setValue: (value: string, type: keyof IEditorTypes) => void;
  setSchema: (schema: IntrospectionQuery) => void;
  setActiveTab: (value: string) => void;
}

const editorsStore: IEditorsValueStore = {
  schema: null,
  values: initValues,
  activeTab: 'variables',

  setValue(value, type) {
    this.values[type] = value;
  },

  setSchema(schema) {
    this.schema = schema;
  },
  setActiveTab(tab) {
    this.activeTab = tab;
  },
};

export default observable(editorsStore);
