import { Uri, editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Files } from '../constants/editor';
import { getQueryResult } from '../api/queryApi';
import { TEditor, TEditorModel, TEditorOptions } from '../types/editor';

const getEditorModel = (uri: string, value: string, language: string): TEditorModel => {
  return editor.getModel(Uri.file(uri)) ?? editor.createModel(value, language, Uri.file(uri));
};

const createEditor = (
  element: HTMLDivElement,
  model: TEditorModel,
  options: TEditorOptions
): TEditor => {
  return editor.create(element, {
    model,
    ...options,
  });
};

const handleRequest = async () => {
  const queryModelValue: string | undefined = editor
    .getModel(Uri.file(`${Files.query}`))
    ?.getValue();

  const varModelValue: string | undefined = editor
    .getModel(Uri.file(`${Files.variables}`))
    ?.getValue();

  const resultModel: TEditorModel | null = editor.getModel(Uri.file(`${Files.result}`));

  const response = await getQueryResult({
    query: queryModelValue,
    variables: varModelValue ? JSON.parse(varModelValue) : {},
  });

  resultModel?.setValue(JSON.stringify(response, null, '\t'));
};

export { getEditorModel, createEditor, handleRequest };
