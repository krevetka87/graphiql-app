import { editor } from 'monaco-editor';

type TEditor = editor.IStandaloneCodeEditor;
type TEditorOptions = Partial<editor.IStandaloneEditorConstructionOptions>;
type TEditorModel = editor.ITextModel;

interface IEditorTypes {
  query: string;
  variables: string;
  headers: string;
  result: string;
}

export type { TEditor, TEditorModel, TEditorOptions, IEditorTypes };
