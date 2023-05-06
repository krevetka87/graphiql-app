import { observable } from 'mobx';
import { IEditorTypes } from '../types/editor';

interface IEditorsValueStore {
  values: IEditorTypes;
  setValue: (value: string, type: keyof IEditorTypes) => void;
}

const editorsValueStore: IEditorsValueStore = {
  values: {
    query: `# Welcome to GraphiQL
#
# It is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Query example:
#
query($id: ID!) {
  character(id: $id){
    name
    gender
  }
}
`,
    variables: '{ }',
    headers: '',
    result: '',
  },

  setValue(value, type) {
    this.values[type] = value;
  },
};

export default observable(editorsValueStore);
