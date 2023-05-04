import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { Uri } from 'monaco-editor';
import { IntrospectionQuery, buildClientSchema } from 'graphql';
import { Files, editorOptions } from '../../../constants/editor';
import { TEditor, TEditorModel } from '../../../types/editor';
import editorsValueStore from '../../../store/editorsValueStore';
import { createEditor, getEditorModel, resizeEditor } from '../../../utils/editorHelpers';

interface IQueryEditorProps {
  introspection: IntrospectionQuery | undefined;
}

const QueryEditor = observer(({ introspection }: IQueryEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);

  useEffect(() => {
    if (introspection) {
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
          schema: buildClientSchema(introspection),
          uri: 'schema.graphql',
          fileMatch: [Files.query],
        },
      ]);

      api.setFormattingOptions({
        prettierConfig: { useTabs: true, tabWidth: 2, bracketSameLine: false },
      });
    }
  }, [introspection]);

  useEffect(() => {
    if (!editorInstance && editorRef.current) {
      const model: TEditorModel = getEditorModel(
        Files.query,
        editorsValueStore.queryValue,
        'graphql'
      );

      const editor: TEditor = createEditor(editorRef.current, model, {
        ...editorOptions,
        hover: { enabled: false },
      });
      setEditorInstance(editor);

      const handleResize = () => resizeEditor(editor, editorRef.current);
      window.addEventListener('resize', handleResize);

      return () => {
        editorsValueStore.setQueryValue(editor.getValue());
        window.removeEventListener('resize', handleResize);
      };
    }
    return () => {};
  }, [editorInstance]);

  return <div ref={editorRef} className="h-80" />;
});

export default QueryEditor;
