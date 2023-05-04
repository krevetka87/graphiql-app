import { observable } from 'mobx';

interface IEditorsValueStore {
  queryValue: string;
  variablesValue: string;
  resultValue: string;
  setQueryValue: (value: string) => void;
  setVariablesValue: (value: string) => void;
  setResultEditor: (value: string) => void;
}

const editorsValueStore: IEditorsValueStore = {
  queryValue: `# Welcome to GraphiQL
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
  variablesValue: '{ }',
  resultValue: '',

  setQueryValue(value) {
    this.queryValue = value;
  },

  setVariablesValue(value) {
    this.variablesValue = value;
  },

  setResultEditor(value) {
    this.resultValue = value;
  },
};

export default observable(editorsValueStore);
