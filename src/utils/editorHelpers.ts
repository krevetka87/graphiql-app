import { Uri, editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { AxiosError, AxiosResponse } from 'axios';
import { Files } from '../constants/editor';
import { getQueryResult } from '../api/queryApi';
import { TEditor, TEditorModel, TEditorOptions } from '../types/editor';
import { TParsedJson } from '../types/api';

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

const prettifyQuery = (): void => {
  editor.getEditors().forEach((currentEditor) => {
    const action = currentEditor.getAction('editor.action.formatDocument');
    action?.run();
  });
};

const copyQuery = (): void => {
  const queryModelValue = editor.getModel(Uri.file(Files.query))?.getValue();

  if (queryModelValue) {
    navigator.clipboard.writeText(queryModelValue);
  }
};

const parseJSONtoObject = (json: string): TParsedJson | string => {
  try {
    const parsed: TParsedJson = JSON.parse(json);
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

  let variables: TParsedJson | string | undefined;
  let headers: TParsedJson | string | undefined;

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
        throw new Error(err.message);
      }
    });
};

export { getEditorModel, createEditor, handleRequest, prettifyQuery, copyQuery };
