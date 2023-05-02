import { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Uri } from 'monaco-editor/esm/vs/editor/editor.api';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { IntrospectionQuery, buildClientSchema } from 'graphql';
import getApiSchema from '../../api/schemaApi';
import { createEditor, getEditorModel, handleRequest } from '../../utils/editorHelpers';
import { InitValues, editorOptions, Files } from '../../constants/editor';
import editorsStore from '../../store/editorsStore';
import { TEditor, TEditorModel } from '../../types/editor';

const GraphQLEditor = observer(() => {
  const queryRef = useRef<HTMLDivElement>(null);
  const varRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [isLoading, setLoading] = useState<boolean>(false);
  const [schemaError, setSchemaError] = useState<string>('');
  const [schema, setSchema] = useState<IntrospectionQuery | undefined>();

  useEffect(() => {
    if (schema) {
      return;
    }

    setLoading(true);

    getApiSchema()
      .then((data) => {
        const api = initializeMode();

        api.setDiagnosticSettings({
          jsonDiagnosticSettings: {
            validate: true,
            schemaValidation: 'error',
            allowComments: true,
            trailingCommas: 'ignore',
          },
          validateVariablesJSON: {
            [Uri.file(`${Files.query}`).toString()]: [Uri.file(`${Files.variables}`).toString()],
          },
        });

        api.setSchemaConfig([
          {
            schema: buildClientSchema(data),
            uri: 'schema.graphql',
          },
        ]);

        api.setFormattingOptions({ prettierConfig: { useTabs: true, tabWidth: 2 } });

        setSchema(data);
      })
      .catch((err: Error) => setSchemaError(err.message))
      .finally(() => setLoading(false));
  }, [schema]);

  useEffect(() => {
    if (
      !queryRef.current ||
      !varRef.current ||
      !resultRef.current ||
      editorsStore.queryEditor ||
      editorsStore.resultEditor ||
      editorsStore.variablesEditor ||
      !schema
    ) {
      return;
    }
    const queryModel: TEditorModel = getEditorModel(
      `${Files.query}`,
      `${InitValues.query}`,
      'graphql'
    );
    const varModel: TEditorModel = getEditorModel(
      `${Files.variables}`,
      `${InitValues.variables}`,
      'json'
    );
    const resultModel: TEditorModel = getEditorModel(
      `${Files.result}`,
      `${InitValues.result}`,
      'json'
    );

    const queryEditor: TEditor = createEditor(queryRef.current, queryModel, editorOptions);
    editorsStore.setQueryEditor(queryEditor);

    const varEditor: TEditor = createEditor(varRef.current, varModel, editorOptions);
    editorsStore.setVariablesEditor(varEditor);

    const resultEditor: TEditor = createEditor(resultRef.current, resultModel, {
      ...editorOptions,
      readOnly: true,
    });
    editorsStore.setResultEditor(resultEditor);
  }, [schema]);

  return (
    <div className="p-5 bg-neutral-300 relative flex items-stretch">
      <div className="flex basis-2/4 shrink-1 grow-0 items-start">
        <div className="flex-1">
          <div ref={queryRef} className="h-80" />
          <div ref={varRef} className="h-80" />
        </div>
        <button type="button" className="mx-5" onClick={handleRequest}>
          Run
        </button>
      </div>
      <div ref={resultRef} className="basis-2/4 shrink-1 grow-0" />
      {isLoading && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <h2>Loading...</h2>
        </div>
      )}
      {schemaError && (
        <div className="absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center">
          <h2>{schemaError}</h2>
        </div>
      )}
    </div>
  );
});

export default GraphQLEditor;
