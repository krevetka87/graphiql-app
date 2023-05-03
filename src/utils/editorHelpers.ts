import { Uri, editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { Files } from '../constants/editor';
import { getQueryResult } from '../api/queryApi';
import { TEditor, TEditorModel, TEditorOptions } from '../types/editor';
import { TVariables } from '../types/api';

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

const parseJSONtoObject = (json: string): TVariables | string => {
  try {
    const str: TVariables = JSON.parse(json);
    return str;
  } catch (err) {
    return (err as Error).message;
  }
};

const handleRequest = async (): Promise<void> => {
  const queryModelValue: string | undefined = editor
    .getModel(Uri.file(`${Files.query}`))
    ?.getValue();

  const varModelValue: string | undefined = editor
    .getModel(Uri.file(`${Files.variables}`))
    ?.getValue();

  const resultModel: TEditorModel | null = editor.getModel(Uri.file(`${Files.result}`));

  let variables: TVariables | string | undefined;

  if (varModelValue) {
    variables = parseJSONtoObject(varModelValue);

    if (typeof variables === 'string') {
      resultModel?.setValue(variables);
      return;
    }
  }

  const response = await getQueryResult({
    query: queryModelValue,
    variables,
  });

  resultModel?.setValue(JSON.stringify(response, null, '\t'));
};

export { getEditorModel, createEditor, handleRequest };
