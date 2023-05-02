import { editor } from 'monaco-editor';

type TEditor = editor.IStandaloneCodeEditor;
type TEditorOptions = Partial<editor.IStandaloneEditorConstructionOptions>;
type TEditorModel = editor.ITextModel;

export type { TEditor, TEditorModel, TEditorOptions };
