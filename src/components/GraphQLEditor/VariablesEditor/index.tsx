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
    if (editorRef.current && !editorInstance) {
      const model: TEditorModel = getEditorModel(
        Files.variables,
        editorsValueStore.variablesValue,
        'json'
      );

      const editor: TEditor = createEditor(editorRef.current, model, editorOptions);
      setEditorInstance(editor);

      return () => {
        editorsValueStore.setVariablesValue(editor.getValue());
      };
    }
    return () => {};
  }, [editorInstance]);

  return (
    <div className="shrink-1 grow-1">
      <button type="button">Variables</button>
      <div ref={editorRef} className="h-80" />
    </div>
  );
});

export default VariablesEditor;
