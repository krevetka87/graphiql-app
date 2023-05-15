import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import getApiSchema from '../../api/schemaApi';
import { editorStore } from '../../store';
import EditorHeader from './EditorHeader';
import RequestSection from './RequestSection';
import ResponseSection from './ResponseSection';
import DocsSection from './DocsSection';

const GraphQLEditor = observer(() => {
  const { schema } = editorStore;

  useEffect(() => {
    if (schema) {
      return;
    }

    getApiSchema()
      .then((data) => {
        editorStore.setSchema(data);
      })
      .catch((err: Error) => toast.error(err.message));
  }, [schema]);

  return (
    <div className="shadow-lg flex flex-col flex-auto min-w-0">
      <EditorHeader />
      <div className="flex flex-1">
        <RequestSection />
        <ResponseSection />
        <DocsSection />
      </div>
    </div>
  );
});

export default GraphQLEditor;
