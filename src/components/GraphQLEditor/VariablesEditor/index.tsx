import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { TEditor, TEditorModel } from '../../../types/editor';
import editorsValueStore from '../../../store/editorsValueStore';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';
import { Files, editorOptions } from '../../../constants/editor';

const VariablesEditor = observer(() => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);

  useEffect(() => {
    if (!editorRef.current || editorInstance) {
      return;
    }

    const model: TEditorModel = getEditorModel(
      Files.variables,
      editorsValueStore.variablesValue,
      'json'
    );

    const editor: TEditor = createEditor(editorRef.current, model, editorOptions);
    setEditorInstance(editor);

    // eslint-disable-next-line consistent-return
    return () => {
      editorsValueStore.setVariablesValue(editor.getValue());
    };
  }, [editorInstance]);

  return <div ref={editorRef} className="h-80" />;
});

export default VariablesEditor;
