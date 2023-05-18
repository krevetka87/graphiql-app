import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { Uri } from 'monaco-editor';
import { Files, queryEditorOptions } from '../../../constants/editor';
import { editorStore, schemaStore } from '../../../store/index';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';
import { Editor } from '../../../types/editor.types';

const QueryEditor = observer(() => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const { values } = editorStore;
  const { schema } = schemaStore;

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
          schema,
          uri: 'schema.graphql',
          fileMatch: [Uri.file(`${Files.query}`).toString()],
        },
      ]);

      api.setCompletionSettings({
        __experimental__fillLeafsOnComplete: true,
      });

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

  return <div ref={editorRef} className="h-[300px] lg:h-[98%] py-3" />;
});

export default QueryEditor;
