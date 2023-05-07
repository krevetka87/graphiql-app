import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { IEditorTypes, TEditor, TEditorModel, TEditorOptions } from '../../../types/editor';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';
import { Files } from '../../../constants/editor';
import editorsValueStore from '../../../store/editorsValueStore';

interface IJsonEditorProps {
  type: keyof IEditorTypes;
  fileName: Files;
  options: TEditorOptions;
  className: string;
}

const JsonEditor = observer(({ type, fileName, options, className }: IJsonEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<TEditor | null>(null);

  useEffect(() => {
    if (editorRef.current && !editorInstance) {
      const model: TEditorModel = getEditorModel(fileName, editorsValueStore.values[type], 'json');

      const editor: TEditor = createEditor(editorRef.current, model, options);
      setEditorInstance(editor);

      return () => {
        editorsValueStore.setValue(editor.getValue(), type);
      };
    }
    return () => {};
  }, [editorInstance, fileName, type, options]);

  return <div ref={editorRef} className={className} />;
});

export default JsonEditor;
