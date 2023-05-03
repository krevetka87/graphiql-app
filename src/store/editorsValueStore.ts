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
  queryValue: 'query { }',
  variablesValue: '{ }',
  resultValue: '',

  setQueryValue(value: string) {
    this.queryValue = value;
  },

  setVariablesValue(value: string) {
    this.variablesValue = value;
  },

  setResultEditor(value: string) {
    this.resultValue = value;
  },
};

export default observable(editorsValueStore);
