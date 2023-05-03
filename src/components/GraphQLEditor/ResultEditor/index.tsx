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
    if (!editorRef.current || editorInstance) {
      return;
    }

    const model: TEditorModel = getEditorModel(Files.result, editorsValueStore.resultValue, 'json');

    const editor: TEditor = createEditor(editorRef.current, model, {
      ...editorOptions,
      readOnly: true,
    });
    setEditorInstance(editor);

    // eslint-disable-next-line consistent-return
    return () => {
      editorsValueStore.setResultEditor(editor.getValue());
    };
  }, [editorInstance]);

  return <div ref={editorRef} className="basis-2/4 shrink-1 grow-0" />;
});

export default ResultEditor;
