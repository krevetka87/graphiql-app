import { editor } from 'monaco-editor';

type Editor = editor.IStandaloneCodeEditor;
type EditorOptions = Partial<editor.IStandaloneEditorConstructionOptions>;
type EditorModel = editor.ITextModel;

interface EditorTypes {
  query: string;
  variables: string;
  headers: string;
  result: string;
}

export type { Editor, EditorModel, EditorOptions, EditorTypes };
