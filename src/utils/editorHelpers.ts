import { Uri, editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { AxiosError, AxiosResponse } from 'axios';
import { Files } from '../constants/editor';
import { getQueryResult } from '../api/queryApi';
import { Editor, EditorModel, EditorOptions } from '../types/editor.types';
import { ParsedJson } from '../types/api.types';
import { schemaStore } from '../store';

const getEditorModel = (uri: string, value: string, language: string): EditorModel => {
  return editor.getModel(Uri.file(uri)) ?? editor.createModel(value, language, Uri.file(uri));
};

const createEditor = (
  element: HTMLDivElement,
  model: EditorModel,
  options: EditorOptions
): Editor => {
  return editor.create(element, {
    model,
    ...options,
  });
};

const disposeEditors = (): void => {
  const editors = editor.getEditors();

  editors.forEach((currentEditor) => {
    currentEditor.dispose();
  });
};

const prettifyQuery = (): void => {
  const editors = editor.getEditors();

  editors.forEach((currentEditor) => {
    const action = currentEditor.getAction('editor.action.formatDocument');
    action?.run().catch((err: Error) => err);
  });
};

const copyQuery = (): void => {
  const queryModelValue = editor.getModel(Uri.file(Files.query))?.getValue();

  if (queryModelValue) {
    navigator.clipboard.writeText(queryModelValue);
  }
};

const refetchSchema = (): void => {
  schemaStore.loadSchema();
};

const parseJSONtoObject = (json: string): ParsedJson | string => {
  try {
    const parsed: ParsedJson = JSON.parse(json);
    return parsed;
  } catch (err) {
    return (err as Error).message;
  }
};

const handleRequest = async (): Promise<void> => {
  const queryModelValue = editor.getModel(Uri.file(Files.query))?.getValue();
  const varModelValue = editor.getModel(Uri.file(Files.variables))?.getValue();
  const headersModelValue = editor.getModel(Uri.file(Files.headers))?.getValue();
  const resultModel = editor.getModel(Uri.file(`${Files.result}`));

  let variables: ParsedJson | string | undefined;
  let headers: ParsedJson | string | undefined;

  if (varModelValue) {
    variables = parseJSONtoObject(varModelValue);

    if (typeof variables === 'string') {
      resultModel?.setValue(`Variables are invalid JSON: ${variables}`);
      return;
    }
  }

  if (headersModelValue) {
    headers = parseJSONtoObject(headersModelValue);

    if (typeof headers === 'string') {
      resultModel?.setValue(`Headers are invalid JSON: ${headers}`);
      return;
    }
  }
  await getQueryResult({
    query: queryModelValue,
    variables,
    headers,
  })
    .then((res: AxiosResponse) => {
      resultModel?.setValue(JSON.stringify(res.data, null, '\t'));
    })
    .catch((err: AxiosError) => {
      if (err.response?.status === 400) {
        resultModel?.setValue(JSON.stringify(err.response?.data, null, '\t'));
      } else {
        resultModel?.setValue('');
        throw new Error(`${err.message}${err.response?.data ? `: ${err.response?.data}` : ''}`);
      }
    });
};

export {
  getEditorModel,
  createEditor,
  handleRequest,
  prettifyQuery,
  copyQuery,
  disposeEditors,
  refetchSchema,
};
