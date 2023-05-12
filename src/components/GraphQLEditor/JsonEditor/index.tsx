import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { IEditorTypes, TEditor, TEditorOptions } from '../../../types/editor';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';
import { Files } from '../../../constants/editor';
import editorsStore from '../../../store/editorStore';

interface IJsonEditorProps {
  type: keyof IEditorTypes;
  fileName: Files;
  options: TEditorOptions;
  className: string;
}

const JsonEditor = observer(({ type, fileName, options, className }: IJsonEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);
  const { values } = editorsStore;

  useEffect(() => {
    if (editorRef.current && !editorInstance) {
      const model = getEditorModel(fileName, values[type], 'json');

      const editor = createEditor(editorRef.current, model, options);
      setEditorInstance(editor);

      return () => {
        editorsStore.setValue(editor.getValue(), type);
      };
    }
    return () => {};
  }, [editorInstance, fileName, type, options, values]);

  return <div ref={editorRef} className={className} />;
});

export default JsonEditor;
