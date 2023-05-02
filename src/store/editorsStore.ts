import { makeAutoObservable, observable } from 'mobx';
import { TEditor } from '../utils/editorHelpers';

// export default class Editors {
//   queryEditor: TEditor | null = null;

//   variablesEditor: TEditor | null = null;

//   resultEditor: TEditor | null = null;

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setQueryEditor(editor: TEditor) {
//     this.queryEditor = editor;
//   }

//   setVariablesEditor(editor: TEditor) {
//     this.variablesEditor = editor;
//   }

//   setResultEditor(editor: TEditor) {
//     this.resultEditor = editor;
//   }
// }

interface IEditorStore {
  queryEditor: TEditor | null;
  variablesEditor: TEditor | null;
  resultEditor: TEditor | null;
  setQueryEditor(editor: TEditor): void;
  setVariablesEditor(editor: TEditor): void;
  setResultEditor(editor: TEditor): void;
}

const editorsStore: IEditorStore = {
  queryEditor: null,
  variablesEditor: null,
  resultEditor: null,

  setQueryEditor(editor: TEditor) {
    this.queryEditor = editor;
  },

  setVariablesEditor(editor: TEditor) {
    this.variablesEditor = editor;
  },

  setResultEditor(editor: TEditor) {
    this.resultEditor = editor;
  },
};

export default observable(editorsStore);
