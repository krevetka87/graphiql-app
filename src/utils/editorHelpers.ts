import { Uri, editor } from 'monaco-editor/esm/vs/editor/editor.api';
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

// const resizeEditor = (currentEditor: TEditor, parent: HTMLDivElement | null) => {
//   currentEditor.layout({ width: 0, height: 0 });
//   window.requestAnimationFrame(() => {
//     if (parent) {
//       const rect = parent.getBoundingClientRect();
//       currentEditor.layout({ width: rect.width, height: rect.height });
//     }
//   });
// };

const parseJSONtoObject = (json: string): TParsedJson | string => {
  try {
    const str: TParsedJson = JSON.parse(json);
    return str;
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
      resultModel?.setValue(variables);
      return;
    }
  }

  if (headersModelValue) {
    headers = parseJSONtoObject(headersModelValue);

    if (typeof headers === 'string') {
      resultModel?.setValue(headers);
      return;
    }
  }

  const response = await getQueryResult({
    query: queryModelValue,
    variables,
    headers,
  }).catch((err: Error) => {
    return {
      error: err.message,
    };
  });

  resultModel?.setValue(JSON.stringify(response, null, '\t'));
};

export { getEditorModel, createEditor, handleRequest };
