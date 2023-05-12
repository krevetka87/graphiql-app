import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { Uri } from 'monaco-editor';
import { buildClientSchema } from 'graphql';
import { Files, queryEditorOptions } from '../../../constants/editor';
import { TEditor } from '../../../types/editor';
import editorStore from '../../../store/editorStore';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';

const QueryEditor = observer(() => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);
  const { values, schema } = editorStore;

  useEffect(() => {
    if (schema) {
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
          schema: buildClientSchema(schema),
          uri: 'schema.graphql',
          fileMatch: [Files.query],
        },
      ]);

      api.setFormattingOptions({
        prettierConfig: { useTabs: true, tabWidth: 2, bracketSameLine: false },
      });
    }
  }, [schema]);

  useEffect(() => {
    if (!editorInstance && editorRef.current) {
      const model = getEditorModel(Files.query, values.query, 'graphql');

      const editor = createEditor(editorRef.current, model, queryEditorOptions);
      setEditorInstance(editor);

      return () => {
        editorStore.setValue(editor.getValue(), 'query');
      };
    }
    return () => {};
  }, [editorInstance, values]);

  return <div ref={editorRef} className="h-[98%] py-3" />;
});

export default QueryEditor;
