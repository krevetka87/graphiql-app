import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { Uri } from 'monaco-editor';
import { IntrospectionQuery, buildClientSchema } from 'graphql';
import { Files, editorOptions } from '../../../constants/editor';
import { TEditor, TEditorModel } from '../../../types/editor';
import editorsValueStore from '../../../store/editorsValueStore';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';

interface IQueryEditorProps {
  introspection: IntrospectionQuery | undefined;
}

const QueryEditor = observer(({ introspection }: IQueryEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);

  useEffect(() => {
    if (!introspection) {
      return;
    }
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
      },
    ]);

    api.setFormattingOptions({ prettierConfig: { useTabs: true, tabWidth: 2 } });
  }, [introspection]);

  useEffect(() => {
    if (editorInstance || !editorRef.current) {
      return;
    }

    const queryModel: TEditorModel = getEditorModel(
      Files.query,
      editorsValueStore.queryValue,
      'graphql'
    );

    const queryEditor: TEditor = createEditor(editorRef.current, queryModel, editorOptions);
    setEditorInstance(queryEditor);

    // eslint-disable-next-line consistent-return
    return () => {
      editorsValueStore.setQueryValue(queryEditor.getValue());
    };
  }, [editorInstance]);

  return <div ref={editorRef} className="h-80" />;
});

export default QueryEditor;
