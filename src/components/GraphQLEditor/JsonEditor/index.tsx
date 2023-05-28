import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState } from 'react';
import { EditorTypes, EditorOptions, Editor } from '../../../types/editor.types';
import { createEditor, getEditorModel } from '../../../utils/editorHelpers';
import { Files } from '../../../constants/editor';
import { editorStore } from '../../../store';

interface JsonEditorProps {
  type: keyof EditorTypes;
  fileName: Files;
  options: EditorOptions;
  className: string;
}

const JsonEditor = observer(({ type, fileName, options, className }: JsonEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorInstance, setEditorInstance] = useState<Editor | null>(null);
  const { values } = editorStore;

  useEffect(() => {
    if (!editorInstance && editorRef.current) {
      const model = getEditorModel(fileName, values[type], 'json');
      const editor = createEditor(editorRef.current, model, options);
      setEditorInstance(editor);

      return () => {
        editorStore.setValue(editor.getValue(), type);
      };
    }

    return () => {};
  }, [editorInstance, fileName, type, options, values]);

  return <div ref={editorRef} className={className} />;
});

export default JsonEditor;
