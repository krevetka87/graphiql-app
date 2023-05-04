import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { TEditor, TEditorModel } from '../../../types/editor';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';
import { Files, editorOptions } from '../../../constants/editor';
import editorsValueStore from '../../../store/editorsValueStore';

const ResultEditor = observer(() => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);

  useEffect(() => {
    if (editorRef.current && !editorInstance) {
      const model: TEditorModel = getEditorModel(
        Files.result,
        editorsValueStore.resultValue,
        'json'
      );

      const editor: TEditor = createEditor(editorRef.current, model, {
        ...editorOptions,
        readOnly: true,
        lineNumbers: 'off',
      });
      setEditorInstance(editor);

      return () => {
        editorsValueStore.setResultEditor(editor.getValue());
      };
    }
    return () => {};
  }, [editorInstance]);

  return <div ref={editorRef} className="flex-1 min-w-0 h-screen" />;
});

export default ResultEditor;
